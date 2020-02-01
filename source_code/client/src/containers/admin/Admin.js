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

  deleteLesson = lessonId => {
    Axios.delete(`/lessons/${lessonId}`)
      .then(res => {
        if (res.status === 200) {
          // check n deleted
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

  componentDidMount() {
    this.getLessons();
  }

  render() {
    const { lessons } = this.state;
    const { addLesson, deleteLesson } = this;
    return (
      <div>
        <h1>Content Manager Dashboard</h1>
        <p>
          This page only for authorized people, which will be responsible for
          adding content; the questions and their answers for the users.
        </p>
        <AddLesson addLesson={addLesson} />
        <LessonsList lessons={lessons} deleteLesson={deleteLesson} />
      </div>
    );
  }
}
