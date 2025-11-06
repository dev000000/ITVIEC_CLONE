import { Col, Row } from "antd";
import CardCompanyHead from "../../../components/CardCompanyDetail/CardCompanyHead";
import "./EmployerDetail.scss";
import { NavLink, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCompanyWithJobsBySlug } from "../../../services/Shared";
import TopJobItem from "../../../components/TopJobItem";
const companyDefault = {
  companyName: "",
  address: "",
  slug: "",
  companyModel: "",
  industry: "",
  companySize: "",
  country: "",
  workingHours: "",
  skills: [],
  companyIntroduction: "",
  ourExpertise: "",
  whyWorkHere: "",
  jobs: [],
};
function EmployerDetail() {
  const [companyInfor, setCompanyInfor] = useState(companyDefault);
  const { slug } = useParams();
  useEffect(() => {
    const getCompanyandJobs = async () => {
      try {
        const result = await getCompanyWithJobsBySlug(slug);
        if (result && result.length > 0 && result[0].jobs) {
          result[0].jobs = result[0].jobs.filter(
            (job) => job.status === "Active"
          );
        }
        setCompanyInfor(result[0] || companyDefault);
      } catch (error) {
        console.error("Error fetching company and jobs:", error);
      }
    };
    getCompanyandJobs();
  }, [slug]);
  return (
    <div className="employer-detail">
      <CardCompanyHead companyInfor={companyInfor} />
      <div className="container">
        <Row>
          <Col xxl={16} xl={16} lg={24} md={24} sm={24} xs={24}>
            <div className="employer-detail__infor">
              <ul className="employer-detail__tabs">
                <li className="employer-detail__item-wrapper">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "employer-detail__item employer-detail__item--active"
                        : "employer-detail__item"
                    }
                    to={`/nha-tuyen-dung/${slug}`}
                    end
                  >
                    <span className="employer-detail__text">Giới thiệu</span>
                  </NavLink>
                </li>
                <li className="employer-detail__item-wrapper">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "employer-detail__item employer-detail__item--active"
                        : "employer-detail__item"
                    }
                    to={`/nha-tuyen-dung/${slug}/danh-gia`}
                  >
                    <span className="employer-detail__text">Đánh giá</span>
                    <span className="employer-detail__count">80</span>
                  </NavLink>
                </li>
                <li className="employer-detail__item-wrapper">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "employer-detail__item employer-detail__item--active"
                        : "employer-detail__item"
                    }
                    to={`/nha-tuyen-dung/${slug}/bai-viet`}
                  >
                    <span className="employer-detail__text">Bài viết</span>
                    <span className="employer-detail__count">4</span>
                  </NavLink>
                </li>
              </ul>
              <div className="employer-detail__content-tabs">
                <Outlet context={{ companyInfor }} />
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <div className="employer-detail__jobs">
              <h2>{companyInfor.jobs.length} việc làm đang tuyển dụng</h2>
              <div className="employer-detail__job-wrap">
                {companyInfor.jobs.map((job) => (
                  <div className="employer-detail__job" key={job.id}>
                    <TopJobItem
                      job={job}
                      type="home"
                      companyInfoAdd={{
                        companyName: companyInfor.companyName,
                        slug: companyInfor.slug,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default EmployerDetail;
