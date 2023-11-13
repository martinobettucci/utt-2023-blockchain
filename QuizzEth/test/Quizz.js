// SPDX-License-Identifier: MIT
// Import the Hardhat Runtime Environment
const hre = require("hardhat");
const { expect } = require('chai');
const keccak256 = require('keccak256');

describe('Quizz', () => {
  let quizz;

  before(async () => {
    // Deploy the Quizz contract
    const QuizzContract = await hre.ethers.getContractFactory("Quizz");
    const QuizzDeployer = await QuizzContract.deploy();
    quizz = await QuizzDeployer.deployed();
  });

  it('should add a new quiz question', async () => {
    const question = 'What is the capital of France?';
    const correctAnswer = 'Paris';
    const answers = ['Marseille', 'Paris', 'Lyon', 'Toulouse'];

    await quizz.addQuestion(question, correctAnswer, answers);

    // Check that the question was added to the contract
    const questionCount = await quizz.questionCount();
    expect(questionCount.toNumber()).to.equal(1);

    const _question = await quizz.question(0);
    const _correctAnswer = await quizz.correctAnswer(0);
    const _answers = await quizz.getAnswers(0);
    expect(_question).to.equal(question);
    expect(_correctAnswer).to.equal("0x"+keccak256(correctAnswer).toString('hex'));
    expect(_answers).to.deep.equal(answers);
  });

  it('should update an existing quiz question', async () => {
    const question = 'What is the capital of Italy?';
    const correctAnswer = 'Rome';
    const answers = ['Milan', 'Naples', 'Rome', 'Turin'];

    await quizz.updateQuestion(0, question, correctAnswer, answers);

    // Check that the question was updated in the contract
    const _question = await quizz.question(0);
    const _correctAnswer = await quizz.correctAnswer(0);
    const _answers = await quizz.getAnswers(0);
    expect(_question).to.equal(question);
    expect(_correctAnswer).to.equal("0x"+keccak256(correctAnswer).toString('hex'));
    expect(_answers).to.deep.equal(answers);
  });

  it('should delete a quiz question', async () => {
    const questionCountBefore = await quizz.questionCount();
    
    await quizz.deleteQuestion(0);

    // Check that the question was deleted from the contract
    const questionCountAfter = await quizz.questionCount();
    expect(questionCountAfter.toNumber()).to.equal(questionCountBefore - 1);
  });

  it('should calculate the score for a quiz question and answer', async () => {
    const question = 'What is the capital of Spain?';
    const correctAnswer = 'Madrid';
    const answers = ['Madrid', 'Barcelona', 'Valencia', 'Seville'];

    await quizz.addQuestion(question, correctAnswer, answers);

    // Check that the score is 100 for the correct answer
    const scoreOk = await quizz.calculateScore(0, correctAnswer);
    expect(scoreOk.toNumber()).to.equal(100);

    // Check that the score is 0 for an incorrect answer
    const incorrectAnswer = 'Barcelona';
    const scoreKo = await quizz.calculateScore(0, incorrectAnswer);
    expect(scoreKo.toNumber()).to.equal(0);
  });

});

