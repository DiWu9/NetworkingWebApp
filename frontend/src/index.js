import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';


import { webApp } from "./reducers";
import Register from './components/landing/Register';
import Main from "./components/main/Main";
import Profile from "./components/profile/Profile";

const store = configureStore({ reducer: webApp });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route exact path={"/"} element={<App/>} />
        <Route exact path={"/register"} element={<Register/>} />
        <Route exact path={"/main"} element={<Main />} />
        <Route exact path={"/profile"} element={<Profile />} />
      </Routes>
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
