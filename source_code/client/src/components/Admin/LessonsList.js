import React from "react";

import { Link } from "react-router-dom";

export default function LessonsList(props) {
  const { lessons } = props;

  const deleteLesson = (lessonId, lessonName) => {
    if (window.confirm(`You will delete "${lessonName}" lesson, procced?`))
      props.deleteLesson(lessonId);
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        {lessons.map(lesson => (
          <div className="col-3 my-3" key={lesson._id}>
            {lesson.name}
            <div>
              <button
                className="btn btn-danger btn-sm m-1"
                onClick={deleteLesson.bind(this, lesson._id, lesson.name)}
              >
                Delete
              </button>
              <button className="btn btn-warning btn-sm m-1">Edit</button>

              <Link
                target="_blank"
                className="btn btn-info btn-sm m-1"
                to={`/admin/lessons/${lesson._id}`}
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
