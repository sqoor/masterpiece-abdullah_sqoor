import React from "react";

export default function Progress(props) {
  return (
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${props.progress}%` }}
        aria-valuenow={props.propgress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {props.progress}%
      </div>
    </div>
  );
}
