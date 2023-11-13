// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./MemberRegistry.sol";
import "./MotionExecutedListener.sol";

/**
This is a Solidity contract for a voting system.
This contract is to be part of a larger system for managing a group of members and their participation in decision-making processes. 
It allows members to propose and vote on motions, and specifies requirements for a motion to pass. 
It also allows for global quorum and majority requirements to be set and modified, and for certain contracts to be approved to modify these requirements. 
It imports the MemberRegistry contract, which it uses to keep track of the members who are eligible to participate in the voting process. 
The contract has a struct called Motion which holds information about a motion that has been submitted, including the text of the motion, the number of votes it has received, the quorum and majority requirements for the motion to pass, the address of the member who proposed the motion, and a mapping of member addresses to votes. 
It also has an array of Motion structs called motions which stores all the motions that have been submitted.

The contract has several events: MotionSubmitted, VoteSubmitted, and MotionExecuted. 
It also has several functions:
    submitMotion(string _text): 
        allows a member to submit a new motion with the given text. 
        It adds a new Motion struct to the motions array and emits the MotionSubmitted event.
    vote(uint _motionId, bool _vote): 
        allows a member to vote on a motion with the given ID. It updates the votes mapping in the corresponding Motion struct and the voteCount field, and updates the member's reputation in the MemberRegistry contract. 
        It emits the VoteSubmitted event.
    getVoteCount(uint _motionId): 
        returns the total number of votes for and against a motion with the given ID.
    modifyQuorum(uint _newQuorum), modifyMajority(uint _newMajority), addApprovedContract(address _contract): 
        these functions allow an approved contract (which must be the contract that deployed this contract) to modify the global quorum and majority requirements and add new approved contracts.
    executeMotion(uint _motionId): 
        executes a motion with the given ID if it has received enough votes to pass. 
        It updates the executed field of the corresponding Motion struct and emits the MotionExecuted event.
    getMotions(): 
        returns the array of Motion structs.
*/
contract Voting {

    MemberRegistry internal memberRegistry;
    
    // global contract attributes
    uint internal quorum;
    uint public majority;
    address[] public approvedContracts;

    struct Motion {
        string text;
        uint voteCount;
        uint quorum;
        uint majority;
        address proposer;
        uint proposerReputation;
        mapping(address => bool) votes;
        bool executed;
    }

    uint numMotion;
    mapping (uint => Motion) motions;

    event MotionSubmitted(uint indexed motionId);
    event VoteSubmitted(uint indexed motionId, address indexed member, bool vote);
    event MotionExecuted(uint indexed motionId);

    constructor(MemberRegistry _memberRegistry) {
        memberRegistry = _memberRegistry;
        // default values for global attributes
        quorum = 20;
        majority = 50;
        approvedContracts.push(msg.sender);
    }
    
    function submitMotion(string calldata _text) public {
        require(memberRegistry.isMember(msg.sender), "Only members can submit motions");

        Motion storage m = motions[numMotion++];
        m.text = _text;
        m.voteCount= 0;
        m.quorum = quorum;
        m.majority = majority;
        m.proposer = msg.sender;
        m.proposerReputation = memberRegistry.getReputationOf(msg.sender);
            //votes: mapping(address => bool)(),
        m.executed = false;

        emit MotionSubmitted(numMotion);
    }

    function submitMotion(string calldata _text, address _listener) public {
        require(memberRegistry.isMember(msg.sender), "Only members can submit motions");
        require(_listener.code.length > 0, "Listener address is not a contract");

        // create a reference to the MotionExecutionListener contract
        MotionExecutionListener listener = MotionExecutionListener(_listener);

        // add the listener contract to the list of approved contracts
        approvedContracts.push(_listener);

        // create a new motion and add it to the motions array
        uint motionId = numMotion;
        this.submitMotion(_text);

        // set the motion ID in the listener contract
        listener.setMotionId(motionId);
    }

    function vote(uint _motionId, bool _vote) public {
        require(_motionId < numMotion, "Invalid motion id");
        require(!motions[_motionId].executed, "Motion has already been executed");
        require(memberRegistry.isMember(msg.sender), "Only members can vote");

        Motion storage motion = motions[_motionId];
        require(!motion.votes[msg.sender], "Member has already voted");

        motion.votes[msg.sender] = _vote;
        motion.voteCount += memberRegistry.getReputationOf(msg.sender);
        memberRegistry.updateReputation(msg.sender, numMotion);

        emit VoteSubmitted(_motionId, msg.sender, _vote);
    }

    function getVoteCount(uint _motionId) public view returns (uint forVotes, uint againstVotes) {
        require(_motionId < numMotion, "Invalid motion id");

        Motion storage motion = motions[_motionId];
        forVotes = 0;
        againstVotes = 0;
        for (uint i = 0; i < memberRegistry.getMembersTotal(); i++) {
            address member = memberRegistry.memberList[i];
            if (motion.votes[member]) {
                forVotes = forVotes.add(memberRegistry.getReputationOf(member));
            } else {
                againstVotes = againstVotes.add(memberRegistry.getReputationOf(member));
            }
        }
    }
    
    function modifyQuorum(uint _newQuorum) public {
        require(approvedContracts.length > 0 && approvedContracts[0] == msg.sender, "Only approved contracts can modify quorum");
        quorum = _newQuorum;
    }

    function modifyMajority(uint _newMajority) public {
        require(approvedContracts.length > 0 && approvedContracts[0] == msg.sender, "Only approved contracts can modify majority");
        majority = _newMajority;
    }

    function addApprovedContract(address _contract) public {
        require(approvedContracts.length > 0 && approvedContracts[0] == msg.sender, "Only approved contracts can add new approved contracts");
        approvedContracts.push(_contract);
    }

    function executeMotion(uint _motionId) public {
        require(_motionId < numMotion, "Invalid motion id");
        require(!motions[_motionId].executed, "Motion has already been executed");

        Motion storage motion = motions[_motionId];
        (uint forVotes, uint againstVotes) = getVoteCount(_motionId);
        uint totalVotes = forVotes.add(againstVotes);
        require(totalVotes >= motion.quorum, "Quorum not reached");
        if (forVotes.mul(100).div(totalVotes) >= motion.majority) {
            motion.executed = true;
            emit MotionExecuted(_motionId);
        }
    }
}

