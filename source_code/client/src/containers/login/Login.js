import React, { Component } from "react";

import Axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../context/auth-context";

class Login extends Component {
  state = {
    email: "",
    password: "",
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
      )
    });
  }

  componentDidMount() {
    this.checkAuthentication();
    this.redirectIfAuthenticated();
  }

  checkAuthentication() {
    const token = localStorage.getItem("token");
    let loggedIn = false;

    if (!token) return this.context.login(false);

    Axios.get("/check-auth", {
      headers: {
        authurization: `Bearer ${token}`
      }
    }).then(res => {
      if (res.status === 200) loggedIn = true;
      else if (res.status === 401) loggedIn = false;
    });

    this.context.login(loggedIn);
  }

  redirectIfAuthenticated = () => {
    return this.context.authenticated
      ? this.props.history.push("/learn")
      : null;
  };

  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  storeToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
  }

  redirectToLessons() {
    this.props.history.push("/learn");
  }

  requestApi = credentials => {
    Axios.post("/users/login", credentials)
      .then(res => {
        if (res.status === 200) {
          this.context.login(true);
          this.storeToken(res.data.token);
          this.redirectToLessons();
        } else {
          toast.error("Something went wrong.");
        }
      })
      .catch(error => {
        const statusCode = error.response.status;

        if (statusCode === 401) {
          toast.error("email and password do not match.");
        } else {
          toast.error("Something went wrong.");
        }
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
    const { email, password, showPassword } = this.state;

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
              <span className="text-success">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              {"  "}
              Email
            </label>
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
            <label className="text-success" htmlFor="password">
              <span className="text-success">
                <FontAwesomeIcon icon={faLock} />
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
            </div>{" "}
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
    marginTop: "30px",
    WebkitBoxShadow: "21px 28px 10px -9px rgba(0,0,0,0.75)",
    MozBoxShadow: "21px 28px 10px -9px rgba(0,0,0,0.75)",
    boxShadow: "21px 28px 13px -9px rgba(0,0,0,0.75)"
  }
};
