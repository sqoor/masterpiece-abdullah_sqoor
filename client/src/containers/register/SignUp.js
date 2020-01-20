import React, { Component } from "react";

import Axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import { ToastContainer, toast, Zoom } from "react-toastify";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      element: message => (
        <div className="alert alert-danger mt-2">{message}</div>
      ),
      validators: {
        match: {
          message: "Do not match the password.",
          rule: val => val === this.state.password
        }
      }
    });
  }

  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  };

  requestApi = credentials => {
    Axios.post("/users/signup", { credentials })
      .then(res => {
        // do somesthing go to next page if has the token or respond to use unauthorized
        if (res.status === 201) console.log("Sign up and added a new user");
        else console.log("something went wrong");

        console.log("RESPONSE", res);
      })
      .catch(error => {
        console.log("ERROR", error);
        toast.error("Something went wrong");
      });
  };

  submitHandler = e => {
    e.preventDefault();

    const { requestApi, state } = this;

    if (this.validator.allValid()) {
      requestApi(state);
      console.log("Logining in...", state);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
      toast.error("Please fill the empty input fields");
    }

    console.log("Signing up...", this.state);
  };

  render() {
    const { validator, changeHandler, submitHandler } = this;
    const { name, email, password, passwordConfirmation } = this.state;

    return (
      <div className="container">
        <ToastContainer
          position={toast.POSITION.TOP_LEFT}
          transition={Zoom}
          toastClassName="rounded"
          hideProgressBar={true}
        />

        <h1 className="text-center">Sign up Page</h1>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="form-control"
              type="text"
              name="name"
              value={name}
              onChange={changeHandler}
            />
            {validator.message("name", name, "required|alpha")}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form-control"
              type="email"
              name="email"
              value={email}
              onChange={changeHandler}
            />
            {validator.message("email", email, "required|email")}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="form-control"
              type="password"
              name="password"
              value={password}
              onChange={changeHandler}
            />
            {validator.message("password", password, "required|between:8,255")}
          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input
              id="password_confirmation"
              className="form-control"
              type="password"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={changeHandler}
            />
            {validator.message(
              "password confirmation",
              passwordConfirmation,
              "required|match"
            )}
          </div>
          <input
            className="btn btn-outline-success"
            type="submit"
            value="Sign Up"
          />
        </form>
      </div>
    );
  }
}

export default SignUp;
