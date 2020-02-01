import React, { Component } from "react";
import AddQuestion from "./AddQuestion";

export default class LessonDetail extends Component {
  componentDidMount() {
    if (!this.props.location.state) this.props.history.push("/admin/lesson");
  }
  render() {
    const { name, addQuestion } = this.props.location.state;

    return (
      <div className="mt-5">
        <h1 className="text-muted text-center mb-5">{name}</h1>
        <AddQuestion addQuestion={addQuestion} />
      </div>
    );
  }
}
