import React, { Component } from "react";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
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
      <div className="container">
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
            </div>
            <div className="form-group">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input
                id="password_confirmation"
                className="form-control"
                type="password"
                name="password_confirmation"
                value={confirm}
                onChange={changeHandler}
              />
            </div>
            <input className="btn btn-primary" type="submit" value="Sign Up" />
          </form>
      </div>
    );
  }
}

export default SignUp;
