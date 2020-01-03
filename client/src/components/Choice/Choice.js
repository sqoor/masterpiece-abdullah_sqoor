import React from "react";

export default function Choice(props) {
  const { checkAnswer, choice, answer, hasChoosedAnswer } = props;
  const btnColor = hasChoosedAnswer
    ? choice === answer
      ? "btn-success"
      : "btn-danger"
    : "btn-outline-dark";

  return (
    <button
      onClick={checkAnswer.bind(choice)}
      name={choice}
      className={"col-5 m-1 btn" + " " + btnColor}
      disabled={hasChoosedAnswer}
    >
      {choice}
    </button>
  );
}
