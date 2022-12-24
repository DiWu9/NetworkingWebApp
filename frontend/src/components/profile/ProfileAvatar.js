import React from "react";
import { connect } from "react-redux";
import "./profile.css";

const url = "http://localhost:3000";

function ProfileAvatar({ avatar }) {

  const handleImageChange = (e) => {
    const fd = new FormData();
    fd.append('image', e.target.files[0]);
    fetch(url + "/image", {
      method: 'POST',
      body: fd,
    }).then(res => {
      console.log(res.status);
    });
  }

  return (
    <div className="padding">
      <div className="text-center card padding">
        <div className="padding">
          <img src={avatar} className="rounded-circle avatar profile-avatar" alt="Avatar" />
        </div>
        <div className="padding">
          <input type="file" accept="image/*" className="form-control" id="editor-file" onChange={(e) => handleImageChange(e)} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    avatar: state.avatar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAvatar);
