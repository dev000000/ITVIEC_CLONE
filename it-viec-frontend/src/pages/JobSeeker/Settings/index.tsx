import "./Settings.scss";
import { useTranslation } from "react-i18next";

function Settings() {
  const { t } = useTranslation("jobseeker");
  return <div className="test-block test">{t("settings.title")}</div>;
}

export default Settings;
