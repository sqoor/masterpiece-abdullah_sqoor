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
        question: "هل ذَهبتَ إلى المدرسةِ اليوم؟",
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

/*
// types of questions:

# 1- multiple choice:
which is built currently under TextQuestion so you might want to change the name

however refactor this compoents to have three major components:
a- info (optional)
b- question:
which has three types audio/text/video (for arabic only/ if was english then only text)
c- choices:
(optional) could have two types, text and audio

d- the message (result of your choice) correct answer wrong answer(button to move next question)


audio questions the answer choices should have voices also
maby all the arabic words should have voice when they are clicked


# 2- complete the senctence:
has only arabic language text, it doesn't make sense to complete English sentence

it consist of:
a- a sentence has one or more words missing.
b- list of words (buttons) when you click them they would fill the first blank
then second .. etc.



# 3- make a full sentence
the question is English (or not exists at all not sure)
has only arabic sentences, make no sense to do English sentences

the answer is a list of separated random words (buttons) when you click will goes inline
after each other to form a sentence 

this type could be integrated with the first thus the quetions could be video audio text
but the answers could be multiple choice or form a complete sentence




The message part should have the meaning of the sencence is case it was asked in Arabic
and the answer is also arabic, and has a button to move to the next question
should indicates if your answer is correct or wrong, 
should indicates ifand what is the correct answer ONLY IF WAS WRONG.



After done the lesson show the page to say that the lesson is completed and also the statistic
how many question you answered correctly and what did you miss.




one lesson must have stages /lesson/alphabet/{id} 1/2/3/4/5/...29 maybe have different set of questions but on the same topic
*/
