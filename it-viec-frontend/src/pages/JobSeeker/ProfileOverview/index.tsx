// Trang tổng quan hồ sơ của Job Seeker
// Hiển thị: avatar, họ tên, chức danh, email, CV đính kèm,
// và 3 ô thống kê hoạt động (Đã ứng tuyển / Đã lưu / Lời mời việc làm)
// Dữ liệu đọc từ Zustand store — không gọi API trực tiếp tại trang này
import "./ProfileOverview.scss";
import { MdMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import avatarDefault from "@/assets/images/avatar-default.svg";
import { LuBriefcase } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";
import uploadImg from "@/assets/images/uploaded-resume.svg";
import { Col, Row } from "antd";
import paperplaneImg from "@/assets/images/paper-plane.svg";
import heathcareImg from "@/assets/images/healthcare.svg";
import mailImg from "@/assets/images/mail.svg";
import { useTranslation } from "react-i18next";
import {
  getMyCvMetadataApi,
  getMyCvPreviewUrl,
} from "../../../services/seekerCvApi";
import { useSeekerStore } from "@/store/seekerStore";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { getMyApplicationsApi } from "@/services/applicationApi";

const mockData = {
  // jobApplications: 0,
  savedJobs: 0,
  jobInvitations: 0,
  fileName: "CV.docx",
  lastUpdated: "24/05/2025",
}
function ProfileOverview() {
  const fullName = useSeekerStore((state) => state.fullName);
  const jobTitle = useSeekerStore((state) => state.jobTitle);
  const avatarUrl = useSeekerStore((state) => state.avatarUrl);
  const email = useUserStore((state) => state.email);
  const [jobApplicationsCount, setJobApplicationsCount] = useState(0);
  const { t, i18n } = useTranslation("jobseeker");
  const [cvMetadata, setCvMetadata] = useState<{
    fileName: string;
    contentType: string;
    size: number;
    updatedAt: string;
  } | null>(null);
  const [isCvMetadataLoading, setIsCvMetadataLoading] = useState(true);

  useEffect(() => {
    const callApiApplicationForSeeker = async () => {
      try {
        // Gọi API lấy danh sách đơn ứng tuyển của người tìm việc
        const {data: applicationData} = await getMyApplicationsApi();
        setJobApplicationsCount(applicationData.result?.length || 0);
        console.log("Số lượng đơn ứng tuyển:", applicationData.result?.length || 0);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn ứng tuyển:", error);
      }
    };
    callApiApplicationForSeeker();
    
  }, [t]);

  useEffect(() => {
    const fetchMyCvMetadata = async () => {
      try {
        const response = await getMyCvMetadataApi();
        setCvMetadata(response.result);
      } catch (error) {
        if ((error as { response?: { status?: number } })?.response?.status === 404) {
          setCvMetadata(null);
          return;
        }

        console.error("Failed to load CV metadata:", error);
      } finally {
        setIsCvMetadataLoading(false);
      }
    };

    fetchMyCvMetadata();
  }, []);

  const formatCvUpdatedAt = (updatedAt: string) => {
    const locale = i18n.language?.startsWith("vi") ? "vi-VN" : "en-US";

    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(updatedAt));
  };

  const previewCvUrl = getMyCvPreviewUrl();

  return (
    <div className="profile-overview">
      {/* Khối thông tin cá nhân */}
      <div className="job-seeker-section">
        <div className="profile-overview__information">
          <div className="profile-overview__image-wrapper">
            <img src={avatarUrl || avatarDefault} alt="user_avatar" />
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
      {/* Khối CV đính kèm */}
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
              {isCvMetadataLoading ? (
                <span className="update-cv__link-file">
                  {t("profileOverview.loadingAttachedCV", {
                    defaultValue: "Loading CV...",
                  })}
                </span>
              ) : cvMetadata ? (
                <>
                  <a
                    href={previewCvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="update-cv__link-file"
                  >
                    <span>{cvMetadata.fileName}</span>
                  </a>
                  <div className="update-cv__file-date">
                    {`${t("profileOverview.lastUpdated")}: ${formatCvUpdatedAt(
                      cvMetadata.updatedAt
                    )}`}
                  </div>
                </>
              ) : (
                <div className="update-cv__file-date">
                  {t("profileOverview.noAttachedCV", {
                    defaultValue: "No CV uploaded yet",
                  })}
                </div>
              )}
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
      {/* Khối hoạt động của người dùng */}
      <div className="job-seeker-section">
        <h2 className="profile-overview__title">{t("profileOverview.yourActivity")}</h2>
        <div className="profile-overview__activity">
          <Row gutter={[16, 16]}>
            {/* Việc làm đã ứng tuyển */}
            <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
              <Link
                to="/viec-lam-cua-toi/ung-tuyen"
                className="profile-overview__activity-item"
              >
                <h3 className="profile-overview__activity-title">
                  {t("profileOverview.appliedJobs")}
                </h3>
                <div className="profile-overview__activity-content">
                  <p className="profile-overview__activity-count">{jobApplicationsCount}</p>
                  <img
                    src={paperplaneImg}
                    alt="img"
                    className="profile-overview__activity-img"
                  />
                </div>
              </Link>
            </Col>
            {/* Việc làm đã lưu */}
            <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
              <Link
                to="/viec-lam-cua-toi"
                className="profile-overview__activity-item profile-overview__activity-item--red"
              >
                <h3 className="profile-overview__activity-title">
                  {t("profileOverview.savedJobs")}
                </h3>
                <div className="profile-overview__activity-content profile-overview__activity-content--red">
                  <p className="profile-overview__activity-count">{mockData.savedJobs}</p>
                  <img
                    src={heathcareImg}
                    alt="img"
                    className="profile-overview__activity-img"
                  />
                </div>
              </Link>
            </Col>
            {/* Lời mời công việc */}
            <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
              <Link
                to="/loi-moi-viec-lam"
                className="profile-overview__activity-item profile-overview__activity-item--green"
              >
                <h3 className="profile-overview__activity-title">
                  {t("profileOverview.jobInvitations")}
                </h3>
                <div className="profile-overview__activity-content profile-overview__activity-content--green">
                  <p className="profile-overview__activity-count">{mockData.jobInvitations}</p>
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
