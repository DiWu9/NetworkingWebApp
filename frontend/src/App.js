import "./App.css";
import React from "react";
import { connect } from "react-redux";
import Landing from "./components/landing/Landing";

class App extends React.Component {
  render() {
    return (
      <div className="web-app">
        <div className="landing-page">
          <Landing />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
