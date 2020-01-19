import React, { Component } from "react";
import Axios from "axios";

class Login extends Component {
  state = {
    credentials: {
      email: "",
      password: ""
    },
    errors: {
      email: "",
      password: ""
    }
  };

  changeHandler = e => {
    const name = e.target.name;
    const value =  e.target.value;

    this.setState(prevState => ({
      ...prevState,
      credentials: {
        ...prevState.credentials,
        [name]: value
      }
    }));
  };

  validate = () => {
    const { email, password } = this.state.credentials;

    if(email && password) return true;

    if(!email) {
      this.setState(prevState => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          message: "Email is required"
        }
      }));
    } else {     
      this.setState(prevState => ({
        ...prevState,
        errors: {
          ...prevState.errors,
         message: ""
        }
      }));
    }
  }

  requestApi = (credentials) => {
    console.log("requestAPI worked", credentials);

    Axios.post('/users/login', credentials)
    .then(res => {
      // do somesthing go to next page if has the token or respond to use unauthorized
      console.log('RESPONSE', res)
    })
    .catch(error => {
      console.log('ERROR', error);
    });
  }

  submitHandler = e => {
    e.preventDefault();

    const{ validate, requestApi, state } = this;

    if(validate()) {
      requestApi(state.credentials)
    }

    console.log("Logining in...", state);
  };

  render() {
    const { changeHandler, submitHandler } = this;
    const { email, password } = this.state;

    return (
      <div className="container">
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
            </div>
            <input className="btn btn-primary" type="submit" value="Login" />
          </form>
      </div>
    );
  }
}

export default Login;
