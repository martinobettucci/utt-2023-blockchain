// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/**
This is a Solidity contract for a member registry. 
It defines a struct called Member which holds information about a member of the registry. 
It also has a mapping from addresses to Member structs, called members, which allows for efficient lookup of member information. 
The contract has an array called memberList which stores the addresses of all the members. 

It has three events: MemberAdded, MemberRemoved, and MemberChanged. 
There are also several functions:
    addMember(address _member): 
        adds a member to the registry with an initial reputation of 0 and a seniority value equal to the current time. It emits the MemberAdded event.
    removeMember(address _member): 
        removes a member from the registry and emits the MemberRemoved event.
    isMember(address _member): 
        returns a boolean indicating whether the given address is a member of the registry.
    updateReputation(address _member): 
        updates the reputation of the member at the given address. The reputation is calculated based on the member's votes on motions and their seniority in the registry.
*/
contract MemberRegistry {

    bool internal locked;

    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }

    struct Member {
        bool isActive;
        uint reputation;
        uint seniority;
    }

    mapping(address => Member) public members;

    event MemberAdded(address indexed member);
    event MemberRemoved(address indexed member);

    uint totalReputation;

    function addMember(address _member) public noReentrant {
        require(!members[_member].isActive, "Member already exists");

        members[_member] = Member({
            isActive: true,
            reputation: 0,
            seniority: block.timestamp
        });
        emit MemberAdded(_member);
    }

    function removeMember(address _member) public noReentrant {
        require(members[_member].isActive, "Member does not exist");

        members[_member].isActive = false;
        emit MemberRemoved(_member);
    }

    function isMember(address _member) public view returns (bool) {
        return members[_member].isActive;
    }
    
    function getReputationOf(address _member) public view returns (uint) {
        return members[_member].reputation;
    }

    function getMembersTotal() public view returns (uint) {
        return members.length;
    }

    function getTotalReputation() public view returns (uint) {
        return totalReputation;
    }
    
    function updateReputation(address _member, uint motions) external noReentrant {
        Member storage member = members[_member];
        uint oldReputation = member.reputation;
        uint newReputation = ( member.reputation * (motions) / (motions - 1) ) + (member.seniority / (30));
        totalReputation += newReputation - oldReputation;
        member.reputation = newReputation;
    }

}

