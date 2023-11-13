<template>
  <b-form @submit="submitQuestion">
    <b-form-group label="Question Text">
      <b-form-textarea v-model="questionText" rows="3" required></b-form-textarea>
    </b-form-group>

    <b-form-group label="Answer Options">
      <b-form-textarea v-model="answerOptions" rows="3" required></b-form-textarea>
    </b-form-group>

    <b-form-group label="Correct Answer Line Number">
      <b-form-input v-model="correctAnswer" type="number" required></b-form-input>
    </b-form-group>

    <b-form-group label="Question's Password">
      <b-form-input v-model="submitterPassword" type="password" required></b-form-input>
    </b-form-group>

    <b-button type="submit">Submit</b-button>
  </b-form>
</template>

<script>
import Web3 from 'web3';
import CryptoJS from 'crypto-js';

export default {
  name: 'QuestionForm',
  data() {
    return {
      questionText: '',
      answerOptions: '',
      correctAnswer: 1,
      submitterPassword: ''
    }
  },
  methods: {
    async submitQuestion(event) {
      event.preventDefault();

      // Your web3 and contract code here
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);

        let config = await import('../build/contractConfig');

        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const quizContract = new window.web3.eth.Contract(await config.contractABI(), config.contractAddress());

          const answerOptionsArray = this.answerOptions.split('\n');
          const encryptedCorrectAnswer = CryptoJS.AES.encrypt(answerOptionsArray[this.correctAnswer - 1], this.submitterPassword).toString();

          quizContract.methods.submitQuestion(this.questionText, answerOptionsArray, encryptedCorrectAnswer)
            .send({ from: accounts[0] })
            .on('transactionHash', (hash) => {
              console.log('Transaction Hash:', hash);
            })
            .on('confirmation', (confirmationNumber, receipt) => {
              console.log('Confirmation:', confirmationNumber);
              console.log('Receipt:', receipt);
              this.questionText = '';
              this.answerOptions = '';
              this.correctAnswer = 1;
              this.submitterPassword = '';
            })
            .on('error', (error) => {
              console.error('Error:', error);
            });
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('Non-Ethereum browser detected. Consider trying MetaMask!');
      }
    }
  }
}
</script>
