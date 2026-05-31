// Trang cài đặt tài khoản Job Seeker
// Cho phép thay đổi mật khẩu, tuỳ chỉnh cài đặt thông báo, v.v.
// Hiện tại là placeholder — chưa triển khai nội dung
import "./Settings.scss";
import { useTranslation } from "react-i18next";

function Settings() {
  const { t } = useTranslation("jobseeker");
  return <div className="test-block test">{t("settings.title")}</div>;
}

export default Settings;
