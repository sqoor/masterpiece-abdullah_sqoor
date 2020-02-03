import React, { Component } from "react";

import Axios from "axios";

import AddLesson from "../../components/Admin/AddLesson";
import LessonsList from "../../components/Admin/LessonsList";

export default class Admin extends Component {
  state = {
    lessons: []
  };

  addLesson = newLesson => {
    console.log(newLesson);
    Axios.post("/lessons", newLesson).then(res => {
      if (res.status === 201) {
        this.setState(prevState => {
          prevState.lessons.push(res.data);
          return {
            ...prevState
          };
        });
      } else {
        console.log("Something went wrong adding new lesson", res);
      }
    });
  };

  getLessons = () => {
    Axios.get("/lessons")
      .then(res => {
        if (res.status === 200) {
          this.setState({ lessons: res.data });
        }
      })
      .catch(error => {
        console.log("Error getting lessons", error);
      });
  };

  updateLesson = (id, name, image) => {
    Axios.put("/lessons/" + id, { name, image })
      .then(res => {
        if (res.data.n === 1 && res.data.nModified === 1 && res.data.ok === 1) {
          this.setState({
            lessons: this.state.lessons.map(lesson => {
              if (lesson._id === id) {
                lesson.name = name;
                lesson.image = image;
              }

              return lesson;
            })
          });
        } else {
          console.log("Something went wrong, updating lesson");
        }
      })
      .catch(error => {
        console.log("Something went wrong, updating lesson", error);
      });
  };

  deleteLesson = lessonId => {
    Axios.delete(`/lessons/${lessonId}`)
      .then(res => {
        console.log("res", res);
        if (
          res.data.n === 1 &&
          res.data.ok === 1 &&
          res.data.deletedCount === 1
        ) {
          this.setState({
            lessons: this.state.lessons.filter(
              lesson => lesson._id !== lessonId
            )
          });
        }
      })
      .catch(error => {
        console.log("Error deleting lesson", error);
      });
  };

  // cannot be cloned via route, use inner api call inside AddQuestion
  addQuestion = newQuestion => {
    console.log("add question from admin");
    console.log("New Question", newQuestion);
  };

  componentDidMount() {
    if (this.props.location.state) {
      if (!this.props.location.state.admin) this.props.history.push("/login");
    } else this.props.history.push("/login");
    this.getLessons();
  }

  render() {
    const { lessons } = this.state;
    const { addLesson, addQuestion, updateLesson, deleteLesson } = this;
    return (
      <div className="container mt-3">
        <h1 className="text-muted text-center">Content Manager Dashboard</h1>
        <p className="text-muted mb-5">
          This page only for authorized people, which will be responsible for
          adding content; the questions and their answers for the users.
        </p>
        <AddLesson addLesson={addLesson} />
        <LessonsList
          lessons={lessons}
          deleteLesson={deleteLesson}
          updateLesson={updateLesson}
          addQuestion={addQuestion}
        />
      </div>
    );
  }
}
