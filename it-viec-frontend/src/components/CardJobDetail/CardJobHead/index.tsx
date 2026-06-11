import "./CardJobHead.scss";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import type { ApplicationCheckResponse, JobDetailResponse } from "@/types/response.types";
import { useEffect, useState } from "react";
import { checkMyApplicationExistsApi } from "@/services/applicationApi";
import SaveJobButton from "@/components/SaveJobButton";
import { useIsSeekerLoggedIn } from "@/hooks/use-is-seeker-logged-in";
import { getLoginRouteByRole } from "@/utils/roleRedirect";
import { ROLE } from "@/types/common.types";

interface CardJobHeadProps {
  job: JobDetailResponse;
}

const SEEKER_LOGIN_PATH = getLoginRouteByRole(ROLE.SEEKER);

// Phần đầu của card hiển thị chi tiết công việc, bao gồm tên công việc, tên công ty, mức lương và nút ứng tuyển
const CardJobHead = ({ job }: CardJobHeadProps) => {
  const { t } = useTranslation("shared");
  const isSeekerLoggedIn = useIsSeekerLoggedIn();

  const [applicationCheck, setApplicationCheck] = useState<ApplicationCheckResponse>({
    applied: false,
    createdAt: null,
  });
  const [isLoading, setIsLoading] = useState(isSeekerLoggedIn);

  useEffect(() => {
    if (!isSeekerLoggedIn) {
      setApplicationCheck({ applied: false, createdAt: null });
      setIsLoading(false);
      return;
    }

    let isCancelled = false;
    setIsLoading(true);

    const checkApplicationStatus = async () => {
      try {
        const response = await checkMyApplicationExistsApi(job.id);
        if (!isCancelled) {
          setApplicationCheck({
            applied: response.data.result.applied,
            createdAt: response.data.result.createdAt,
          });
        }
      } catch (error) {
        console.error("Error checking application status:", error);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    checkApplicationStatus();

    return () => {
      isCancelled = true;
    };
  }, [job.id, isSeekerLoggedIn]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-job-head">
      <h1 className="card-job-head__job-name">{job.title || "--"}</h1>
      <div className="card-job-head__employer-name">
        {job.company?.companyName || "--"}
      </div>
      {isSeekerLoggedIn ? (
        <div className="card-job-head__salary">
          <AiOutlineDollarCircle />
          <span> {job.salary || "--"} </span>
        </div>
      ) : (
        <div className="card-job-head__salary card-job-head__salary-notLogin">
          <AiOutlineDollarCircle />
          <Link to={SEEKER_LOGIN_PATH}>{t("jobSearchDetail.loginToSeeSalary")}</Link>
        </div>
      )}
      <div className="card-job-head__wrap-button">
        {isSeekerLoggedIn && applicationCheck.applied ? (
          <div className="card-job-head__applied">
            <IoMdCheckmarkCircleOutline />
            <span>{t("jobSearchDetail.applied")}</span>
            <span>{applicationCheck.createdAt}</span>
          </div>
        ) : (
          <>
            <Link
              to={
                isSeekerLoggedIn
                  ? "job_applications/new"
                  : SEEKER_LOGIN_PATH
              }
              className="card-job-head__button"
            >
              {t("jobSearchDetail.applyNow")}
            </Link>
            <div className="card-job-head__heart">
              <SaveJobButton jobId={job.id} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardJobHead;
