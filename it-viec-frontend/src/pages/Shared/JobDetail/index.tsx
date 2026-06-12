import { useEffect, useState } from "react";
import "./JobDetail.scss";
import { Col, Row } from "antd";
import CardJobHead from "@/components/CardJobDetail/CardJobHead";
import CardJobShowInfor from "@/components/CardJobDetail/CardJobShowInfor";
import CardJobContent from "@/components/CardJobDetail/CardJobContent";
import CardInforEmployer from "@/components/CardInforEmployer";
import { getJobBySlugApi } from "@/services/jobApi";
import type { JobDetailResponse } from "@/types/response.types";
import { useNavigate } from "react-router-dom";

interface JobDetailProps {
  slug: string;
}
// Trang hiển thị chi tiết công việc khi người dùng click vào một công việc cụ thể
const JobDetail = ({ slug }: JobDetailProps) => {
  const navigate = useNavigate();
  // State để lưu trữ thông tin chi tiết của công việc
  const [job, setJob] = useState<JobDetailResponse>(null);

  // State để quản lý trạng thái tải dữ liệu
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    let isCancelled = false;

    const getData = async () => {
      try {
        const response = await getJobBySlugApi(slug);
        if (!isCancelled) {
          setJob(response.data.result || null);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        if (!isCancelled) {
          navigate("/");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    getData();

    return () => {
      isCancelled = true;
    };
  }, [slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-detail">
      <div className="background-gradient"></div>
      <div className="container">
        <div className="employer-job__form">
          <Row gutter={[20, 20]}>
            {/* Thông tin chi tiết về công việc */}
            <Col xxl={16} xl={16} lg={24} md={24} sm={24} xs={24}>
              <CardJobHead job={job} />
              <CardJobShowInfor job={job} />
              <CardJobContent job={job} />
            </Col>
            {/* Thông tin về nhà tuyển dụng */}
            <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
              <CardInforEmployer company={job.company} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
