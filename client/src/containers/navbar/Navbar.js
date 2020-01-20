import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark mb-5 bg-dark">
        <Link className="navbar-brand" to="/">
          WASLA
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <Link className="nav-link active" to="/">
              WASLA <span className="sr-only">(current)</span>
            </Link>
            <li className="nav-item">
              <Link className="nav-link" to="/learn">
                Learn
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="">
                Write
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="">
                Read/Listen
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Make Account
              </Link>
            </li>
          </ul>
          <form className="form-inline mt-2 mt-md-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default Navbar;
