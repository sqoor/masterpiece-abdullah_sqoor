import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/learn">Learn</Link>
          </li>
          <li>
            <Link to="">Write</Link>
          </li>
          <li>
            <Link to="">Read/Listen - not implemented</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Get Started</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
