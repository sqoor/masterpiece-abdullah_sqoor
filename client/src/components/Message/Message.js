import React from "react";

export default function Message(props) {
  const message = props.message === "pass" ? "Excellent" : "Wrong answer";
  return (
    <div>
      {message}! The correct answer {props.correctAnswer}{" "}
      <button onClick={props.moveNext}>Next</button>
    </div>
  );
}
