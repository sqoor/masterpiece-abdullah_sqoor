import React, { Component } from "react";

import { Link } from "react-router-dom";
import Helmet from "react-helmet";

class NotFound extends Component {
  render() {
    return (
      <div className="p-5">
        <Helmet>
          <link rel="stylesheet" href="css/not-found.css" />
        </Helmet>
        <div id="clouds">
          <div className="cloud x1"></div>
          <div className="cloud x1_5"></div>
          <div className="cloud x2"></div>
          <div className="cloud x3"></div>
          <div className="cloud x4"></div>
          <div className="cloud x5"></div>
        </div>
        <div className="c">
          <div className="_404">404</div>
          <hr />
          <div className="_1">THE PAGE</div>
          <div className="_2">WAS NOT FOUND</div>
          <Link className="btn btn-dark mt-5" to="/">
            BACK TO MARS
          </Link>
        </div>
      </div>
    );
  }
}

export default NotFound;
