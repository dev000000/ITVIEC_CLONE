import React from "react";
import "./AvatarEmployer.scss";
import avatar from "../../assets/images/avatar.webp"
function AvatarEmployer() {
  return (
    <div className="avatar-employer">
      <div className="avatar-employer__img">
        <img src={avatar} alt="avatar_employer" />
      </div>
      <div className="avatar-employer__name">J97</div>
      <div className="avatar-employer__title"> Recruiting Manager </div>
    </div>
  );
}

export default AvatarEmployer;
