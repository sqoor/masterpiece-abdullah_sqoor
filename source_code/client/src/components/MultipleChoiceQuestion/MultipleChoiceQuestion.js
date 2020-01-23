import React, { Component } from "react";

import Question from "../Question/Question";
import Choices from "../Choices/Choices";
import ResultMessage from "../ResultMessage/ResultMessage";
import QuestionInfo from "../QuestionInfo/QuestionInfo";

export default class MultipleChoiceQuestion extends Component {
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
    const { answer, question, choices, formate, language } = this.props;

    return (
      <>
        <QuestionInfo />
        <Question
          question={question}
          formate={formate}
          language={language.question}
        />
        <Choices
          hasChoosedAnswer={hasChoosedAnswer}
          answer={answer}
          choices={choices}
          checkAnswer={checkAnswer}
          language={language.answer}
        />
        <ResultMessage
          hasChoosedAnswer={hasChoosedAnswer}
          answer={answer}
          questionStatus={questionStatus}
          moveNextQuestion={moveNextQuestion}
        />
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
// DONE - add voices to the question (or arabic language weather it was a question or an answer)
// DONE - add fontawesome icon for the -audio
// DONE - add voices when answer correctly/incorrectly
// Fixed - bug - english kishon - we dont want read English questions.
// - keyboard shortcuts (enter to go next, 1234, to choose choices, ...etc)
// - shuffel choices places
// - add voiced to the Arabic choices. (the correct answer).
/*
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
*/
