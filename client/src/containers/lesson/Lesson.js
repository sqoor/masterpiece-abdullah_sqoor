import React, { Component } from "react";
import TextQuestion from "../../components/TextQuestion/TextQuestion";
import AudioQuestion from "../../components/AudioQuestion/AudioQuestion";
import VideoQuestion from "../../components/VideoQuestion/VideoQuestion";
import Progress from "../../components/Progress/Progress";

export default class Lesson extends Component {
  state = {
    questionsCount: 4,
    questions: [
      {
        id: 1,
        type: "text",
        question: "Hello",
        choices: ["مرحبا", "سلام", "معا", "الى اللقاء"],
        answer: "مرحبا"
      },
      {
        id: 2,
        type: "text",
        question: "مرحبا",
        choices: ["Hello", "Hi", "Goodbye", "See you later"],
        answer: "Hello"
      },
      {
        id: 3,
        type: "text",
        question: "مرحبا", // link to audio/video
        choices: ["Hello", "Hi", "Goodbye", "See you later"],
        answer: "Hello"
      },
      {
        id: 4,
        type: "text",
        question: "مرحبا", // link to audio/video
        choices: ["Hello", "Hi", "Goodbye", "See you later"],
        answer: "Hello"
      }
    ],
    resutls: []
  };

  showQuestion = () => {
    const questions = this.state.questions;
    if (questions.length < 1) return null;

    const question = questions[0];

    switch (question.type) {
      case "text":
        return (
          <TextQuestion
            {...question}
            passQuestion={this.passQuestion}
            retryQuestion={this.retryQuestion}
          />
        );
      case "audio":
        return (
          <AudioQuestion
            {...question}
            passQuestion={this.passQuestion}
            retryQuestion={this.retryQuestion}
          />
        );
      case "video":
        return (
          <VideoQuestion
            {...question}
            passQuestion={this.passQuestion}
            retryQuestion={this.retryQuestion}
          />
        );
      default:
        throw new Error("Question type is not recognized");
    }
  };

  passQuestion = () => {
    this.setState(prevState => {
      prevState.questions.shift();
      return { ...prevState, questions: prevState.questions };
    });

    console.log(this.state.questions);
  };

  retryQuestion = () => {
    this.setState(prevState => {
      const unansweredQuestion = prevState.questions.shift();
      prevState.questions.push(unansweredQuestion);
      return { ...prevState, questions: prevState.questions };
    });
  };

  render() {
    const { showQuestion } = this;
    const { id, name, image, progress } = this.props.location.state;
    return (
      <div>
        <h1>Module info</h1>
        <div className="w-75 m-auto">
          <Progress
            progress={
              (this.state.questionsCount - this.state.questions.length) *
              (100 / this.state.questionsCount)
            }
          />
          <p>
            Exercise Progress:{" "}
            {(this.state.questionsCount - this.state.questions.length) *
              (100 / this.state.questionsCount)}
          </p>
        </div>
        <p>id: {id}</p>
        <p>name: {name}</p>
        <p>total unit progress: {progress}</p>
        <hr className="bg-danger w-75 my-5" />
        <div className="border">{showQuestion()}</div>
      </div>
    );
  }
}

// TODO: bug location not found if you just navigate to this page by copying the URL
// bootstrap navbar
// levels of the lesson

// types of questions:
// A - translate English-Arabic Arabic-English text-text
// B - listen Arabic-Arabic Arabic-English audio-text
// C - video Arabic-Arabic Arabic-English video-text
// D -
// E -
// 1- listen: audio plays and you pick from written choices
// 2- read: read a text and pick from audio choices
// 3- write: written question pick a text
// 4- listen question in Arabic choose arabic text
// 5- type in Arabic or choose from random words (translate)
// 6- type in English question in French (translate)
// 7- complete sentence (plurlas singular)
// 8- video watch and choose what they saying text
