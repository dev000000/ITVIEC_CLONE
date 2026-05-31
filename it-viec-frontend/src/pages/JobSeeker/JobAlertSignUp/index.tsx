// Trang đăng ký nhận thông báo việc làm (Job Alert)
// Cho phép seeker đăng ký nhận email khi có việc làm phù hợp với tiêu chí tìm kiếm
// Hiện tại là placeholder — chưa triển khai nội dung
import "./JobAlertSignUp.scss";
import { useTranslation } from "react-i18next";

function JobAlertSignUp() {
  const { t } = useTranslation("jobseeker");
  return <div className="test-block test">{t("jobAlertSignUp.title")}</div>;
}

export default JobAlertSignUp;
