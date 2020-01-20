import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap-theme.css"; // error

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import counterReducer from "./store/reducers/counter";
import resultsReducer from "./store/reducers/results";

const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultsReducer
});
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
