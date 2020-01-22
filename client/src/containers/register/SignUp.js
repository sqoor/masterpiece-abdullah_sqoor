import React, { Component } from "react";

import Axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faUnlock,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../context/auth-context";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    showPassword: false
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator({
      element: message => (
        <div className="alert alert-danger mt-2">
          <small>{message}</small>
        </div>
      ),
      validators: {
        match: {
          message: "Do not match the password.",
          rule: val => val === this.state.password
        }
      }
    });
  }

  componentDidMount() {
    this.redirectIfAuthenticated();
  }

  redirectIfAuthenticated = () => {
    return this.context.authenticated
      ? this.props.history.push("/learn")
      : null;
  };

  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  };

  storeToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
  }

  redirectToLessons() {
    this.props.history.push("/learn");
  }

  requestApi = credentials => {
    Axios.post("/users/signup", credentials)
      .then(res => {
        if (res.status === 201) {
          console.log("Sign up and added a new user");
          this.context.login(true);
          this.storeToken(res.data.token);
          this.redirectToLessons();
        } else {
          console.log("something went wrong");
          toast.error("Something went wrong");
        }
      })
      .catch(error => {
        const res = error.response;

        if (res.status === 409) {
          toast.error("This user already have account, try different email");
        } else if (res.status === 401) {
          toast.error(res.data.message);
        } else {
          toast.error("Something went wrong");
        }
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

  toggleShowingPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  render() {
    const {
      validator,
      changeHandler,
      submitHandler,
      toggleShowingPassword
    } = this;
    const {
      name,
      email,
      password,
      password_confirmation,
      showPassword
    } = this.state;

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
          Sign Up
        </h1>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="text-success" htmlFor="name">
              <span className="text-success">
                <FontAwesomeIcon icon={faUser} />
              </span>
              {"  "}
              Name
            </label>
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
            <label className="text-success" htmlFor="email">
              <span className="text-success">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              {"  "}
              Email
            </label>
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
            <label className="text-success" htmlFor="password">
              <span className="text-success">
                <FontAwesomeIcon icon={faUnlock} />
              </span>
              {"  "}
              Password
            </label>

            <div className="input-group mb-2">
              <input
                id="password"
                className="form-control"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={changeHandler}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span
                    className={showPassword ? "text-dark" : "text-success"}
                    onClick={toggleShowingPassword}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </span>
                </div>
              </div>
            </div>
            {validator.message("password", password, "required|between:8,255")}
          </div>
          <div className="form-group">
            <label className="text-success" htmlFor="password_confirmation">
              <span className="text-success">
                <FontAwesomeIcon icon={faLock} />
              </span>
              {"  "}
              Confirm Password
            </label>

            <input
              id="password_confirmation"
              className="form-control"
              type={showPassword ? "text" : "password"}
              name="password_confirmation"
              value={password_confirmation}
              onChange={changeHandler}
            />
            {validator.message(
              "password confirmation",
              password_confirmation,
              "required|match"
            )}
          </div>
          <input
            className="btn btn-outline-success mt-4 hvr-sink"
            type="submit"
            value="Sign Up"
          />

          <Link
            className="float-right text-success font-weight-bold mt-5"
            to="/login"
          >
            <small>Already a user</small>
          </Link>
        </form>
      </div>
    );
  }
}

export default SignUp;

const styles = {
  box: {
    marginTop: "30px",
    WebkitBoxShadow: "21px 28px 13px -9px rgba(0,0,0,0.75)",
    MozBoxShadow: "21px 28px 13px -9px rgba(0,0,0,0.75)",
    boxShadow: "21px 28px 13px -9px rgba(0,0,0,0.75)"
  },
  title: {
    clipPath:
      "polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)"
  }
};
