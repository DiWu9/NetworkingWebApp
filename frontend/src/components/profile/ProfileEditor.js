import React, { useState } from "react";
import { connect } from "react-redux";
import { handleUpdate } from "../../actions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./profile.css";

const url = "https://damp-dawn-21130.herokuapp.com";

function ProfileEditor({
  userName,
  userInfo,
  handleUpdate,
}) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleVerifyPassword = () => {
    let enteredPwd = document.getElementById("profile-password-validation").value;
    let payload = {
      password: enteredPwd,
    };
    fetch(url + "/verifyPassword", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then((res) => {
      console.log(res.status);
      if (res.status !== 200) {
        alert("Wrong password! Try again.");
        document.getElementById("profile-password-validation").value = "";
      } else {
        let updateEmail = document.getElementById("profile-email-edit").value;
        let updatePhone = document.getElementById("profile-phone-edit").value;
        let updateZip = document.getElementById("profile-zip-edit").value;
        let updatePassword = document.getElementById("profile-password-edit").value;
        let updateItems = {
          updateEmail: updateEmail,
          updatePhone: updatePhone,
          updateZip: updateZip,
          updatePassword: updatePassword,
        };
        handleUpdate(updateItems);
        document.getElementById("profile-email-edit").value = "";
        document.getElementById("profile-phone-edit").value = "";
        document.getElementById("profile-zip-edit").value = "";
        document.getElementById("profile-password-edit").value = "";
        document.getElementById("profile-password-validation").value = "";
        setShow(false);
      }
    });
  };
  const handleClose = () => {
    document.getElementById("profile-password-validation").value = "";
    setShow(false);
  };

  const update = (event) => {
    event.preventDefault();
    handleShow();
  };

  return (
    <>
      <form className="card padding" onSubmit={update}>
        <div className="form-group row">
          <div className="col">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              value=""
            />
          </div>
          <div className="col">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              value="Old Value"
            />
          </div>
          <div className="col">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              value="New Value"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="profile-username" className="col col-form-label">
            User name
          </label>
          <div className="col">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="profile-username"
              value={userName}
            />
          </div>
          <div className="col"></div>
        </div>
        <div className="form-group row">
          <label htmlFor="profile-email" className="col col-form-label">
            Email
          </label>
          <div className="col">
            <input
              type="email"
              readOnly
              className="form-control-plaintext"
              id="profile-email"
              value={userInfo.email}
            />
          </div>
          <div className="col">
            <input
              type="email"
              className="form-control"
              id="profile-email-edit"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="profile-phone" className="col col-form-label">
            Phone number
          </label>
          <div className="col">
            <input
              type="tel"
              readOnly
              className="form-control-plaintext"
              id="profile-phone"
              value={userInfo.phone}
            />
          </div>
          <div className="col">
            <input
              type="tel"
              className="form-control"
              id="profile-phone-edit"
              pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="profile-zip" className="col col-form-label">
            Zip code
          </label>
          <div className="col">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="profile-zip"
              value={userInfo.zip}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="profile-zip-edit"
              pattern="(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="profile-password" className="col col-form-label">
            Password
          </label>
          <div className="col">
            <input
              type="password"
              readOnly
              className="form-control-plaintext"
              id="profile-password"
              value=""
            />
          </div>
          <div className="col">
            <input
              type="password"
              className="form-control"
              id="profile-password-edit"
            />
          </div>
        </div>
        <div className="form-group row padding">
          <input type="submit" className="btn btn-primary" value="Update" />
        </div>
      </form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter old password to update: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="password"
            className="form-control"
            id="profile-password-validation"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleVerifyPassword}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userName: state.userName,
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleUpdate: (updateItems) => dispatch(handleUpdate(updateItems)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditor);
