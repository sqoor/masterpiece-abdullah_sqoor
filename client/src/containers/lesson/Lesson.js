import React, { Component } from "react";

export default class Lesson extends Component {
  render() {
    const { id, name, image, progress } = this.props.location.state;
    return (
      <div>
        <p>id: {id}</p>
        <h1>name: {name}</h1>
        <p>progress: {progress}</p>
      </div>
    );
  }
}

// TODO: bug location not found if you just navigate to this page by copying the URL
