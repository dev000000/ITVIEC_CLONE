import { Col, Row, Tooltip } from "antd";
import "./TopJob.scss";
import logo from "../../assets/images/382e952f-df7e-49c8-aa11-aa22a5ec823a.webp";
import { ImCoinDollar } from "react-icons/im";
import { MdLocationCity } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import TagSkill from "../TagSkill";
import { getRelativeTime } from "../../helpers/formattedTime";
import { Link, useNavigate } from "react-router-dom";
import TopJobItem from "../TopJobItem";
import { MdKeyboardArrowRight } from "react-icons/md";
function TopJob({ jobList }) {
  jobList = jobList || [];
  const navigate = useNavigate();
  return (
    <>
      <div className="top-job">
        <div className="container">
          <h1 className="top-job__title">
            {jobList.length} Việc làm IT cho Developer "Chất"
          </h1>
          <div className="top-job__list">
            <Row gutter={[20, 20]}>
              {jobList.slice(0,8).map((job) => (
                <Col
                  xxl={6}
                  xl={6}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  key={job.id}
                >
                  <TopJobItem
                    job={job}
                    type="home"
                    companyInfoAdd={{
                      companyName: job.company.companyName,
                      slug: job.company.slug,
                    }}
                  />
                </Col>
              ))}
            </Row>
          </div>
          <div className="top-job__button-more">
            <Link to="/viec-lam-it">
              <span>Xem thêm {jobList.length - 8 } công việc khác</span>
              <MdKeyboardArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default TopJob;
