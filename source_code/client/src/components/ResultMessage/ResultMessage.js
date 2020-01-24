import React from "react";

export default function ResultMessage(props) {
  const { hasChoosedAnswer, answer, questionStatus, moveNextQuestion } = props;
  const answeredCorrectly = questionStatus === "pass";
  const message = answeredCorrectly ? "Excellent" : "Wrong answer";
  const alertColor = answeredCorrectly ? "success" : "danger";

  if (!hasChoosedAnswer) return null;

  return (
    <div className={`final-message mt-3 alert alert-${alertColor}`}>
      <div>
        <p>{message}</p>
        <p>The correct answer is: {answer} </p>
        <button className="btn btn-light" onClick={moveNextQuestion}>
          Continue
        </button>
      </div>
    </div>
  );
}
