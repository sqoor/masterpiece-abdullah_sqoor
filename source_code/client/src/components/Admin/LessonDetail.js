import React, { Component } from "react";

import Axios from "axios";

import AddQuestion from "./AddQuestion";

export default class LessonDetail extends Component {
  state = {
    questions: []
  };

  componentDidMount() {
    if (!this.props.location.state) this.props.history.push("/admin/lesson");

    this.getQuestions();
  }

  getQuestions = () => {
    const { lessonId } = this.props;

    Axios.get("/lessons/" + lessonId)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  addQuestion = newQuestion => {
    const { lessonId } = this.props;

    Axios.post(`/lessons/${lessonId}/question`, newQuestion)
      .then(res => {
        console.log("Adding new question", res);
      })
      .catch(error => {
        console.log("Error adding a question", error);
      });
  };

  render() {
    const { _id, name } = this.props.location.state;
    const { questions } = this.state;
    const { addQuestion } = this;

    return (
      <div className="mt-5">
        <h1 className="text-muted text-center mb-5">{name}</h1>
        <AddQuestion addQuestion={addQuestion} lessonId={_id} />
        {questions.map(question => {
          return <div className="col-3">{question.question}</div>;
        })}
      </div>
    );
  }
}
