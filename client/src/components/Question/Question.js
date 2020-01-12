import React from "react";
import Audio from "../Audio/Audio";
import Video from "../Video/Video";

export default function Question(props) {
  const { question, language, formate } = props;

  function getQuestionFormate() {
    switch (formate) {
      case "text":
        return (
          <>
            <Audio autoplay={true} gender="Male" text={question} />
            <span className="ml-2">{question}</span>
          </>
        );
      case "audio":
        return (
          <>
            <Audio autoplay={true} gender="Male" text={question} size="5" />
            <Audio gender="Male" text={question} size="3" speed="slow" />
          </>
        );
      case "video":
        return <Video />;
      default:
        throw new Error(`question formate '${formate}' is not supported`);
    }
  }

  return <div className="question">{getQuestionFormate()}</div>;
}

// if language is english then don't read it and don't show the audio icon either
// if the formate is audio don't show the text
