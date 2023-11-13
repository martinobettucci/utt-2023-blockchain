// Imports
const Web3 = require('web3');
const path = require('path')
const { expect } = require('chai');
const abi = require('../artifacts/contracts/Quizz.sol/Quizz.json').abi;
const dotenv_config = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Config
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

// Init - async func because we need to await the contract functions
const init = async () => {
  try {
    const account = await process.env.WALLET_ADDRESS;
    console.log(account);
    
    // Check the number of questions existing into the blockchain
    const questionCountBefore = await contract.methods.questionCount().call();
    
    // Add a new question to the quiz
    const result = await contract.methods.addQuestion("What is the capital of France?", "Paris", ["Rome"] ).send({ from: account });
    console.log({ result });

    // Wait for transaction to be mined
    const receipt = await web3.eth.getTransactionReceipt(result.transactionHash);
    while (receipt === null) {
      receipt = await web3.eth.getTransactionReceipt(result.transactionHash);
    }
    console.log({ receipt });

    // Check that the question was added
    const questionCountAfter = await contract.methods.questionCount().call();
    expect(parseInt(questionCountAfter)).to.be.equal(parseInt(questionCountBefore) + 1);

    // Check that the question was stored correctly
    const _question = await contract.methods.questions(questionCountBefore);
    const _correctAnswer = await contract.methods.questions.correctAnswer(questionCountBefore);
    const _answers = await contract.methods.questions.getAnswers(questionCountBefore);
    
    expect(_question).to.equal("What is the capital of France?");
    expect(_correctAnswer).to.equal("0x"+keccak256("Paris").toString('hex'));
    expect(_answers).to.deep.equal(["Rome"]);
    
  } catch (error) {
    console.log({ error });
  }
}
init();

