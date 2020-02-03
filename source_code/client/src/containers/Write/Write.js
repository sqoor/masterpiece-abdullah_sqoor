import React, { Component } from "react";

export default class Write extends Component {
  render() {
    return (
      <div className="mt-5">
        <h1 className="text-muted text-center">
          Learn to Write In Arabic Lessons
        </h1>

        <div className="container mt-4">
          <div className="row d-flex justify-content-between">
            <div className="col-5 m-2">
              <iframe
                width="520"
                height="415"
                src="https://www.youtube.com/embed/hA3Uji7xmRc"
              ></iframe>
            </div>
            <div className="col-5 m-2">
              <iframe
                width="520"
                height="415"
                src="https://www.youtube.com/embed/tgbNymZ7vqY"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
