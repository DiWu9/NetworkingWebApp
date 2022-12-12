import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleRegister } from "../../actions";
import "./landing.css";

const url = "https://damp-dawn-21130.herokuapp.com";

function RegisterForm({ handleRegister }) {
  const navigate = useNavigate();

  const register = (event) => {
    event.preventDefault();
    // validate password
    if ( document.getElementById("register-pwd").value !== document.getElementById("register-pwd-confirm").value ) {
      alert("Passwords don't match.");
      return false;
    }

    // validate age
    var dob = document.getElementById("register-dob").value;
    if ((Date.now() - new Date(dob)) / (1000 * 60 * 60 * 24 * 365) < 18) {
      alert("You must be 18+ to register.");
      return false;
    }

    let registerAccountName = document.getElementById("register-account-name").value;
    let registerDisplayName = document.getElementById("register-display-name").value;
    let registerEmail = document.getElementById("register-email-address").value;
    let registerPhone = document.getElementById("register-phone-number").value;
    let registerZip = document.getElementById("register-zip").value;
    let registerPassword = document.getElementById("register-pwd").value;

    let payload = {
      username: registerAccountName,
      displayName: registerDisplayName,
      password: registerPassword,
      phone: registerPhone,
      email: registerEmail,
      dob: dob,
      zip: registerZip,
    };
    fetch(url + "/register", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then((res) => {
      console.log(res.status);
      if (res.status !== 200) {
        alert("Username/password unfilled or username already taken.");
        return false;
      } else {
        handleRegister(registerAccountName);
        navigate("/main");
        return true;
      }
    });
  };

  return (
    <form className="landing-register-form" onSubmit={register}>
      <div className="row">
        <div className="form-group col">
          <label htmlFor="register-account-name" className="d-flex p-2">
            Account name:
          </label>
          <input
            type="text"
            name="register-account-name"
            className="register form-control"
            id="register-account-name"
            placeholder="dw58"
            pattern="^[a-zA-Z]\w*"
            required
          />
        </div>

        <div className="form-group col">
          <label htmlFor="register-display-name" className="d-flex p-2">
            Display name:
          </label>
          <input
            type="text"
            name="register-display-name"
            className="register form-control"
            id="register-display-name"
            placeholder="Di Wu"
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group col">
          <label htmlFor="register-email-address" className="d-flex p-2">
            Email address:
          </label>
          <input
            type="email"
            name="register-email-address"
            className="register form-control"
            id="register-email-address"
            placeholder="dw58@rice.edu"
            required
          />
        </div>

        <div className="form-group col">
          <label htmlFor="register-phone-number" className="d-flex p-2">
            Phone number:
          </label>
          <input
            type="tel"
            name="register-phone-number"
            className="register form-control"
            id="register-phone-number"
            pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"
            placeholder="123-345-4567"
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group col">
          <label htmlFor="register-dob" className="d-flex p-2">
            Date of birth:
          </label>
          <input
            type="date"
            name="register-dob"
            className="register form-control"
            id="register-dob"
            required
          />
        </div>

        <div className="form-group col">
          <label htmlFor="register-zip" className="d-flex p-2">
            Zip code:
          </label>
          <input
            type="text"
            name="register-zip"
            className="register form-control"
            id="register-zip"
            inputMode="numeric"
            pattern="(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)"
            placeholder="77000"
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group col">
          <label htmlFor="register-pwd" className="d-flex p-2">
            Password:
          </label>
          <input
            type="password"
            name="register-pwd"
            className="register form-control"
            id="register-pwd"
            required
          />
        </div>

        <div className="form-group col">
          <label htmlFor="register-pwd-confirm" className="d-flex p-2">
            Password confirmation:
          </label>
          <input
            type="password"
            name="register-pwd-confirm"
            className="register form-control"
            id="register-pwd-confirm"
            required
          />
        </div>
      </div>

      <div className="form-group padding">
        <input
          type="submit"
          className="register btn btn-primary"
          value="Register"
        />{" "}
        <input
          type="reset"
          className="register btn btn-primary"
          value="Clear"
        />
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleRegister: (username) => dispatch(handleRegister(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
