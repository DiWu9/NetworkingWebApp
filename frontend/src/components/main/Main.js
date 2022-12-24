import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import Posts from "./Posts";
import ArticleEditor from "./ArticleEditor";
import MainProfile from "./MainProfile";
import FriendList from "./FriendList";
import ProfileButton from "./ProfileButton";
import LogoutButton from "./LogoutButton";
import { handleLoadMain } from "../../actions";
import "./main.css";

const url = "http://localhost:3000";

class Main extends React.Component {

  componentDidMount() {
    (async () => {
      // fetch user's feed
      let userInfo = {};
      await fetch(url + "/articles", {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res && res.articles) {
          userInfo.articles = res.articles;
        } else {
          userInfo.articles = [];
        }
      });

      // fetch user's headline
      await fetch(url + "/headline", {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
      .then((res) => {
        if (res && res.headline) {
          userInfo.headline = res.headline;
        } else {
          userInfo.headline = "";
        }
      });

      // fetch user's following list
      await fetch(url + "/following", {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
      .then((res) => {
        if (res && res.following) {
          userInfo.following = res.following;
        } else {
          userInfo.following = [];
        }
      });
      // fetch user's avatar
      // TODO

      console.log("userinfo: ");
      console.log(userInfo);
      this.props.handleLoadMain(userInfo);
    })();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Main</title>
        </Helmet>
        <div className="row">
          <div className="col">
            <h1>Hello, {this.props.userName}!</h1>
          </div>
          <div className="main-navigation col text-end">
            <ProfileButton></ProfileButton> <LogoutButton></LogoutButton>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-sm-3">
            <MainProfile />
            <ArticleEditor />
            <FriendList />
          </div>
          <Posts />
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
    handleLoadMain: (userInfo) => dispatch(handleLoadMain(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
