// Trang báo cáo thống kê của Employer
// Hiện tại chỉ hiển thị tiêu đề, chưa có biểu đồ hay dữ liệu báo cáo
import EmployerStart from "@/components/EmployerStart";
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
