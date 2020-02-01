import React, { Component } from "react";

export default class EditLesson extends Component {
  state = {
    name: "",
    image: "no-image"
  };

  componentDidMount() {
    this.setState({
      name: this.props.name,
      image: this.props.image
    });
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updateLesson = () => {
    if (window.confirm("Are you sure want update?"))
      this.props.updateLesson(
        this.props._id,
        this.state.name,
        this.state.image
      );
  };

  render() {
    const { changeHandler, updateLesson } = this;
    const { name, image } = this.state;

    return (
      <>
        <button
          type="button"
          className="btn btn-warning btn-sm m-1"
          data-toggle="modal"
          data-target={"#editModal" + this.props._id}
        >
          Edit
        </button>

        <div
          className="modal fade"
          id={"editModal" + this.props._id}
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
                    Update Lesson
                  </h5>
                  <button
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
                    <label htmlFor={"name" + this.props._id}>Name</label>
                    <input
                      value={name}
                      onChange={changeHandler}
                      name="name"
                      type="text"
                      className="form-control"
                      id={"name" + this.props._id}
                      placeholder="Enter Lesson Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={"image " + this.props._id}>Image</label>
                    <input
                      name={image}
                      type="file"
                      className="form-control-file"
                      id={"image" + this.props._id}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancle
                  </button>
                  <button
                    onClick={updateLesson}
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
      </>
    );
  }
}
