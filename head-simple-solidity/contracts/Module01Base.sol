// contracts/Module01Base.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Module01Base {

    // Visibilité "public"
    string _message = "Hello World !";

    function getMessage() view public returns(string memory ) {
        return _message;
    }

    function setMessage(string calldata message) public {
        // Check if the input parameter _message is "test"
        if (keccak256(abi.encodePacked(_message)) == keccak256(abi.encodePacked("test"))) {
            // If it is "test", set message to "got you"
            _message = "got you";
        } else {
            // If it is not "test", set message to the input parameter _message
            _message = message;
        }
    }
}