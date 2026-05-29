import "./EmpoyerDashBoard.scss";
import EmployerStart from "@/components/EmployerStart";
import { useTranslation } from "react-i18next";

function EmployerDashBoard() {
  const { t } = useTranslation();
  return (
    <>
      <div className="dashboard-employer">
        <EmployerStart content={t("employer:dashboard.title")} type="search" />
      </div>
    </>
  );
}
export default EmployerDashBoard;
