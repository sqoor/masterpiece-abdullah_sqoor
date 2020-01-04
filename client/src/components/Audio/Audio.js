import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faVolumeUp, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
// import { faVolumeUp } from "@fortawesome/fontawesome-svg-core";
// import { faVolumeUp } from "@fortawesome/react-fontawesome";

export default function Audio(props) {
  const { text, gender, autoplay } = props;

  function read() {
    window.responsiveVoice.speak(text, `Arabic ${gender}`);
  }

  if (autoplay) read();

  return (
    <button className="btn btn-light btn-sm" onClick={read}>
      <FontAwesomeIcon icon={faPlayCircle} size="2x" />
    </button>
  );
}

// - customize the auto read opetion or read on click
// - customize the size of the icon
// - customize male or female
