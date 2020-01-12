import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faVolumeUp, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
// import { faVolumeUp } from "@fortawesome/fontawesome-svg-core";
// import { faVolumeUp } from "@fortawesome/react-fontawesome";

export default function Audio(props) {
  const { text, gender, autoplay, size, speed } = props;
  const iconSize = size ? size + "x" : "2x";
  const voiceSpeed = speed === "slow" ? 0.45 : 1;

  function read() {
    window.responsiveVoice.speak(text, `Arabic ${gender}`, {
      rate: voiceSpeed
    }); // TODO:: uncomment
  }

  if (autoplay) read();

  return (
    <button className="btn btn-light btn-sm" onClick={read}>
      <FontAwesomeIcon icon={faVolumeUp} size={iconSize} />
    </button>
  );
}

// DONE - customize male or female
// DONE - customize the auto read opetion or read on click
// DONE - customize the size of the icon
