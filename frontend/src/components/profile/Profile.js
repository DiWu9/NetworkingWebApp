import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Button from "react-bootstrap/Button";
import ProfileEditor from "./ProfileEditor";
import ProfileAvatar from "./ProfileAvatar";
import { handleLoadProfile } from "../../actions";
import "./profile.css";

const url = "http://localhost:3000";

function MainPageButton() {
  let navigate = useNavigate();
  function handleSubmit() {
    navigate("/main");
  }

  return (
    <Button variant="light" className="main-profile" onClick={handleSubmit}>
      Main Page
    </Button>
  );
}

class Profile extends React.Component {

  componentDidMount() {
    (async () => {
      // fetch user info
      let userInfo = {};

      // fetch user's email
      await fetch(url + "/email", {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        userInfo.email = res.email;
      });

      // fetch user's phone
      await fetch(url + "/phone", {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        userInfo.phone = res.phone;
      });

      // fetch user's zip
      await fetch(url + "/zipcode", {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        userInfo.zip = res.zipcode;
      });

      console.log(userInfo);
      this.props.handleLoadProfile(userInfo);
    })();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <div className="row">
          <div className="col">
            <h1>Hello, {this.props.userName}!</h1>
          </div>
          <div className="col profile-navigation text-end">
            <MainPageButton></MainPageButton>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="profile-user-info col-sm-4">
            <h2>Edit profile: </h2>
            <ProfileEditor/>
          </div>
          <div className="profile-picture col-sm-4">
            <h2>Update avatar: </h2>
            <ProfileAvatar/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userName: state.userName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLoadProfile: (userInfo) => dispatch(handleLoadProfile(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
