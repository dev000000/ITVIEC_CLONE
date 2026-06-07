import "./CardJobHead.scss";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/store/userStore";
import type { ApplicationCheckResponse, JobDetailResponse } from "@/types/response.types";
import { useEffect, useState } from "react";
import { checkMyApplicationExistsApi } from "@/services/applicationApi";

interface CardJobHeadProps {
  job: JobDetailResponse;
}

// Phần đầu của card hiển thị chi tiết công việc, bao gồm tên công việc, tên công ty, mức lương và nút ứng tuyển
const CardJobHead = ({ job }: CardJobHeadProps) => {
  const { t } = useTranslation("shared");

  // State để quản lý trạng thái đã ứng tuyển hay chưa và thời giuan ứng tuyển
  const [applicationCheck, setApplicationCheck] = useState<ApplicationCheckResponse>({
    applied: false,
    createdAt: null,
  });
  // State để quản lý trạng thái tải dữ liệu ứng tuyển
  const [isLoading, setIsLoading] = useState(true);

  // Lấy thông tin xác thực và vai trò người dùng từ store
  const authenticated = useUserStore((state) => state.authenticated);
  const role = useUserStore((state) => state.role);
  // Kiểm tra nếu người dùng đã đăng nhập và có vai trò là "SEEKER"
  const isSeekerLoggedIn = authenticated && role === "SEEKER";

  // Hàm xử lý kiểm tra trạng thái người dùng đã ứng tuyển vào công việc này hay chưa
  useEffect(() => {
    const checkApplicationStatus = async () => {
      try {
        const response = await checkMyApplicationExistsApi(job.id);
        console.log("Check application response:", response);
        setApplicationCheck((prev) => ({
          ...prev,
          applied: response.data.result.applied,
          createdAt: response.data.result.createdAt,
        }));
      } catch (error) {
        console.error("Error checking application status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkApplicationStatus();

  }, [job.id, isSeekerLoggedIn]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="card-job-head">
        {/* Hiển thị tên công việc  */}
        <h1 className="card-job-head__job-name">{job.title || "--"}</h1>
        {/* Hiển thị tên công ty */}
        <div className="card-job-head__employer-name">
          {job.company?.companyName || "--"}
        </div>
        {/* Nếu người dùng đã đăng nhập và có vai trò là "SEEKER" thì hiển thị mức lương */}
        {isSeekerLoggedIn ? (
          <>
            <div className="card-job-head__salary">
              <AiOutlineDollarCircle />
              <span> {job.salary || "--"} </span>
            </div>
          </>
        ) : (
          // Nếu người dùng chưa đăng nhập hoặc không có vai trò là "SEEKER" thì hiển thị liên kết đăng nhập
          <div className="card-job-head__salary card-job-head__salary-notLogin">
            <AiOutlineDollarCircle />
            <Link to="/login">{t("jobSearchDetail.loginToSeeSalary")}</Link>
          </div>
        )}
        <div className="card-job-head__wrap-button">
          {!applicationCheck.applied ? (
            // Nếu chưa ứng tuyển vào công việc này, hiển thị nút "Apply Now" và biểu tượng trái tim
            <>
              <Link
                to="job_applications/new"
                // target="_blank"
                className="card-job-head__button"
              >
                {" "}
                {t("jobSearchDetail.applyNow")}{" "}
              </Link>
              {isSeekerLoggedIn ? (
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
              <span>{applicationCheck.createdAt}</span>

            </div>
          )}
        </div>
      </div>
    </>
  );

}






export default CardJobHead;
