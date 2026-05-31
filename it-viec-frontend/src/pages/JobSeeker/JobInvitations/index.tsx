// Trang lời mời việc làm
// Hiển thị các lời mời từ nhà tuyển dụng (employer) gửi tới seeker
// Hiện tại là placeholder — chưa triển khai nội dung
import "./JobInvitations.scss";
import { useTranslation } from "react-i18next";

function JobInvitations() {
  const { t } = useTranslation("jobseeker");
  return (
    <div className='test-block test'>{t("jobInvitations.title")}</div>
  );
}

export default JobInvitations;