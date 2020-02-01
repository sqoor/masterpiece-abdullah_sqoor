import React, { Component } from "react";

export default class AddLesson extends Component {
  state = {
    name: "",
    image: "no-image"
  };

  clear = () => {
    this.setState({
      name: "",
      image: "no-image"
    });
  };

  changeHandler = e => {
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { clear, changeHandler } = this;
    const { name, image } = this.state;
    const { addLesson } = this.props;

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Add New Lesson
        </button>

        <div
          className="modal fade"
          id="exampleModal"
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
                    Add New Lesson
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
                    <label htmlFor="name">Name</label>
                    <input
                      value={name}
                      onChange={changeHandler}
                      name="name"
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Lesson Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="image"
                    />
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
                    onClick={addLesson.bind(this, this.state)}
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
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
