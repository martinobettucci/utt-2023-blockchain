// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Quizz {
    // The quiz questions and answers
    mapping(uint => string) public question;
    mapping(uint => bytes32) public correctAnswer;
    mapping(uint => string[]) public answers;
    uint public questionCount;
    
    constructor() {
        questionCount = 0;
    }
    
    function getAnswers(uint _question) public view returns(string[] memory) {
        return answers[_question];
    }
    
    function addQuestion(
        string memory _question,
        string memory _correctAnswer,
        string[] memory _otherAnswers
    ) public {
        // Hash the correct answer
        bytes32 correctAnswerHash = keccak256(abi.encodePacked(_correctAnswer));

        // Add the question to the contract
        question[questionCount] = _question;
        correctAnswer[questionCount] = correctAnswerHash;
        answers[questionCount] = _otherAnswers;
        questionCount++;
    }

    function updateQuestion(
        uint _id,
        string memory _question,
        string memory _correctAnswer,
        string[] memory _otherAnswers
    ) public {
        // Check that the ID is within bounds
        require(_id < questionCount, "ID out of bounds");

        // Hash the correct answer
        bytes32 correctAnswerHash = keccak256(abi.encodePacked(_correctAnswer));

        // Update the question in the contract
        question[_id] = _question;
        correctAnswer[_id] = correctAnswerHash;
        answers[_id] = _otherAnswers;
    }

    function deleteQuestion(uint _id) public {
        // Check that the ID is within bounds
        require(_id < questionCount, "ID out of bounds");

        delete question[_id];
        delete correctAnswer[_id];
        delete answers[_id];
        
        questionCount--;
    }

    function calculateScore(uint _id, string memory _answer) public view returns (uint) {
        // Check that the ID is within bounds
        require(_id < questionCount, "ID out of bounds");

        // Get the question from the contract
        bytes32 correctAnswerHash = correctAnswer[_id];

        // Calculate the score
        uint score = 0;
        if (keccak256(abi.encodePacked(_answer)) == correctAnswerHash) {
            score = 100;
        } else {
            for (uint i = 0; i < answers[_id].length; i++) {
                if (keccak256(abi.encodePacked(_answer)) == keccak256(abi.encodePacked(answers[_id][i]))) {
                    score = 0;
                    break;
                }
            }
        }

        return score;
    }


}

