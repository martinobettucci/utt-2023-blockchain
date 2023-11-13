import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#">Decentralized Quiz</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="question-submission.html">Submit Question</Nav.Link>
                    <Nav.Link href="quiz-taking.html">Take Quiz</Nav.Link>
                    <Nav.Link href="answer-checking.html">Check Answers</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
