import React from "react";
import "./EmptyJobState.scss";
import { Link } from "react-router-dom";
import { ImNotification } from "react-icons/im";
import jobEmptyImg from "../../../../assets/images/job-empty.svg";
import { Select } from "antd";
function EmptyJobState({
  notificationText,
  emptyMessage,
  buttonText = "Tìm việc ngay",
  buttonLink = "/",
  showNotification = true,
}) {
  return (
    <div className="job-empty-state">
      {showNotification && (
        <>
          <div className="job-empty-state__notification-wrapper">
            <div className="job-empty-state__notification">
              <ImNotification className="job-empty-state__icon" />
              <span className="job-empty-state__text">
                {notificationText || ""}
              </span>
            </div>
            <div className="job-empty-state__select">
              <span>Sắp xếp theo: </span>
              <Select
                defaultValue="asc"
                style={{ width: 240 }}
                options={[{ value: "desc", label: "Ngày ứng tuyển gần nhất" },{ value: "asc", label: "Ngày ứng tuyển xa nhất" }]}
              />
            </div>
          </div>
        </>
      )}
      <div className="job-empty-state__maincontent">
        <div className="job-empty-state__img">
          <img src={jobEmptyImg} alt="jobEmptyImg" />
        </div>
        <div className="job-empty-state__no-jobs">{emptyMessage || ""}</div>
        <Link className="button-upload button-upload--custom" to={buttonLink}>
          {buttonText}
        </Link>
      </div>
    </div>
  );
}

export default EmptyJobState;
