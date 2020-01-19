import React, { Component } from "react";

import ResultMessage from "../ResultMessage/ResultMessage";

export default class MakeSentenceQuestion extends Component {
  state = {
    questionStatus: "",
    hasChoosedAnswer: false,
    choosedAnswerBtn: null,
    arabicLetter: false,
    userAnswer: [],
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
    let { choices, answer } = this.props;
    const answerNotExistedInChocies = choices.indexOf(answer) === -1;

    answer = answer.split(" ");

    if (answer.length === 1) {
      answer = answer.join().split("");
      this.setState({arabicLetter: true})
    }

    if (answerNotExistedInChocies) choices = choices.concat(answer);

    return choices;
  };

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

    const { userAnswer, hasChoosedAnswer, arabicLetter } = this.state;
    if (hasChoosedAnswer) return;

    const { answer } = this.props;
    let choice = userAnswer.join(" ").trim();
    choice =  arabicLetter ? choice.replace(/ /g, "") : choice;

    const questionStatus = choice === answer ? "pass" : "fail";

    console.log(answer.split("").join(""));
    console.log(choice);
    console.log(choice === answer);
    console.log(questionStatus);
    await this.setState({
      questionStatus,
      hasChoosedAnswer: true
    });
  };

  moveNextQuestion = () => {
    const { passQuestion, retryQuestion } = this.props;
    const { questionStatus } = this.state;
    const { shuffle } = this;

    if (questionStatus === "pass") {
      passQuestion();
    } else {
      this.setState(prevState => ({
        ...prevState,
        choices: shuffle([...prevState.choices, ...prevState.userAnswer])
      }));
      retryQuestion();
    }

    this.setState({ 
      hasChoosedAnswer: false, 
      arabicLetter: false,
      userAnswer: []
    });
  };

  getFormatedChoices = () => {
    const { addToUserAnswer } = this;
    let { choices, hasChoosedAnswer } = this.state;

    return choices.map(choice => {
      const btnColor = hasChoosedAnswer ? "btn-dark" : "btn-outline-dark";

      return (
        <button
          className={"btn " + btnColor}
          onClick={addToUserAnswer}
          style={styles.word}
          name={choice}
          key={choice}
        >
          {choice + " "}
        </button>
      );
    });
  };

  addToUserAnswer = e => {
    e.preventDefault();

    const word = e.target.name;
    const { userAnswer, choices } = this.state;

    this.setState(prevState => ({
      ...prevState,
      // userAnswer: [...userAnswer, word + " "], // TODO: BUG: extra space
      userAnswer: [...userAnswer, word],
      choices: choices.filter(w => w !== word)
    }));
  };

  removeFromUserAnswer = e => {
    e.preventDefault();

    const word = e.target.name;
    const { userAnswer, choices } = this.state;

    this.setState(prevState => ({
      ...prevState,
      choices: [...choices, word],
      userAnswer: userAnswer.filter(w => w !== word)
    }));
  };

  getUserAnswer = () => {
    const { userAnswer, hasChoosedAnswer, arabicLetter } = this.state;
    const { removeFromUserAnswer } = this;
    const { language } = this.props;

    if (hasChoosedAnswer && arabicLetter ) 
      return userAnswer.join("").replace(/ /g, "");

    const formatedUserAnswer = userAnswer.map((word, index) => (
      <button
        className="btn btn-light p-0 mr-1"
        onClick={removeFromUserAnswer}
        key={index + word}
        name={word}
      >
        {word}
      </button>
    ));

    if (language.answer === "ar") return formatedUserAnswer.reverse();

    return formatedUserAnswer;
  };

  shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  render() {
    const {
      getFormatedChoices,
      moveNextQuestion,
      getUserAnswer,
      checkAnswer
    } = this;
    const { questionStatus, hasChoosedAnswer, userAnswer } = this.state;
    const { question, answer } = this.props;

    return (
      <>
        <div className="info">
          <h3 className="font-weight-bold">Make a sentence</h3>
        </div>
        <div className="question m-4">{question}</div>

        <div className="user-answer m-5" style={styles.userAnswer}>
          {getUserAnswer()}
        </div>

        <div className="choices m-5">{getFormatedChoices()}</div>

        {userAnswer.length && !hasChoosedAnswer ? (
          <div className="submit-answer d">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={checkAnswer}
            >
              Submit Answer
            </button>
          </div>
        ) : null}

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
  },
  userAnswer: {
    borderBottom: "1px solid grey",
    paddingBottom: "-20"
  }
};

// FIXED - bug - arabic pushing array from the otherside

// FIXED - bug - if the wrong answer then next the choices (correct ones) will disappear.

// FIXED - bug - if toggling between the userAnswer and choices will add extra spaces, leading to fail answer even if all correct words there.
// but not letters

// bug - if answer has similar words then when toggled bweteen the usersAnwer or choices it will be gone
// bug - do not allow to choose another words (remove from choice or add to userAnswer after submitting the answer
// test words. form sentence and words.

