import React from "react";
import Progress from "../Progress/Progress";

export default function LessonCard(props) {
  const progressBar =
    props.progress > 0 ? <Progress progress={props.progress} /> : null;

  function convertToReadable(name) {
    return name.replace("-", " ");
  }

  return (
    <div className="mt-5 mx-2 col-12">
      <div className="card" style={{ width: "18rem" }}>
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <span className="float-left badge badge-pill badge-info">
            {props.number}
          </span>
          <h6 className="card-title text-capitalize">
            {convertToReadable(props.name)}
          </h6>
          <p className="card-text"> {props.description}</p>
          {progressBar}
        </div>
      </div>
    </div>
  );
}
