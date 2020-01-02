import React from "react";

export default function PassMessage(props) {
  return (
    <div>
      excellent Correct Answer! {props.correctAnswer}{" "}
      <button onClick={props.moveNext}>Next</button>
    </div>
  );
}
