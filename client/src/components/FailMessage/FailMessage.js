import React from "react";

export default function FailMessage(props) {
  return (
    <div>
      Wrong Answer! <button onClick={props.moveNext}>Next</button>
    </div>
  );
}
