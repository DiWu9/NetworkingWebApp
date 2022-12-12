import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../../actions";
import "./landing.css";

const url = "https://damp-dawn-21130.herokuapp.com";

function LoginForm({ handleLogin }) {
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    let username = document.getElementById("login-account-name").value;
    let inputPassword = document.getElementById("login-pwd").value;
    let payload = {
      username: username,
      password: inputPassword
    };
    fetch(url + "/login", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    }).then((res) => {
      //console.log("login res: ");
      //console.log(document.cookie);
      if (res.status !== 200) {
        alert("Invalid username or password.");
        return false;
      } else {
        handleLogin(username);
        navigate("/main");
        return true;
      }
    });
  };

  return (
    <form className="landing-login-form" onSubmit={login}>
      <div className="form-group col">
        <label htmlFor="login-account-name" className="d-flex p-2">
          Account name:
        </label>
        <input
          type="text"
          name="login-account-name"
          className="login form-control"
          id="login-account-name"
          placeholder="dw58"
          pattern="^[a-zA-Z]\w*"
          required
        />
      </div>
      <div className="form-group col">
        <label htmlFor="login-pwd" className="d-flex p-2">
          Password:
        </label>
        <input
          type="password"
          name="login-pwd"
          className="login form-control"
          id="login-pwd"
          required
        />
      </div>
      <div className="login padding">
        <input type="submit" className="login btn btn-primary" value="Log in" />
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (username) => dispatch(handleLogin(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
