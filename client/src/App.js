import React, { Component } from "react";
// import "./App.css";

import Routing from "./containers/routing/Routing";
import AuthContext from "./context/auth-context";

class App extends Component {
  state = {
    authenticated: false
  };

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
