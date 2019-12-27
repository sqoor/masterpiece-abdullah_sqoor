import React, { Component } from "react";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();

    console.log("Signing up...", this.state);
  };

  render() {
    const { changeHandler, submitHandler } = this;
    const { name, email, password, confirm } = this.state;

    return (
      <>
        <h1>Sign up Page</h1>
        <div>
          <form onSubmit={submitHandler}>
            <label>Name</label>{" "}
            <input
              type="text"
              name="name"
              value={name}
              onChange={changeHandler}
            />{" "}
            <br />
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
            <label>Confirm Password</label>{" "}
            <input
              type="password"
              name="confirm"
              value={confirm}
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

export default SignUp;
