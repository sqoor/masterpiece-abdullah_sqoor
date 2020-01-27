import React from "react";
// import video from "./video.mp4";

export default function Video(props) {
  return (
    <div>
      <video autoPlay={true} controls width="320" height="240">
        <source src={require("./video.mp4")} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* <iframe
        src={video}
        controls
        width="320"
        height="240"
        // src="https://www.youtube.com/embed/pTF9kSTTXU0"
        frameborder="0"
      ></iframe> */}
    </div>
  );
}
