import React from "react";
import { connect } from "react-redux";
import { handleFollow, handleUnfollow, handleFetchFeed } from "../../actions";
import Button from "react-bootstrap/Button";
import "./main.css";

const url = "http://localhost:3000";

function FriendList({ friendList, handleFollow, handleUnfollow, handleFetchFeed }) {
  
  const onClickFollow = () => {
    (async () => {
      let newFriendList;
      console.log(document.getElementById("main-friends-follow").value);
      await fetch(url + "/following/" + document.getElementById("main-friends-follow").value, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
      .then((res) => {
        newFriendList = res.following;
      });
      handleFollow(newFriendList);
      let newPostsAfterEdit;
      await fetch(url + "/articles", {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
      .then((res) => {
        newPostsAfterEdit = res.articles;
      });
      handleFetchFeed(newPostsAfterEdit);
      document.getElementById("main-friends-follow").value = "";
    })();
  }

  function onClickUnfollow (v) {
    (async () => {
      let newFriendList;
      console.log(v);
      await fetch(url + "/following/" + v, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
      .then((res) => {
        newFriendList = res.following;
      });
      handleUnfollow(newFriendList);
      let newPostsAfterEdit;
      await fetch(url + "/articles", {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
      .then((res) => {
        newPostsAfterEdit = res.articles;
      });
      handleFetchFeed(newPostsAfterEdit);
      document.getElementById("main-friends-follow").value = "";
    })();
  }
  
  return (
    <div className="padding">
      <h5>Following: </h5>

      <div className="input-group">
        <div className="input-group-prepend">
          <Button variant="primary" type="button" onClick={onClickFollow}>
            Follow
          </Button>
        </div>
        <input
          required
          type="text"
          className="form-control"
          id="main-friends-follow"
          placeholder="Type user name"
          aria-describedby="basic-addon1"
        />
      </div>
      
      <div className="scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2 padding">
        {friendList.map((v, i) => (
          <div key={i} className="col-4 card padding">
            <img src="" className="rounded-circle mb-3" alt="Avatar" />
            <h5 className="mb-2">
              <strong>{v}</strong>
            </h5>
            <p></p>
            <div className="input-group-prepend">
              <Button variant="danger" type="button" onClick={() => onClickUnfollow(v)}>
                Unfollow
              </Button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    friendList: state.friendList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFollow: (newFriendList) => dispatch(handleFollow(newFriendList)),
    handleUnfollow: (newFriendList) => dispatch(handleUnfollow(newFriendList)),
    handleFetchFeed: (posts) => dispatch(handleFetchFeed(posts)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
