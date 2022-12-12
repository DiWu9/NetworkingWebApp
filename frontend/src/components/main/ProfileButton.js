import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./main.css";

function ProfileButton() {

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/profile");
  };

  return (
    <Button variant="light" className="main-profile" onClick={handleSubmit}>
      Edit Profile
    </Button>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileButton);
