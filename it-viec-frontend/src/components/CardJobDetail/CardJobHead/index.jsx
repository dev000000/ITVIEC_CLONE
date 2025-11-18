import React, { use, useEffect, useState } from "react";
import "./CardJobHead.scss";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkApplication } from "../../../services/Shared";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import dayjs from "dayjs";
function CardJobHead({ job }) {
  console.log(job);
  const company = useSelector((state) => state.CompanyReducer);
  const isLogin = useSelector((state) => state.UserReducer);
  const seeker = useSelector((state) => state.SeekerReducer);
  const [type, setType] = useState({
    applied : false,
    appliedAt: "",
  });
  useEffect(() => {
    const check = async () => {
      try {
        if (job.id) {
        const result = await checkApplication({
          jobId: job.id,
          seekerId: seeker.id,
        });
        if (result && result.length > 0) {
          const appliedAt = dayjs(result[0].appliedAt).format("DD/MM/YYYY");
          setType({applied: true, appliedAt: appliedAt});
        }else {
          setType({applied: false, appliedAt: ""});
        }
      }
      } catch (error) {
        console.error("Error checking application:", error);
      } 
    };
    check();
  }, [job.id]);

  return (
    <>
      <div className="card-job-head">
      <h1 className="card-job-head__job-name">{job.title}</h1>
      <div className="card-job-head__employer-name">{company.companyName}</div>
      {isLogin.ok ? (
        <>
          <div className="card-job-head__salary">
            <AiOutlineDollarCircle />
            <span> {job.salary} </span>
          </div>
        </>
      ) : (
        <div className="card-job-head__salary card-job-head__salary-notLogin">
          <AiOutlineDollarCircle />
          <Link to="/login"> Đăng nhập để xem mức lương </Link>
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
              Ứng tuyển{" "}
            </Link>
            {isLogin.ok && isLogin.userType === "jobSeeker" ? (
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
            <span>Đã ứng tuyển</span>
            <span>{type.appliedAt}</span>

          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default CardJobHead;
