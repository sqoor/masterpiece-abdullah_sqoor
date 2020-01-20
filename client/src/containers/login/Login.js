import React, { Component } from "react";

import Axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import { ToastContainer, toast, Zoom } from "react-toastify";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      element: message => (
        <div className="alert alert-danger mt-2">{message}</div>
      )
    });
  }

  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  requestApi = credentials => {
    console.log("requestApi:", credentials);

    Axios.post("/users/login", credentials)
      .then(res => {
        // do somesthing go to next page
        // if has the token or respond to use unauthorized
        console.log("RESPONSE", res.data, res.status);
        if (res.status === 200) console.log("Login");
        else console.log("something went wrong");
      })
      .catch(error => {
        const statusCode = error.response.status;

        console.log("ERROR", error.response.data);
        console.log(statusCode);

        if (statusCode === 401) toast.error("email and password do not match.");
        else toast.error("Something went wrong.");
      });
  };

  submitHandler = e => {
    e.preventDefault();

    const { requestApi, state } = this;

    if (this.validator.allValid()) {
      requestApi(state);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
      toast.error("Please fill the empty input fields");
    }
  };

  render() {
    const { validator, changeHandler, submitHandler } = this;
    const { email, password } = this.state;

    return (
      <div className="container">
        <ToastContainer
          position={toast.POSITION.TOP_LEFT}
          transition={Zoom}
          toastClassName="rounded"
          hideProgressBar={true}
        />

        <h1 className="text-center">Login Page</h1>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email</label>{" "}
            <input
              className="form-control"
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={changeHandler}
            />
            {validator.message("email", email, "required|email")}
          </div>

          <div className="form-group">
            <label htmlFor="form-control">Password</label>{" "}
            <input
              id="password"
              className="form-control"
              type="password"
              name="password"
              value={password}
              onChange={changeHandler}
            />
            {validator.message("password", password, "required")}
          </div>
          <input
            className="btn btn-outline-success"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    );
  }
}

export default Login;
