import { Col, Row } from "antd";
import "./TopCompanies.scss";
import logo from "../../assets/images/logo FSOFT dọc.webp";
import { RiRadioButtonLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import MB from "../../assets/images/mb-bank.webp";
import SCANDINAVIAN from "../../assets/images/scandinavian-software-park.webp";
import OTSV from "../../assets/images/one-tech-stop-vietnam-company-ltd.webp";
import MCREDIT from "../../assets/images/mcredit-cong-ty-tai-chinh-tnhh-mb-shinsei.webp";
import TYMEX from "../../assets/images/tymex.webp";
import ANDPAD from "../../assets/images/andpad-vietnam-co-ltd.webp";
import EMPLOYMENTHERO from "../../assets/images/employment-hero.webp";
import BOSCH from "../../assets/images/bosch-global-software-technologies-company-limited.webp";
import SSI from "../../assets/images/ssi-securities-corporation.webp";
const logoMap = {
  "mb-bank": MB,
  "scandinavian-software-park": SCANDINAVIAN,
  "one-tech-stop-vietnam-company-ltd": OTSV,
  "mcredit-cong-ty-tai-chinh-tnhh-mb-shinsei": MCREDIT,
  "tymex": TYMEX,
  "andpad-vietnam-co-ltd": ANDPAD,
  "employment-hero": EMPLOYMENTHERO,
  "bosch-global-software-technologies-company-limited": BOSCH,
  "ssi-securities-corporation": SSI,
};
function TopCompanies({ companyList }) {
  companyList = companyList || [];
  
  const navigate = useNavigate();
  return (
    <>
      <div className="top-companies">
        <div className="container">
          <h1 className="top-companies__title"> Nhà tuyển dụng hàng đầu </h1>
          <div className="top-companies__list">
            <Row gutter={[{ xs: 0, sm: 16, md: 20, lg: 20 },20]}>
              {companyList.map((company) => {
                company.jobs = company.jobs.filter(job => job.status === "Active");
              
                return (
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24} key={company.id}>
                    <div  className="top-companies__item" onClick={() => {navigate(`/nha-tuyen-dung/${company.slug}`)}}>
                      <div className="top-companies__image">
                        <img src={logoMap[company.slug]} alt="logo_companies"></img>
                      </div>
                      <div className="top-companies__name">{company.companyName}</div>
                      <div className="top-companies__list-tag">
                        {company.skills.map((skill) => (<div className="top-companies__tag" key={skill}>{skill}</div>))}
                      </div>
                      <div className="top-companies__footer">
                        <div>{company.address}</div>
                        <div className="top-companies__view-more">
                          <RiRadioButtonLine className="top-companies__icon-live" />
                          <div>{company.jobs.length} Việc làm</div>
                          <MdOutlineKeyboardArrowRight />
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopCompanies;
