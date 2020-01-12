import React from "react";

export default function ResultMessage(props) {
  const { hasChoosedAnswer, answer, questionStatus, moveNextQuestion } = props;
  const message = props.message === "pass" ? "Excellent" : "Wrong answer";

  return (
    <div className="final-message m-3">
      {hasChoosedAnswer ? (
        <div>
          {questionStatus}! The correct answer {answer}{" "}
          <button onClick={moveNextQuestion}>Next</button>
        </div>
      ) : null}
    </div>
  );
}
