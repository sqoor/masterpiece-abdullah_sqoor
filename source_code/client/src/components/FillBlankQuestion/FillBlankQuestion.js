import React, { Component } from "react";

import ResultMessage from "../ResultMessage/ResultMessage";

export default class FillBlankQuestion extends Component {
  state = {
    questionStatus: "",
    hasChoosedAnswer: false,
    choosedAnswerBtn: null,
    question: [],
    choices: [],
    answer: ""
  };

  initComponent = () => {
    const { shuffle, addCorrectAnswerToChoices } = this;
    let { question, choices, answer } = this.props;

    question = question.split(" ");
    choices = addCorrectAnswerToChoices();
    choices = shuffle(choices);

    this.setState({
      question,
      choices,
      answer
    });
  };

  componentDidMount() {
    this.initComponent();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.question !== this.props.question) {
      this.initComponent();
    }
  }

  addCorrectAnswerToChoices = () => {
    const { choices, answer } = this.props;
    const answerNotExistedInChocies = choices.indexOf(answer) === -1;

    if (answerNotExistedInChocies) choices.push(answer);

    return choices;
  };

  highlightChoosedAnswerBtn() {
    const btn = this.state.choosedAnswerBtn;
    btn.style.border = "6px black solid";

    this.setState({ choosedAnswerBtn: btn });
  }

  removeHighlightChoosedAnswerBtn() {
    const btn = this.state.choosedAnswerBtn;
    btn.style.border = "";

    this.setState({ choosedAnswerBtn: btn });
  }

  removeCorrectAnswerFromChoices() {
    const { answer } = this.state;

    this.setState(prevState => {
      return {
        ...prevState,
        choices: prevState.choices.filter(choice => choice !== answer)
      };
    });
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
    this.removeCorrectAnswerFromChoices();
  };

  getFormatedQuestion = () => {
    const { question, answer, hasChoosedAnswer, choosedAnswerBtn } = this.state;
    const blank = hasChoosedAnswer ? (
      <span className="px-2" style={styles.blank}>
        {choosedAnswerBtn.name + " "}
      </span>
    ) : (
      <span className="px-4" style={styles.blank}></span>
    );
    const formatedQuestion = question.map(word => {
      return (
        <span key={word} className="word">
          {word === answer ? blank : word + " "}
        </span>
      );
    });

    return formatedQuestion;
  };

  getFormatedChoices = () => {
    const { checkAnswer } = this;
    let { choices, answer, hasChoosedAnswer } = this.state;

    return choices.map(choice => {
      const btnColor = hasChoosedAnswer
        ? choice === answer
          ? "btn-success"
          : "btn-danger"
        : "btn-outline-dark";

      return (
        <button
          key={choice}
          onClick={checkAnswer}
          name={choice}
          className={"btn " + btnColor}
          style={styles.word}
        >
          {choice + " "}
        </button>
      );
    });
  };

  shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  render() {
    const { getFormatedQuestion, getFormatedChoices, moveNextQuestion } = this;
    const { questionStatus, hasChoosedAnswer } = this.state;
    const { answer, language } = this.props;
    const align = language.question === "ar" ? "text-right" : "";

    return (
      <>
        <div className="info">
          <h3 className="font-weight-bold">Complete the sentence</h3>
        </div>
        <div className={"question m-4 " + align}>{getFormatedQuestion()}</div>
        <div className="choices m-5 text-center">{getFormatedChoices()}</div>
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

const styles = {
  word: {
    marginLeft: "5px",
    padding: "5px"
  },
  blank: {
    borderBottom: "1px solid grey",
    marginBottom: "-10"
  }
};
