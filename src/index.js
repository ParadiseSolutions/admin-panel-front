import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./Components/Assets/scss/theme.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./Utils/Redux/Store";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <Suspense fallback={"Loading...."}>
    <Provider store={Store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </Suspense>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
