import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample08"
          aria-controls="navbarsExample08"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="navbar-collapse justify-content-md-center collapse show"
          id="navbarsExample08"
          style={{}}
        >
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Centered nav only <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/learn">
                Learn
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="">
                Write
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="">
                Read/Listen - not implemented
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/signup">
                Make Account
              </Link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="http://example.com"
                id="dropdown08"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdown08">
                <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
