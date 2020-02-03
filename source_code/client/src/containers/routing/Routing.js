import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import Home from "../home/Home";
import Login from "../login/Login";
import SignUp from "../register/SignUp";
import Learn from "../learn/Learn";
import Lesson from "../lesson/Lesson";
import NotFound from "../not-found/NotFound";
import Admin from "../admin/Admin";
import LessonDetail from "../../components/Admin/LessonDetail";
import Write from "../Write/Write";

class Routing extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" excat component={Login} />
            <Route path="/signup" excat component={SignUp} />
            <Route path="/learn" excat component={Learn} />
            <Route path="/lesson/:name" excat component={Lesson} />
            <Route path="/admin/lessons/:id" excat component={LessonDetail} />
            <Route path="/admin" excat component={Admin} />
            <Route path="/write" excat component={Write} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default Routing;
