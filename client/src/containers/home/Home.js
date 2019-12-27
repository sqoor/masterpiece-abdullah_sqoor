import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <a href="/login">Login</a>
        <br />
        <a href="/signup">Signup</a>
      </div>
    );
  }
}

export default Home;
