import React, { Component } from "react";

import Message from "../Message/Message";
import Choice from "../Choice/Choice";

export default class TextQuestion extends Component {
  state = {
    questionStatus: "",
    hasChoosedAnswer: false,
    choosedAnswerBtn: null
  };

  highlightChoosedAnswerBtn() {
    this.state.choosedAnswerBtn.style.border = "6px black solid";
  }

  removeHighlightChoosedAnswerBtn() {
    this.state.choosedAnswerBtn.style.border = "";
  }

  checkAnswer = async e => {
    e.preventDefault();

    const { hasChoosedAnswer } = this.state;
    if (hasChoosedAnswer) return;

    const { answer } = this.props;
    const choice = e.target.name;
    const questionStatus = choice === answer ? "pass" : "fail";

    await this.setState({
      questionStatus,
      hasChoosedAnswer: true,
      choosedAnswerBtn: e.target
    });

    this.highlightChoosedAnswerBtn();
  };

  moveNextQuestion = () => {
    const { passQuestion, retryQuestion } = this.props;

    this.questionStatus === "pass" ? passQuestion() : retryQuestion();
    this.setState({ hasChoosedAnswer: false });

    this.removeHighlightChoosedAnswerBtn();
  };

  render() {
    const { checkAnswer, moveNextQuestion } = this;
    const { questionStatus, hasChoosedAnswer } = this.state;
    const { answer, question, choices } = this.props;
    const message = hasChoosedAnswer ? (
      <Message
        correctAnswer={answer}
        message={questionStatus}
        moveNext={() => moveNextQuestion()}
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
                <Choice
                  choice={choice}
                  checkAnswer={checkAnswer}
                  hasChoosedAnswer={hasChoosedAnswer}
                  answer={answer}
                />
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
// DONE - highlight the correct and wrong answers after choosing one.
// - highlight the choosed answer
// - progress bar (answered questions / total quetsions * 100%) - on lesson component probably

// FIXED - BUG - no looping the wrongly answered question.
