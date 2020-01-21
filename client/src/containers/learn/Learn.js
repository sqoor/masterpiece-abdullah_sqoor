import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "./learn.css";

import LessonCard from "../../components/LessonCard/LessonCard";
import Axios from "axios";

export default class Learn extends Component {
  state = {
    lessons: []
  };

  getToken() {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);

    return token;
  }

  requestApi = () => {
    const token = this.getToken();

    Axios.get("/lessons", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (res.status === 200) {
          console.log("you are authenticated");
          this.setState({ lessons: res.data });
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.props.history.push("/login");
          console.log(
            "you are not authorized, redirect to signup login, wrong token"
          );
        } else {
          this.props.history.push("/login");
          console.log(
            "something went bad, maybe server down, redirect to login/register"
          );
        }
        console.log("ERROR", error);
      });
  };

  componentDidMount() {
    this.requestApi();
  }

  render() {
    const { lessons } = this.state;

    return (
      <div>
        <h1>Learn Components - Page</h1>

        <div className="container">
          <div className="row">
            {lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                to={{ pathname: `lesson/${lesson.name}`, state: lesson }}
              >
                <LessonCard number={index + 1} {...lesson} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
