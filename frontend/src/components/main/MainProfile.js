import React from "react";
import { connect } from "react-redux";
import { handleChangeStatus } from "../../actions";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./main.css";

function MainProfile({ avatar, status, handleChangeStatus }) {

  const navigate = useNavigate();

  const componentDidMount = () => {
    if (localStorage.getItem("username") === "") {
      navigate("/landing");
    }
  }

  const onClick = () => {
    let newStatus = document.getElementById("main-profile-status").value;
    handleChangeStatus(newStatus);
    document.getElementById("main-profile-status").value = "";
  };

  return (
    <div className="padding">
      <div className="card padding">
        <div>
          <img src={avatar} className="rounded-circle avatar" alt="Avatar" />
          <p>Status: {status}</p>
        </div>
        <div className="input-group">
          <div className="input-group-prepend">
            <Button variant="primary" type="button" onClick={onClick}>
              Update
            </Button>
          </div>
          <input
            required
            type="text"
            className="form-control"
            id="main-profile-status"
            placeholder="New status"
            aria-label=""
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    avatar: state.avatar,
    status: state.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeStatus: (newStatus) => dispatch(handleChangeStatus(newStatus)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainProfile);
