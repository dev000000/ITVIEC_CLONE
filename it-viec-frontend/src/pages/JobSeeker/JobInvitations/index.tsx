import "./JobInvitations.scss";
import { useTranslation } from "react-i18next";

function JobInvitations() {
  const { t } = useTranslation("jobseeker");
  return (
    <div className='test-block test'>{t("jobInvitations.title")}</div>
  );
}

export default JobInvitations;