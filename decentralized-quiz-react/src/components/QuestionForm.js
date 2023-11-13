import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Web3 from 'web3';
import CryptoJS from 'crypto-js';

const QuestionForm = () => {
    const [questionText, setQuestionText] = useState('');
    const [answerOptions, setAnswerOptions] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState(1);
    const [submitterPassword, setSubmitterPassword] = useState('');

    const submitQuestion = async (event) => {
        event.preventDefault();

        // Your web3 and contract code here
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);

            let config = await import('../build/contractConfig');

            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const quizContract = new window.web3.eth.Contract(await config.contractABI(), config.contractAddress());

                const answerOptionsArray = answerOptions.split('\n');
                const encryptedCorrectAnswer = CryptoJS.AES.encrypt(answerOptionsArray[correctAnswer - 1], submitterPassword).toString();

                quizContract.methods.submitQuestion(questionText, answerOptionsArray, encryptedCorrectAnswer)
                    .send({ from: accounts[0] })
                    .on('transactionHash', (hash) => {
                        console.log('Transaction Hash:', hash);
                    })
                    .on('confirmation', (confirmationNumber, receipt) => {
                        console.log('Confirmation:', confirmationNumber);
                        setQuestionText('');
                        setAnswerOptions('');
                        setCorrectAnswer(1);
                        setSubmitterPassword('');
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
    };

    return (
        <Form onSubmit={submitQuestion}>
            <Form.Group>
                <Form.Label>Question Text</Form.Label>
                <Form.Control as="textarea" rows={3} value={questionText} onChange={(e) => setQuestionText(e.target.value)} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Answer Options</Form.Label>
                <Form.Control as="textarea" rows={3} value={answerOptions} onChange={(e) => setAnswerOptions(e.target.value)} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Correct Answer Line Number</Form.Label>
                <Form.Control type="number" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Question's Password</Form.Label>
                <Form.Control type="password" value={submitterPassword} onChange={(e) => setSubmitterPassword(e.target.value)} required />
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
    );
};

export default QuestionForm;
