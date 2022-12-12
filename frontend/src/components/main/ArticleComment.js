import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./main.css";

function ArticleComment({comments}) {

  const [show, setShow] = useState(false);

  const onClickSeeComments = () => {
    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="dropdown padding">
      <button className="btn btn-secondary" type="button" onClick={onClickSeeComments}>
        See comments
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Article Comments: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
          {comments.map((v, i) => (
            <li key={i} className="col-3 row">
              <p> {v} </p>
            </li>
          ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleComment);
