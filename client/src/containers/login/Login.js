import React, { Component } from "react";

import Axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      element: message => (
        <div className="alert alert-danger mt-2">
          <small>{message}</small>
        </div>
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
      <div
        className="container card p-5 w-50 bg-dark hvr-shrink"
        style={styles.box}
      >
        <ToastContainer
          position={toast.POSITION.TOP_LEFT}
          transition={Zoom}
          toastClassName="rounded"
          hideProgressBar={true}
        />

        <h1
          className="text-center bg-success text-light mb-4"
          style={styles.title}
        >
          Login
        </h1>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="text-success" htmlFor="email">
              Email
            </label>{" "}
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
            <label className="text-success" htmlFor="form-control">
              Password
            </label>{" "}
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
            className="btn btn-outline-success mt-4 hvr-sink"
            type="submit"
            value="Login"
          />
          <Link
            className="float-right text-success font-weight-bold mt-5"
            to="/signup"
          >
            <small>New user</small>
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;

const styles = {
  title: {
    clipPath:
      "polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)"
  },
  box: {
    "-webkitBoxShadow ": "21px 28px 10px -9px rgba(0,0,0,0.75)",
    "-mozBoxShadow ": "21px 28px 10px -9px rgba(0,0,0,0.75)",
    boxShadow: "21px 28px 13px -9px rgba(0,0,0,0.75)"
  }
};
