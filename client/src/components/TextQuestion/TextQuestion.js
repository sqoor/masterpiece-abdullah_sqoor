import React, { Component } from "react";

import FailMessage from "../FailMessage/FailMessage";
import Message from "../Message/Message";

export default class TextQuestion extends Component {
  state = {
    questionStatus: "",
    hasChoosedAnswer: false
  };

  checkAnswer = e => {
    e.preventDefault();
    const { hasChoosedAnswer } = this.state;
    if (hasChoosedAnswer) return;

    const { answer } = this.props;
    const choice = e.target.name;
    
    const questionStatus = choice === answer ? "pass" : "fail";
    this.setState({ questionStatus, hasChoosedAnswer: true });
  };

  moveNextQuestion = state => {
    const { passQuestion, retryQuestion } = this.props;

    state === "pass" ? passQuestion() : retryQuestion();
    this.setState({ hasChoosedAnswer: false });
  };

  render() {
    const { checkAnswer, moveNextQuestion } = this;
    const { questionStatus, hasChoosedAnswer } = this.state;
    const { answer, question, choices } = this.props;
    const message = hasChoosedAnswer ? (
      <Message
        correctAnswer={answer}
        message={questionStatus}
        moveNext={() => moveNextQuestion("pass")}
      />
    ) : null;

    return (
      <>
        <p className="bg-warning">Question type: Translate Question </p>
        <p>{question}</p>
        <form>
          <div className="container">
            <div className="row">
              {choices.map(choice => (
                <button
                  onClick={checkAnswer.bind(choice)}
                  name={choice}
                  className="col-5 m-1 btn btn-outline-dark"
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        </form>
        <div className="message">{message}</div>
      </>
    );
  }
}

// 1- destroy components message when moving to the next question - Done
// 2- when choosed a questions do not let choose another - Done
// (that's will change messge maybe the answer too)
// 3- unclickable choices after choosing an answer -
// 4- highlight the correct and wrong answers after choosing one.

// 5- refactor passMessage and failMessage same compoent only message changes.
