import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import "./landing.css";

class Landing extends React.Component {
  componentDidMount() {
    
    const accountName = document.getElementById("register-account-name");
    const email = document.getElementById("register-email-address");
    const phoneNumber = document.getElementById("register-phone-number");

    accountName.addEventListener("input", function () {
      if (accountName.validity.patternMismatch) {
        accountName.setCustomValidity(
          "Expect proper format: only upper or lower case letters and numbers, but may not start with a number."
        );
      } else {
        accountName.setCustomValidity("");
      }
    });

    email.addEventListener("input", function () {
      if (email.validity.patternMismatch) {
        email.setCustomValidity("Expect proper format: xxx@xxx");
      } else {
        email.setCustomValidity("");
      }
    });

    phoneNumber.addEventListener("input", function () {
      if (phoneNumber.validity.patternMismatch) {
        phoneNumber.setCustomValidity("Expect proper format: xxx-xxx-xxxx");
      } else {
        phoneNumber.setCustomValidity("");
      }
    });
  }

  render() {
    return (
      <div className="landing">
        <Helmet>
          <title>Landing</title>
        </Helmet>
        <div>
          <h1>Welcome!</h1>
        </div>
        <div className="landing-forms row">
          <div className="landing-register border border-primary rounded col-sm-5">
            <h1 id="1">Register</h1>
            <RegisterForm />
          </div>
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
