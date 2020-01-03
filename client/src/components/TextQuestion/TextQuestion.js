import React, { Component } from "react";

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
                  disabled={hasChoosedAnswer}
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

// DONE - destroy components message when moving to the next question.
// DONE - when choosed a questions do not let choose another.
// DONE - refactor passMessage and failMessage same compoent only message changes.
// DONE - unclickable choices after choosing an answer.
// - highlight the correct and wrong answers after choosing one.
// - progress bar (answered questions / total quetsions * 100%) - on lesson component probably
