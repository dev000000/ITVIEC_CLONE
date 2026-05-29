import "./JobAlertSignUp.scss";
import { useTranslation } from "react-i18next";

function JobAlertSignUp() {
  const { t } = useTranslation("jobseeker");
  return <div className="test-block test">{t("jobAlertSignUp.title")}</div>;
}

export default JobAlertSignUp;
