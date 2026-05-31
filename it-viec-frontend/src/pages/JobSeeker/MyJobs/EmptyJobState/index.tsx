// Component dùng chung để hiển thị trạng thái trống cho các tab trong MyJobs
// (AppliedJobs, SavedJobs, RecentlyViewed)
import "./EmptyJobState.scss";
import { Link } from "react-router-dom";
import { ImNotification } from "react-icons/im";
import jobEmptyImg from "../../../../assets/images/job-empty.svg";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

// Props:
//   notificationText  — dòng thông báo nhỏ phía trên (ví dụ: "Đơn đã nộp không thể rút lại")
//   emptyMessage      — dòng chữ khi không có dữ liệu
//   buttonText        — nhãn nút CTA (ví dụ: "Tìm việc ngay")
//   buttonLink        — đường dẫn nút CTA (mặc định "/")
//   showNotification  — true = hiện phần thông báo + dropdown sắp xếp (mặc định true)
interface EmptyJobStateProps {
  notificationText?: string;
  emptyMessage?: string;
  buttonText?: string;
  buttonLink?: string;
  showNotification?: boolean;
}

function EmptyJobState({
  notificationText,
  emptyMessage,
  buttonText,
  buttonLink = "/",
  showNotification = true,
}: EmptyJobStateProps) {
  const { t } = useTranslation("jobseeker");
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
              <span>{t("emptyJobState.sortBy")}</span>
              <Select
                defaultValue="asc"
                style={{ width: 240 }}
                options={[
                  { value: "desc", label: t("emptyJobState.sortNewest") },
                  { value: "asc", label: t("emptyJobState.sortOldest") },
                ]}
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
          {buttonText || t("emptyJobState.findJob")}
        </Link>
      </div>
    </div>
  );
}

export default EmptyJobState;
