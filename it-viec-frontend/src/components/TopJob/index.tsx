import { Col, Row } from "antd";
import "./TopJob.scss";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import type { JobCardResponse } from "@/types/response.types";
import TopJobItemHome from "@/components/TopJobItemHome";
import { useTranslation } from "react-i18next";

interface TopJobProps {
  jobList: JobCardResponse[];
  totalJobs: number;
}
// Component hiển thị phần các việc làm hàng đầu trên trang chủ
const TopJob = ({ jobList, totalJobs }: TopJobProps) => {
  // console.log("TopJob component rendered with totalJobs:", totalJobs);
  // console.log("TopJob component rendered with jobList:", jobList);
  const { t } = useTranslation("job");
  return (
    <>
      {totalJobs > 8 && (
        <div className="top-job">
          <div className="container">
            {/* Tiêu đề */}
            <h1 className="top-job__title">
              {t("topJobsTitle", { count: totalJobs })}
            </h1>
            {/* Danh sách việc làm */}
            <div className="top-job__list">
              <Row gutter={[20, 20]}>
                {jobList.map((job) => (
                  <Col
                    xxl={6}
                    xl={6}
                    lg={24}
                    md={24}
                    sm={24}
                    xs={24}
                    key={job.id}
                  >
                    <TopJobItemHome
                      job={job}
                    />
                  </Col>
                ))}
              </Row>
            </div>
            {/* Nút xem thêm */}
            <div className="top-job__button-more">
              <Link to="/viec-lam-it">
                <span>{t("viewMore", { count: totalJobs - 8 })}</span>
                <MdKeyboardArrowRight />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TopJob;
