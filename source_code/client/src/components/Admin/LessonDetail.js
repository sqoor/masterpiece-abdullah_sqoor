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
    const { _id } = this.props.location.state;

    Axios.get("/lessons/" + _id)
      .then(res => {
        if (res.status === 200) {
          this.setState({ questions: res.data.questions });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  addQuestion = newQuestion => {
    const { _id } = this.props.location.state;

    Axios.post(`/lessons/${_id}/question`, newQuestion)
      .then(res => {
        const { n, nModified, ok } = res.data.result;

        if (n === 1 && nModified === 1 && ok === 1) {
          this.setState(prevState => {
            prevState.questions.push(res.data.newQuestion);
            return { ...prevState };
          });
        }
      })
      .catch(error => {
        console.log("Error adding a question", error);
      });
  };

  deleteQuestion = questionId => {
    const lessonId = this.props.location.state._id;

    if (!window.confirm("Are you sure want to delete?")) return;

    Axios.delete(`/lessons/${lessonId}/questions/${questionId}`).then(res => {
      console.log(res);
      if (res.data.n === 1 && res.data.nModified === 1 && res.data.ok === 1) {
        this.setState(prevState => {
          prevState.questions = prevState.questions.filter(
            question => question._id !== questionId
          );
          return { ...prevState };
        });
      }
    });
  };

  render() {
    const { _id, name } = this.props.location.state;
    const { addQuestion, deleteQuestion } = this;
    const { questions } = this.state;

    return (
      <div className="container mt-5">
        <h1 className="text-muted mb-5">{name}</h1>
        <AddQuestion addQuestion={addQuestion} lessonId={_id} />
        <div className="row mt-5">
          {questions.map((question, index) => {
            return (
              <div
                key={question._id ? question._id : index}
                className="col-3 card m-2"
              >
                <div className="card-header">
                  <button
                    className="btn btn-danger"
                    onClick={deleteQuestion.bind(this, question._id)}
                  >
                    X
                  </button>
                </div>

                <div className="p-1">Question: {question.question}</div>
                <p className="p-1"> Answer: {question.answer}</p>
                <p className="p-1">
                  Question Language:
                  {question.language.question}
                </p>
                <p className="p-1">
                  Answer Language: {question.language.answer}
                </p>

                <p className="p-1">Question Type: {question.type}</p>

                <p className="p-1">
                  Question Format: {question.formate}
                </p>

                <div className="p-1">
                  Choices:
                  <ul>
                    {question.choices.map((choice, index) => (
                      <li key={index}> {choice}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
