import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import RegisterForm from "./RegisterForm";
import Button from "react-bootstrap/Button";
import "./landing.css";

function RegisterButton() {
    let navigate = useNavigate();
    function handleSubmit() {
      navigate("/");
    }
  
    return (
      <Button variant="light" className="main-profile" onClick={handleSubmit}>
        Back to log in
      </Button>
    );
}

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
        <div className="row">
          <div className="col">
            <h1>Welcome!</h1>
          </div>
          <div className="main-navigation col text-end">
            <RegisterButton></RegisterButton>
          </div>
        </div>
        <div className="landing-forms row">
          <div className="landing-register border border-primary rounded col-sm-5">
            <h1 id="1">Register</h1>
            <RegisterForm />
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
