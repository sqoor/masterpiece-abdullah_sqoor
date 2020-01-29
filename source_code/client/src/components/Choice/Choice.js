import React from "react";
import Audio from "../Audio/Audio";

export default function Choice(props) {
  const { checkAnswer, choice, answer, hasChoosedAnswer, language } = props;
  const btnColor = hasChoosedAnswer
    ? choice === answer
      ? "btn-success"
      : "btn-danger"
    : "btn-outline-dark";

  function clickHanlder(e) {
    e.preventDefault();

    console.log(
      "choice === answer && language === ar",
      choice === answer && language === "ar"
    );

    checkAnswer(e);
    return choice === answer && language === "ar" ? (
      <Audio text={choice} autoplay={true} />
    ) : null;
  }

  return (
    <button
      onClick={clickHanlder}
      name={choice}
      className={"col-5 m-1 btn " + btnColor}
      disabled={hasChoosedAnswer}
    >
      {choice}
    </button>
  );
}
