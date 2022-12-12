import React from "react";
import { connect } from "react-redux";
import { handlePost, handleFetchFeed } from "../../actions";
import Button from "react-bootstrap/Button";
import "./main.css";

const url = "https://damp-dawn-21130.herokuapp.com";

function ArticleEditor({handlePost, handleFetchFeed}) {

  const onClickPost = () => {
    (async () => {
      let postInfo = {
        title: document.getElementById("editor-title").value,
        text: document.getElementById("editor-post").value,
      };
      handlePost(postInfo);
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
      document.getElementById("editor-title").value = "";
      document.getElementById("editor-post").value = "";
      document.getElementById("editor-file").value = "";
      document.getElementById("main-search-query").value = "";
    })();
  }

  const onClickCancel = () => {
    document.getElementById("editor-title").value = "";
    document.getElementById("editor-post").value = "";
    document.getElementById("editor-file").value = "";
  }

  //console.log(posts);
  return (
    <div className="padding">
      <h5>Create a new post: </h5>
      <div className="card">
        <div className="editor">
          <div>
            <label>Title: </label>
            <input
              required
              type="text"
              className="form-control"
              id="editor-title"
            />
          </div>
          <div>
            <label>Share your thoughts: </label>
            <textarea
              required
              className="form-control"
              rows="5"
              id="editor-post"
            ></textarea>
          </div>
          <div>
            <label>Upload picture: </label>
            <input type="file" className="form-control" id="editor-file" />
          </div>
        </div>
        <div className="editor-buttons">
          <Button variant="primary" onClick={onClickPost}>
            Post
          </Button>{" "}
          <Button variant="secondary" onClick={onClickCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlePost: (postInfo) => dispatch(handlePost(postInfo)),
    handleFetchFeed: (posts) => dispatch(handleFetchFeed(posts)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEditor);
