import React, { Component } from "react";

import Message from "../Message/Message";
import Choice from "../Choice/Choice";
import Audio from "../Audio/Audio";

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

    this.state.questionStatus === "pass" ? passQuestion() : retryQuestion();
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
        <div className="info">
          <p className="bg-warning">Question type: Translate Question </p>
        </div>

        <div className="question">
          <Audio autoplay={true} gender="Male" text={question} />
          <span className="ml-2">{question}</span>
        </div>

        <div className="choices">
          <form>
            <div className="container">
              <div className="row d-flex justify-content-center">
                {choices.map(choice => (
                  <Choice
                    key={choice}
                    choice={choice}
                    checkAnswer={checkAnswer}
                    hasChoosedAnswer={hasChoosedAnswer}
                    answer={answer}
                  />
                ))}
              </div>
            </div>
          </form>
        </div>

        <div className="final-message m-3">{message}</div>
      </>
    );
  }
}

// DONE - destroy components message when moving to the next question.
// DONE - when choosed a questions do not let choose another.
// DONE - refactor passMessage and failMessage same compoent only message changes.
// DONE - unclickable choices after choosing an answer.
// DONE - highlight the correct and wrong answers after choosing one.
// FIXED - BUG - no looping the wrongly answered question.
// DONE - highlight the choosed answer
// DONE - progress bar (answered questions / total quetsions * 100%) - on lesson component probably
// - add voices when answer correctly/incorrectly
// - keyboard shortcuts (enter to go next, 1234, to choose choices, ...etc)
// - add voices to the question (or arabic language weather it was a question or an answer)
// - add fontawesome icon for the -audio
