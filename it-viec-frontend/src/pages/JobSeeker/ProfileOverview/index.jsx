import React, { useState } from "react";
import "./ProfileOverview.scss";
import { MdMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import avatar from "../../../assets/images/unnamed.jpg";
import { LuBriefcase } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";
import uploadImg from "../../../assets/images/uploaded-resume.svg"; 
import { Col, Row } from "antd";
import paperplaneImg from "../../../assets/images/paper-plane.svg";
import heathcareImg from "../../../assets/images/healthcare.svg";
import mailImg from "../../../assets/images/mail.svg";
import { useSelector } from "react-redux";
function ProfileOverview() {
  const [userId, setUserId] = useState(localStorage.getItem("id") || "");
  const seeker = useSelector((state) => state.SeekerReducer);
  return (
    <div className="profile-overview">
      <div className="job-seeker-section">
        <div className="profile-overview__information">
          <div className="profile-overview__image-wrapper">
            <img src={avatar} alt="user_avatar" />
          </div>
          <div className="profile-overview__details">
            <h1 className="profile-overview__name">{seeker.fullName || "Cập nhật tên"}</h1>
            <div className="profile-overview__job-title">
              <LuBriefcase />
              <span className={seeker.jobTitle ? "profile-overview__text" : "profile-overview__text profile-overview__text--default"}>{seeker.jobTitle || "Cập nhật chức danh"}</span>
            </div>
            <div className="profile-overview__email">
              <MdMailOutline />
              <div className={seeker.gmail ? "profile-overview__text" : "profile-overview__text profile-overview__text--default"}>{seeker.gmail || "Cập nhật email"}</div>
            </div>
            <div className="profile-overview__update-link">
              <Link to="/ho-so-cv">
                <span>Cập nhật hồ sơ</span>
                <MdKeyboardArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="job-seeker-section">
        <div className="profile-overview__cv-attachment">
          <h2 className="profile-overview__title">Hồ sơ đính kèm của bạn</h2>
          <div className="update-cv">
            <img
              src={uploadImg}
              alt="upload-resume"
              className="update-cv__img"
            />
            <div className="update-cv__main-content">
              <Link to="/" className="update-cv__link-file">
                CV.docx
              </Link>
              <div className="update-cv__file-date">
                Cập nhật lần cuối: 24/05/2025
              </div>
              <div className="update-cv__link">
                <Link to="/ho-so-cv/quan-ly-cv">
                  <span>Quản lý hồ sơ đính kèm</span>
                  <MdKeyboardArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="job-seeker-section">
        <h2 className="profile-overview__title">Hoạt động của bạn</h2>
        <div className="profile-overview__activity">
          <Row gutter={[16, 16]}>
            <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
              <Link to="/viec-lam-cua-toi/ung-tuyen" className="profile-overview__activity-item">
                <h3 className="profile-overview__activity-title">
                  Việc làm đã ứng tuyển
                </h3>
                <div className="profile-overview__activity-content">
                  <p className="profile-overview__activity-count">0</p>
                  <img
                    src={paperplaneImg}
                    alt="img"
                    className="profile-overview__activity-img"
                  />
                </div>
              </Link>
            </Col>
            <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
              <Link to="/viec-lam-cua-toi" className="profile-overview__activity-item profile-overview__activity-item--red">
                <h3 className="profile-overview__activity-title">
                  Việc làm đã lưu
                </h3>
                <div className="profile-overview__activity-content profile-overview__activity-content--red">
                  <p className="profile-overview__activity-count">0</p>
                  <img
                    src={heathcareImg}
                    alt="img"
                    className="profile-overview__activity-img"
                  />
                </div>
              </Link>
            </Col>
            <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
              <Link className="profile-overview__activity-item profile-overview__activity-item--green">
                <h3 className="profile-overview__activity-title">
                  Lời mời công việc
                </h3>
                <div className="profile-overview__activity-content profile-overview__activity-content--green">
                  <p className="profile-overview__activity-count">0</p>
                  <img
                    src={mailImg}
                    alt="img"
                    className="profile-overview__activity-img"
                  />
                </div>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default ProfileOverview;
