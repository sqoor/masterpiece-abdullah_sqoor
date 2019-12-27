import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "./learn.css";

import LessonCard from "../../components/LessonCard/LessonCard";

export default class Learn extends Component {
  state = {
    lessons: [
      {
        id: 1,
        name: "alphabets-basics",
        image: "no-image",
        progress: "100" // get from the logged user.
      },
      {
        id: 2,
        name: "alphabets-ii",
        image: "no-image",
        progress: "60" // get from the logged user.
      },
      {
        id: 3,
        name: "alphabets-advance",
        image: "no-image",
        progress: "10" // get from the logged user.
      },
      {
        id: 4,
        name: "greetings",
        image: "no-image",
        progress: "0" // get from the logged user.
      }
    ]
  };

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
