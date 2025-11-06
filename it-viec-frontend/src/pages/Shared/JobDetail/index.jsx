import { useEffect, useState } from "react";
import "./JobDetail.scss";
import { Col, Row } from "antd";
import CardJobHead from "../../../components/CardJobDetail/CardJobHead";
import CardJobShowInfor from "../../../components/CardJobDetail/CardJobShowInfor";
import CardJobContent from "../../../components/CardJobDetail/CardJobContent";
import CardInforEmployer from "../../../components/CardInforEmployer";
import { getJobDetailByID } from "../../../services/Shared";
function JobDetail({slug}) {
  console.log("JobDetail");
  const [job, setJob] = useState({});
  const parts = slug.split("-");
  const id = parts[parts.length - 1];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const listJobwithCompany = await getJobDetailByID(id);
        setJob(listJobwithCompany || {});
      } catch (error) {
        console.error("Error fetching job details:", error);
        setJob({});
      }
    };
    getData();
  }, [id]);
  return (
    <div className="job-detail">
      <div className="background-gradient"></div>
      <div className="container" >
        <div className="employer-job__form">
          <Row gutter={[20, 20]}>
            <Col xxl={16} xl={16} lg={24} md={24} sm={24} xs={24}>
              <CardJobHead job={job} />
              <CardJobShowInfor job={job} />
              <CardJobContent job={job} />
            </Col>
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
