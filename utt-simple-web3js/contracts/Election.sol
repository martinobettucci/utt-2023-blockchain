//SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.17;

contract Election {

    // Read/write candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    address owner;

    mapping(address => bool) public voters;
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    event Voted(uint _candidate);
    event NewCandidate(string _candidate);

    // Constructor
    constructor () {
        owner = msg.sender;
    }

    modifier only_unvoted() {
        require(!voters[msg.sender], 'Already voted');
        _;
    }

    modifier only_candidates(uint _candidateId) {
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        _;
    }

    function vote (uint _candidateId) external only_unvoted() only_candidates(_candidateId) {
        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // emit the voted event
        emit Voted(_candidateId);
    }

    modifier only_owners() {
        require(owner == msg.sender);
        _;
    }

    function addCandidate (string calldata _name) public only_owners() {
        candidatesCount++;
        Candidate storage c = candidates[candidatesCount];
        c.id = candidatesCount;
        c.name = _name;
        c.voteCount = 0;

        // emit the voted event
        emit NewCandidate(_name);
    }
}