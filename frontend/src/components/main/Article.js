import React from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import ArticleComment from "./ArticleComment";
import { handleFetchFeed } from "../../actions";
import "./main.css";

const url = "https://damp-dawn-21130.herokuapp.com";

function Article({ article, img, id, handleFetchFeed }) {

  const onClickComment = () => {
    (async () => {
      console.log(id);
      let payload = {
        text: document.getElementById(id).value,
        commentId: -1,
      }
      await fetch(url + "/articles/" + article.pid, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
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
      document.getElementById(id).value = "";
    })();
  }

  const onClickEdit = () => {
    (async () => {
      let payload = {
        text: document.getElementById(id).value
      }
      await fetch(url + "/articles/" + article.pid, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
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
      document.getElementById(id).value = "";
    })();
  }

  return (
    <div className="article card">
      <img src={img} className="img-thumbnail" />
      <div className="card-body">
        <h5 className="card-title">{article.author}</h5>
        <p className="card-text">{article.text}</p>
        <div>
          <input required type="text" className="form-control padding" id={id}/>
        </div>
        <Button variant="primary" className="padding" onClick={onClickComment}>Comment</Button> {' '}
        <Button variant="primary" className="padding" onClick={onClickEdit}>Edit</Button> {' '}
        <ArticleComment comments={article.comments}/>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchFeed: (posts) => dispatch(handleFetchFeed(posts)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
