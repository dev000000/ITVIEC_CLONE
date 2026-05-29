import { Col, Row } from "antd";
import EmployerStart from "@/components/EmployerStart";
import Card from "@/components/Card";
import { useTranslation } from "react-i18next";

function EmployerReports() {
  const { t } = useTranslation();
  return (
    <>
      <div className="dashboard-employer">
        <EmployerStart content={t("employer:reports.title")} type="search" />

      </div>
    </>
  )
}
export default EmployerReports;