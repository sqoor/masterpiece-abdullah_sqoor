import React from "react";

export default function Report(props) {
  // const { errQuestions } = props;
  const errQuestions = FillBlankQuestionsTest;
  return (
    <div className="container mt-5">
      <h2 className="text-center text-muted">Report</h2>
      <hr />
      <div className="row mt-5 d-flex justify-content-center">
        {errQuestions.map(question => (
          <div key={question.id} className="final-report card m-3 col-3 border-success">
            <div class="card-body">
              <h5 class="card-title text-center">{question.question}</h5>
              <h6 class="card-subtitle mb-2 text-muted text-center"></h6>
              <p class="card-text">
                <span className="border p-2 m-3 d-block bg-success text-light text-center rounded">
                  {question.answer}
                </span>
                {question.choices.map(choice => (
                  <span className="border p-2 m-3 d-block bg-danger text-light text-center rounded">
                    {choice}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
