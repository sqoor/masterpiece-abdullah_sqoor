import React from "react";

export default function Audio(props) {
  const { text, gender, autoplay } = props;

  function read() {
    window.responsiveVoice.speak(text, `Arabic ${gender}`);
  }

  if (autoplay) read();

  return (
    <button className="btn btn-primary btn-sm" onClick={read}>
      Read
    </button>
  );
}

// - customize the auto read opetion or read on click
// - customize the size of the icon
// - customize male or female
