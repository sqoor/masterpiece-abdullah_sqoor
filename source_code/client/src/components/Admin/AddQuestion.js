import React, { Component } from "react";

export default class AddQuestion extends Component {
  iniState = {
    languageQuestion: "",
    languageAnswer: "",
    format: "",
    type: "",
    question: "",
    choices: [],
    answer: ""
  };

  state = this.iniState;

  clear = () => {
    this.setState(this.iniState);
  };

  changeHandler = e => {
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addChoice = e => {
    e.preventDefault();

    const choice = this.choiceInput.value;

    if (!choice) return;

    console.log("ADD CHOICE");
    console.log("choice", choice);

    this.setState(prevState => {
      prevState.choices.push(choice);
      return {
        ...prevState
      };
    });

    this.choiceInput.value = "";
  };

  deleteChoice = e => {
    e.preventDefault();

    const choice = e.target.innerText;

    console.log("Delete choice", e.target.innerText);

    this.setState(prevState => {
      prevState.choices = prevState.choices.filter(c => c !== choice);
      return {
        ...prevState
      };
    });
  };

  addQuestion = e => {
    e.preventDefault();

    const {
      languageQuestion,
      languageAnswer,
      format,
      type,
      question,
      choices,
      answer
    } = this.state;

    const newQuestion = {
      language: {
        question: languageQuestion,
        answer: languageAnswer
      },
      format,
      type,
      question,
      choices,
      answer
    };

    this.props.addQuestion(newQuestion);
    this.clear();
  };

  render() {
    const { clear, changeHandler, addChoice, deleteChoice, addQuestion } = this;
    const {
      languageQuestion,
      languageAnswer,
      format,
      type,
      question,
      choices,
      answer
    } = this.state;

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#addQuestionModal"
        >
          Add New Question
        </button>

        <div
          className="modal fade"
          id="addQuestionModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add New Question
                  </h5>
                  <button
                    onClick={clear}
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="question">Question</label>
                    <input
                      id="question"
                      name="question"
                      type="text"
                      className="form-control"
                      placeholder="Write Question..."
                      onChange={changeHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="answer">Answer</label>
                    <input
                      id="answer"
                      name="answer"
                      type="text"
                      className="form-control"
                      onChange={changeHandler}
                      placeholder="Write Answer..."
                    />
                  </div>

                  <label className="mt-4" htmlFor="language-question">
                    Question Language
                  </label>
                  <select
                    id="language-question"
                    name="languageQuestion"
                    className="form-control"
                    onChange={changeHandler}
                  >
                    <option>Question Language</option>
                    <option value="ar">Arabic</option>
                    <option value="en">English</option>
                  </select>

                  <label className="mt-4" htmlFor="language-answer">
                    Answer Language
                  </label>
                  <select
                    id="language-answer"
                    name="languageAnswer"
                    className="form-control"
                    onChange={changeHandler}
                  >
                    <option>Answer Language</option>
                    <option value="ar">Arabic</option>
                    <option value="en">English</option>
                  </select>

                  <label className="mt-4" htmlFor="format">
                    Question Format
                  </label>
                  <select
                    id="format"
                    name="format"
                    className="form-control"
                    onChange={changeHandler}
                  >
                    <option>Fromat</option>
                    <option value="text">Text</option>
                    <option value="audio">Audio</option>
                    <option value="video">Video</option>
                  </select>

                  <label className="mt-4" htmlFor="type">
                    Question Type
                  </label>

                  <select
                    id="type"
                    name="type"
                    className="form-control"
                    onChange={changeHandler}
                  >
                    <option>Type</option>
                    <option value="fill-blank">Fill Blank</option>
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="complete-sentence">Complete Sentence</option>
                  </select>

                  <div className="form-group mt-4">
                    <label htmlFor="choice">Choices</label>
                    <div className="d-flex">
                      <input
                        id="choice"
                        name="choice"
                        type="text"
                        className="form-control"
                        placeholder="Write choice..."
                        ref={choice => (this.choiceInput = choice)}
                      />{" "}
                      <button
                        className="btn btn-info btn-sm"
                        onClick={addChoice}
                      >
                        Add
                      </button>
                    </div>
                    <div className="mt-4 border p-2">
                      {choices.map((choice, index) => (
                        <button
                          key={index}
                          onClick={deleteChoice}
                          className="btn btn-light d-block"
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    onClick={clear}
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancle
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={addQuestion}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/*
{
  "language": {
    "question": "ar",
    "answer": "ar"
  },
  "answer": "أ"
  "question": "three",
  "formate": "audio",
  "type": "multiple-choice",
  "choices": ["أ", "ب", "د", "ي"],
}


 <div className="form-group">
    <label htmlFor="image">Image</label>
    <input
      type="file"
      className="form-control-file"
      id="image"
    />
  </div>
*/
