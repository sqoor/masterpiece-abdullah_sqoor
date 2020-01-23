import React, { Component } from "react";
// import "./App.css";

import Routing from "./containers/routing/Routing";
import AuthContext from "./context/auth-context";

class App extends Component {
  state = {
    authenticated: false
  };

  componentDidMount() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    const token = localStorage.getItem("token");
    let authenticated = false;

    if (token) authenticated = true;

    this.setState({ authenticated });
  }

  login = value => {
    this.setState({ authenticated: value });
  };

  render() {
    return (
      <div className="App">
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.login
          }}
        >
          <Routing />
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
