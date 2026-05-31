// Trang tổng quan hồ sơ của Job Seeker
// Hiển thị: avatar, họ tên, chức danh, email, CV đính kèm,
// và 3 ô thống kê hoạt động (Đã ứng tuyển / Đã lưu / Lời mời việc làm)
// Dữ liệu đọc từ Zustand store — không gọi API trực tiếp tại trang này
import "./ProfileOverview.scss";
import { MdMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import avatar from "@/assets/images/unnamed.jpg";
import { LuBriefcase } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";
import uploadImg from "@/assets/images/uploaded-resume.svg";
import { Col, Row } from "antd";
import paperplaneImg from "@/assets/images/paper-plane.svg";
import heathcareImg from "@/assets/images/healthcare.svg";
import mailImg from "@/assets/images/mail.svg";
import { useTranslation } from "react-i18next";
import { useSeekerStore } from "@/store/seekerStore";
import { useUserStore } from "@/store/userStore";

function ProfileOverview() {
  const fullName = useSeekerStore((state) => state.fullName);
  const jobTitle = useSeekerStore((state) => state.jobTitle);
  const email = useUserStore((state) => state.email);
  const { t } = useTranslation("jobseeker");

  return (
    <div className="profile-overview">
      <div className="job-seeker-section">
        <div className="profile-overview__information">
          <div className="profile-overview__image-wrapper">
            <img src={avatar} alt="user_avatar" />
          </div>
          <div className="profile-overview__details">
            <h1 className="profile-overview__name">
              {fullName || t("profileOverview.updateName")}
            </h1>
            <div className="profile-overview__job-title">
              <LuBriefcase />
              <span
                className={
                  jobTitle
                    ? "profile-overview__text"
                    : "profile-overview__text profile-overview__text--default"
                }
              >
                {jobTitle || t("profileOverview.updateJobTitle")}
              </span>
            </div>
            <div className="profile-overview__email">
              <MdMailOutline />
              <div
                className={
                  email
                    ? "profile-overview__text"
                    : "profile-overview__text profile-overview__text--default"
                }
              >
                {email || t("profileOverview.updateEmail")}
              </div>
            </div>
            <div className="profile-overview__update-link">
              <Link to="/ho-so-cv">
                <span>{t("profileOverview.updateProfile")}</span>
                <MdKeyboardArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="job-seeker-section">
        <div className="profile-overview__cv-attachment">
          <h2 className="profile-overview__title">{t("profileOverview.attachedCV")}</h2>
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
                {t("profileOverview.lastUpdated")}
              </div>
              <div className="update-cv__link">
                <Link to="/ho-so-cv/quan-ly-cv">
                  <span>{t("profileOverview.manageAttachedCV")}</span>
                  <MdKeyboardArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="job-seeker-section">
        <h2 className="profile-overview__title">{t("profileOverview.yourActivity")}</h2>
        <div className="profile-overview__activity">
          <Row gutter={[16, 16]}>
            <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
              <Link
                to="/viec-lam-cua-toi/ung-tuyen"
                className="profile-overview__activity-item"
              >
                <h3 className="profile-overview__activity-title">
                  {t("profileOverview.appliedJobs")}
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
              <Link
                to="/viec-lam-cua-toi"
                className="profile-overview__activity-item profile-overview__activity-item--red"
              >
                <h3 className="profile-overview__activity-title">
                  {t("profileOverview.savedJobs")}
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
              <Link
                to="/loi-moi-viec-lam"
                className="profile-overview__activity-item profile-overview__activity-item--green"
              >
                <h3 className="profile-overview__activity-title">
                  {t("profileOverview.jobInvitations")}
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
