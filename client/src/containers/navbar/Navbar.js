import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark  py-1 mb-4 bg-dark">
        <Link className="navbar-brand hvr-grow" to="/">
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
            <li className="nav-item">
              <Link className="nav-link hvr-grow" to="/learn">
                Learn
              </Link>
            </li>
            <li className="nav-item hvr-grow">
              <Link className="nav-link" to="">
                Write
              </Link>
            </li>

            <li className="nav-item hvr-grow">
              <Link className="nav-link" to="">
                Read/Listen
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
            <Link className="btn btn-outline-success m-2" to="/login">
              Login
            </Link>
            <Link className="btn btn-outline-success m-2" to="/signup">
              Make Account
            </Link>
          </form>
        </div>
      </nav>
    );
  }
}

export default Navbar;
