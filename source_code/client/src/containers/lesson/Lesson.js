import React, { Component } from "react";

import Progress from "../../components/Progress/Progress";
import MultipleChoiceQuestion from "../../components/MultipleChoiceQuestion/MultipleChoiceQuestion";
import FillBlankQuestion from "../../components/FillBlankQuestion/FillBlankQuestion";
import MakeSentenceQuestion from "../../components/MakeSentenceQuestion/MakeSentenceQuestion";

export default class Lesson extends Component {
  state = {
    questionsCount: 4,
    questions: MultipleChoiceQuestionsTest,
    resutls: []
  };

  showQuestion = () => {
    const { passQuestion, retryQuestion } = this;
    const questions = this.state.questions;
    if (questions.length < 1) return null;

    const question = questions[0];

    switch (question.type) {
      case "multiple-choice":
        return (
          <MultipleChoiceQuestion
            {...question}
            passQuestion={passQuestion}
            retryQuestion={retryQuestion}
          />
        );
      case "fill-blank":
        return (
          <FillBlankQuestion
            {...question}
            passQuestion={passQuestion}
            retryQuestion={retryQuestion}
          />
        );
      case "make-sentence":
        return (
          <MakeSentenceQuestion
            {...question}
            passQuestion={passQuestion}
            retryQuestion={retryQuestion}
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
    // const { id, name, image, progress } = this.props.location.state;
    const progress =
      (this.state.questionsCount - this.state.questions.length) *
      (100 / this.state.questionsCount);

    return (
      <div className="w-75 mx-auto mt-5">
        <Progress progress={progress} />
        <div className="border mt-5 p-5">{showQuestion()}</div>
      </div>
    );
  }
}

// TODO: TEST:  dummy questions for testing ///////////////////////////

const MakeSentenceQuestionsCountTest = 5;
const MakeSentenceQuestionsTest = [
  {
    id: 30,
    language: {
      question: "en",
      answer: "ar"
    },
    formate: "text",
    type: "make-sentence",
    question: "a man",
    choices: ["م", "ن", "ع", "د"],
    answer: "رجل"
  },
  {
    id: 31,
    language: {
      question: "ar",
      answer: "en"
    },
    formate: "text",
    type: "make-sentence",
    question: "هل تستظيع الكتابة",
    choices: ["She", "sun", "read", "man"],
    answer: "Can you write"
  },
  {
    id: 32,
    language: {
      question: "en",
      answer: "ar"
    },
    formate: "text",
    type: "make-sentence",
    question: "Third type of questions",
    choices: ["سيارة", "نور", "مرحبا", "احمد"],
    answer: "ثالث انواع الاسئلة"
  },
  {
    id: 33,
    language: {
      question: "ar",
      answer: "en"
    },
    formate: "text",
    type: "make-sentence",
    question: "انا ادرس  اللغة العربية",
    choices: ["He", "when", "there", "sometimes"],
    answer: "I am styding the Arabic Languge"
  },
  {
    id: 34,
    language: {
      question: "en",
      answer: "ar"
    },
    formate: "text",
    type: "make-sentence",
    question: "I Love the life",
    choices: ["و", "هو", "معين", "كتاب"],
    answer: "أنا احب الحياة"
  }
];

const FillBlankQuestionsCountTest = 3;
const FillBlankQuestionsTest = [
  {
    id: 21,
    language: {
      question: "ar",
      answer: "ar"
    },
    formate: "text",
    type: "fill-blank",
    question: ".مرحبا بكم في موقعنا", // link to audio/video
    choices: ["العلم", "نور", "الجميل", "احمد"],
    answer: "في"
  },
  {
    id: 22,
    language: {
      question: "ar",
      answer: "ar"
    },
    formate: "text",
    type: "fill-blank",
    question: "اين السؤال الثاني؟", // link to audio/video
    choices: ["سيارة", "نور", "مرحبا", "احمد"],
    answer: "اين"
  },
  {
    id: 23,
    language: {
      question: "ar",
      answer: "ar"
    },
    formate: "text",
    type: "fill-blank",
    question: "انا ادرس  اللغة العربية", // link to audio/video
    choices: ["مشيت", "وقف", "الشمس", "صباحاً"],
    answer: "ادرس"
  }
];

const MultipleChoiceQuestionsCountTest = 4;
const MultipleChoiceQuestionsTest = [
  {
    id: 1,
    // type: "multiple-choice|fill-blank|make-sentence",
    // formate: "text|audio|video",
    language: {
      question: "ar",
      answer: "en"
    },
    type: "fill-blank",
    formate: "video",
    question: "http://localhost:8000/path/to/video",
    choices: [
      "This is a text question",
      "I want to go",
      "You need to work hard",
      "Goodbye"
    ],
    answer: "This is a text question"
  },
  {
    id: 2,
    // type: "multiple-choice|fill-blank|make-sentence",
    // formate: "text|audio|video",
    language: {
      question: "ar",
      answer: "en"
    },
    type: "fill-blank",
    formate: "audio",
    question: "هذا سؤال كتابي",
    choices: [
      "This is a text question",
      "I want to go",
      "You need to work hard",
      "Goodbye"
    ],
    answer: "This is a text question"
  },
  {
    id: 3,
    language: {
      question: "ar",
      answer: "en"
    },
    type: "fill-blank",
    formate: "audio",
    question: "هذا سؤال صوتي",
    choices: [
      "what do you hear",
      "Hi",
      "That is an audio question",
      "See you later"
    ],
    answer: "That is an audio question"
  },
  {
    id: 4,
    language: {
      question: "ar",
      answer: "en"
    },
    type: "fill-blank",
    formate: "text",
    question: "مرحبا", // link to audio/video
    choices: ["Day", "Hello", "Goodbye", "See you later"],
    answer: "Hello"
  }
];

/////////////////////////////////////////

// COMMENTS: /////////////////////////////////////////////

/*

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


// Types of Questions:
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


# 2- complete the senctence: fill-blank
has only arabic language text, it doesn't make sense to complete English sentence

it consist of:
a- a sentence has one or more words missing.
b- list of words (buttons) when you click them they would fill the first blank
then second .. etc.



# 3- make a full sentence- make-sentence
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
