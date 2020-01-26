import React from "react";

export default function Report(props) {
  const { errQuestions } = props;
  return (
    <div className="container">
      <div className="row">
        {errQuestions.map(question => (
          <div key={question.id} className="final-report card m-3 col-4">
            <p>{question.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
