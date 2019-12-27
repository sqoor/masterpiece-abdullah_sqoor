import React, { Component } from "react";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();

    console.log("Logining in...", this.state);
  };

  render() {
    const { changeHandler, submitHandler } = this;
    const { email, password } = this.state;

    return (
      <>
        <h1>Login Page</h1>
        <div>
          <form onSubmit={submitHandler}>
            <label>Email</label>{" "}
            <input
              type="email"
              name="email"
              value={email}
              onChange={changeHandler}
            />{" "}
            <br />
            <label>Password</label>{" "}
            <input
              type="password"
              name="password"
              value={password}
              onChange={changeHandler}
            />{" "}
            <br />
            <input type="submit" />
          </form>
        </div>
      </>
    );
  }
}

export default Login;
