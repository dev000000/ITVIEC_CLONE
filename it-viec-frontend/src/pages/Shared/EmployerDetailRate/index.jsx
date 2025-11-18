import React from "react";
import "./EmployerDetailRate.scss";
import image from "../../../assets/images/everything-empty.svg"
function EmployerDetailRate() {
  return (
    <div className="employer-detail-rate">
      <div className="employer-box employer-box--empty">
        <div className="employer-box__image">
          <img src={image} alt="No posts" />
        </div>
        <div className="employer-box__content">
          <p>Không có lượt đánh giá nào</p>
        </div>
      </div>
    </div>
  );
}

export default EmployerDetailRate;
