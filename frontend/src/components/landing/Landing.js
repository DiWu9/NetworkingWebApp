import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import LoginForm from "./LoginForm";
import Button from "react-bootstrap/Button";
import "./landing.css";

function LandingButton() {
  let navigate = useNavigate();
  function handleSubmit() {
    navigate("/register");
  }

  return (
    <Button variant="light" className="main-profile" onClick={handleSubmit}>
      Register new account
    </Button>
  );
}

class Landing extends React.Component {

  render() {
    return (
      <div className="landing">
        <Helmet>
          <title>Landing</title>
        </Helmet>
        <div className="row">
          <div className="col">
            <h1>Welcome!</h1>
          </div>
          <div className="main-navigation col text-end">
            <LandingButton></LandingButton>
          </div>
        </div>
        <div className="landing-forms row">
          <div className="landing-login border border-primary rounded col-sm-5">
            <h1>Login</h1>
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    passwords: state.passwords,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
