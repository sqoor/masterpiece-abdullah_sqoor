import React from "react";

import Choice from "../Choice/Choice";

export default function Choices(props) {
  const { hasChoosedAnswer, answer, choices, checkAnswer } = props;
  return (
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
  );
}
