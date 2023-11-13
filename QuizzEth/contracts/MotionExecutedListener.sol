// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Voting.sol";
import "hardhat/console.sol";

/**
This is a Solidity contract for a motion execution listener. 
This contract is to be part of a system for executing actions based on the outcome of voting processes in the Voting contract. 
It allows a member to specify a particular motion ID and register a function to be called when that motion is executed. 
It imports the Voting contract, which it uses to listen for the MotionExecuted event. 
The contract has a single constructor which takes a Voting contract instance as an argument, and registers the executeMotion function as a listener for the MotionExecuted event.

The contract has two functions:
    setMotionId(uint _motionId): 
        allows a member to set the motion ID that the listener should respond to. 
        This function can only be called once and can only be called by a member of the voting contract.
    executeMotion(uint _motionId): 
        this function is called whenever the MotionExecuted event is emitted by the Voting contract, and it executes some logic (in this case, logging a message to the console) based on the motion ID that was set using the setMotionId function. 
        This function can only be called by a member of the voting contract.
*/
contract MotionExecutionListener {
    Voting voting;
    uint motionId;

    constructor(Voting _voting) public {
        voting = _voting;
        motionId = 0;
        voting.onMotionExecuted(executeMotion);
    }
    
    function setMotionId(uint _motionId) public {
        require(motionId == 0, "Motion ID already defined");
        require(voting.isMember(msg.sender), "Wrong DAO");
        
        motionId = _motionId;
    }

    function executeMotion(uint _motionId) public {
        require(motionId == _motionId, "Wrong motion ID");
        require(voting.isMember(msg.sender), "Wrong DAO");
        
        console.log("Motion executed!");
    }
}

