import React, { Component } from "react";
// import "./App.css";

import Routing from "./containers/routing/Routing";
import AuthContext from "./context/auth-context";
import Axios from "axios";

class App extends Component {
  state = {
    authenticated: false
  };

  componentDidMount() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    let token = localStorage.getItem("token");
    let loggedIn = false;

    if (!token) return this.login(false);

    token = token ? "Bearer " + token.replace(/"/g, "") : token;

    Axios.get("/check-auth", {
      headers: {
        authurization: token
      }
    })
      .then(res => {
        console.log("res", res);
        if (res.status === 200) {
          loggedIn = true;
        } else if (res.status === 401) {
          loggedIn = false;
        }

        this.login(loggedIn);
      })
      .catch(error => {
        loggedIn = false;
        this.login(loggedIn);
      });
  }

  login = async value => {
    await this.setState({ authenticated: value });
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
