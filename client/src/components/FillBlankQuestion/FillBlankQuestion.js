import React, { Component } from "react";

import Question from "../Question/Question";
import Choices from "../Choices/Choices";
import ResultMessage from "../ResultMessage/ResultMessage";
import QuestionInfo from "../QuestionInfo/QuestionInfo";

export default class MultipleChoiceQuestion extends Component {
  state = {
    questionStatus: "",
    hasChoosedAnswer: false,
    choosedAnswerBtn: null,

    // new
    question: [],
    choices: [],
    answer: ""
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

  componentDidMount() {
    let { question, choices, answer } = this.props;

    question = question.split(" ");
    choices.push(answer);

    this.setState({
      question,
      choices,
      answer
    });
  }

  getFormatedQuestion = () => {
    const { question, answer } = this.state;
    const blank = <span style={styles.blank}></span>;
    const formatedQuestion = question.map(word => {
      return (
        <span className="word">{word === answer ? blank : word + " "}</span>
      );
    });

    return formatedQuestion;
  };

  getFormatedChoices = () => {
    let { choices } = this.state;

    return choices.map(choice => (
      <button className="btn btn-dark" style={styles.word}>
        {choice + " "}
      </button>
    ));
  };

  render() {
    const {
      getFormatedQuestion,
      getFormatedChoices,
      checkAnswer,
      moveNextQuestion
    } = this;
    const { questionStatus, hasChoosedAnswer } = this.state;
    const { answer, question, choices, formate, language } = this.props;

    return (
      <>
        <div className="info">
          <h2>Complete the sentence</h2>
        </div>

        <div className="question m-4">{getFormatedQuestion()}</div>

        <div className="choices m-5">{getFormatedChoices()}</div>

        <div className="result">Result</div>
      </>
    );
  }
}

const styles = {
  word: {
    marginLeft: "5px",
    padding: "5px"
  },
  blank: {
    borderBottom: "1px solid grey",
    marginBottom: "-10",
    paddingLeft: "50px"
  }
};

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
