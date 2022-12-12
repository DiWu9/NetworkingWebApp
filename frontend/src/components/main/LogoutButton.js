import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { handleLogout } from "../../actions";
import "./main.css";

function LogoutButton({handleLogout}) {

  let navigate = useNavigate();
  function handleSubmit() {
    handleLogout();
    navigate("/");
  }

  return (
    <Button variant="light" className="main-profile" onClick={handleSubmit}>
      Logout
    </Button>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout: () => dispatch(handleLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
