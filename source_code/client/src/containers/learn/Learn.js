import React, { Component } from "react";
import { Link } from "react-router-dom";

import LessonCard from "../../components/LessonCard/LessonCard";
import Axios from "axios";

import AuthContext from "../../context/auth-context";

export default class Learn extends Component {
  state = {
    lessons: []
  };

  static contextType = AuthContext;

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
          console.log(
            "you are not authorized, redirect to signup login, wrong token,  redirect to login/register"
          );
          this.context.login(false);
          return this.props.history.push("/login"); //TODO: mayb this causing a bug, but redirectIfNotAuthentiated prevent it.
        } else {
          console.log("Something went bad, maybe server down");
        }
      });
  };

  redirectIfNotAuthenticated() {
    const token = localStorage.getItem("token");
    let notAuthenticated = true;

    if (token) notAuthenticated = false;

    if (notAuthenticated) this.props.history.push("/signup");
  }

  componentDidMount() {
    this.redirectIfNotAuthenticated();
    this.requestApi();
    console.log("Learn component Did Mount");
  }

  render() {
    const { lessons } = this.state;

    return (
      <div>
        <h2
          className="text-center mt-5 p-5 font-weight-bold border border-success"
          style={styles.title}
        >
          Lessons Page
        </h2>

        <div className="container">
          <div className="row d-flex justify-content-center">
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

const styles = {
  title: {
    clipPath:
      "polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)"
  }
};
