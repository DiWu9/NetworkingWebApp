import React from "react";
import { connect } from "react-redux";
import Article from "./Article";
import { handleSearch } from "../../actions";
import "./main.css";

function Posts({ posts, handleSearch }) {

  const onClickSearch = () => {
    console.log(posts);
    let searchQuery = document.getElementById("main-search-query").value;
    handleSearch(searchQuery);
  }

  //console.log(posts);
  return (
    <div className="col-sm-8">
      <h2>For you: </h2>
      <div className="main-search">
        <div className="d-flex justify-content-center align-items-center">
          <div className="col-md-8">
            <div className="search">
              <i className="fa fa-search"></i>
              <input
                type="text"
                id="main-search-query"
                className="form-control"
                placeholder="Search posts"
              />
              <button className="btn btn-primary" onClick={onClickSearch}>Search</button>
            </div>
          </div>
        </div>
      </div>
      <div className="main-articles">
        <div className="scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
          {posts.map((v, i) => (
            <div key={i} className="col-3 row">
              <Article article={v} id={v.pid} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    posts: state.filteredPosts.map((post) => post),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearch: (searchQuery) => dispatch(handleSearch(searchQuery)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
