import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import QuestionForm from './components/QuestionForm';

function App() {
  return (
      <div className="App">
        <NavigationBar />
        <div className="container">
          <h1>Question Submission</h1>
          <QuestionForm />
        </div>
      </div>
  );
}

export default App;
