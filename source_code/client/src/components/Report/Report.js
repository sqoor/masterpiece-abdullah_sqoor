import React from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

export default function Report(props) {
  const { errQuestions, totalQuestionsCount } = props;
  const errQuestionsCount = errQuestions ? errQuestions.length : 0;
  const successQuestionsCount = totalQuestionsCount - errQuestionsCount;

  return (
    <div className="container my-5">
      <h2 className="text-center text-muted">Report</h2>
      <hr />
      <div>
        <h3>Status</h3>
        <p>
          Successfully answered question {successQuestionsCount} /
          {totalQuestionsCount}
        </p>
        <p>
          Miss answered question {errQuestionsCount} / {totalQuestionsCount}
        </p>
        <p>
          Rate of success{" "}
          {Math.round((successQuestionsCount / totalQuestionsCount) * 100)}%
        </p>
        <p>
          Rate of fail{" "}
          {Math.round((errQuestionsCount / totalQuestionsCount) * 100)}%
        </p>
      </div>
      <Link to="/learn" className="btn btn-outline-primary">
        Continue{" "}
        <span className="ml-2">
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </Link>
      <div>
        {errQuestions.length ? (
          <>
            <h3 className="text-center mt-5">Miss Answered Questions</h3>
            <div className="row d-flex justify-content-center">
              {errQuestions.map(question => (
                <div
                  key={question.id}
                  className="final-report card m-3 col-3 border-danger"
                >
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    size="2x"
                    className="bg-danger rounded-circle mt-2"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      {question.question}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted text-center"></h6>
                    <p className="card-text">
                      <span className="border p-2 m-3 d-block bg-success text-light text-center rounded">
                        {question.answer}
                      </span>
                      {question.choices.map(choice => (
                        <span
                          key={choice + new Date().getMilliseconds}
                          className="border p-2 m-3 d-block bg-danger text-light text-center rounded"
                        >
                          {choice}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
