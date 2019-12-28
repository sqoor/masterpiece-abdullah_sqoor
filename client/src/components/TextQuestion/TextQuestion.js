import React from "react";

export default function TextQuestion(props) {
  console.log(props.id);
  function checkAnswer(e) {
    e.preventDefault();
    const choice = e.target.name;

    if (choice === props.answer) props.passQuestion();
    else props.retryQuestion();
  }
  return (
    <div>
      <p className="bg-warning">Question type: Translate Question </p>
      <p>{props.question}</p>
      <form>
        <div className="container">
          <div className="row">
            {props.choices.map(choice => (
              <button
                onClick={checkAnswer.bind(choice)}
                name={choice}
                className="col-5 m-1 btn btn-outline-dark"
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
