import "./CardJobHead.scss";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useCompanyStore } from "@/store/companyStore";
import { useUserStore } from "@/store/userStore";

interface Job {
  id?: number;
  title?: string;
  salary?: string;
  company?: {
    companyName?: string;
  };
}

interface CardJobHeadProps {
  job: Job;
}

function CardJobHead({ job }: CardJobHeadProps) {
  const companyName = useCompanyStore((state) => state.companyName);
  const authenticated = useUserStore((state) => state.authenticated);
  const role = useUserStore((state) => state.role);
  const { t } = useTranslation("shared");
  const type = {
    applied: false,
    appliedAt: "",
  };

  // TODO(service-new-migration): Chua co service_new thay the cho legacy API `checkApplication`.
  // Legacy call: GET `applications?seekerId=...&jobId=...`.
  // Muc dich: kiem tra seeker da ung tuyen job nay chua de doi nut Apply thanh Applied.
  // Tam thoi fallback la chua applied de khong phu thuoc `src/services`.

  return (
    <>
      <div className="card-job-head">
        <h1 className="card-job-head__job-name">{job.title}</h1>
        <div className="card-job-head__employer-name">
          {job.company?.companyName || companyName}
        </div>
        {authenticated ? (
          <>
            <div className="card-job-head__salary">
              <AiOutlineDollarCircle />
              <span> {job.salary} </span>
            </div>
          </>
        ) : (
          <div className="card-job-head__salary card-job-head__salary-notLogin">
            <AiOutlineDollarCircle />
            <Link to="/login">{t("jobSearchDetail.loginToSeeSalary")}</Link>
          </div>
        )}
        <div className="card-job-head__wrap-button">
          {!type.applied ? (
            <>
              <Link
                to="job_applications/new"
                // target="_blank"
                className="card-job-head__button"
              >
                {" "}
                {t("jobSearchDetail.applyNow")}{" "}
              </Link>
              {authenticated && role === "SEEKER" ? (
                <div className="card-job-head__heart">
                  <FaHeart />
                </div>
              ) : (
                <div className="card-job-head__heart">
                  <Link to="/login">
                    <FaHeart />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="card-job-head__applied">
              <IoMdCheckmarkCircleOutline />
              <span>{t("jobSearchDetail.applied")}</span>
              <span>{type.appliedAt}</span>

            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CardJobHead;
