import { useEffect, useState } from "react";
import { Alert, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./EmpoyerDashBoard.scss";
import EmployerStart from "@/components/EmployerStart";
import { useTranslation } from "react-i18next";
import { getCompanyProfileStatusApi } from "@/services/employerApi";
import type { CompanyProfileStatusResponse } from "@/types/response.types";

function EmployerDashBoard() {
  const { t } = useTranslation(["employer", "common"]);
  const navigate = useNavigate();
  const [profileStatus, setProfileStatus] = useState<CompanyProfileStatusResponse | null>(null);

  useEffect(() => {
    getCompanyProfileStatusApi()
      .then((res) => setProfileStatus(res.data.result))
      .catch(() => {
        // non-blocking — banner won't show on API error
      });
  }, []);

  return (
    <>
      <div className="dashboard-employer">
        {profileStatus && !profileStatus.complete && (
          <Alert
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
            message={t("employer:dashboard.profileIncomplete")}
            description={
              profileStatus.missingFields.length > 0
                ? profileStatus.missingFields
                    .map((f) => t(`employer:profile.form.${f}`, { defaultValue: f }))
                    .join(", ")
                : undefined
            }
            action={
              <Button
                size="small"
                type="primary"
                onClick={() => navigate("/customer/profile")}
              >
                {t("employer:dashboard.completeProfile")}
              </Button>
            }
          />
        )}
        <EmployerStart content={t("employer:dashboard.title")} type="search" />
      </div>
    </>
  );
}

export default EmployerDashBoard;
