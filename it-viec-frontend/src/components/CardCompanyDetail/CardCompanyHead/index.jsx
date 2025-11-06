import React from "react";
import "./CardCompanyHead.scss";
import { Col, Rate, Row } from "antd";
import { LuBriefcase } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getImageName } from "../../../helpers/getImageName";
import MB from "../../../assets/images/mb-bank.webp";
import SCANDINAVIAN from "../../../assets/images/scandinavian-software-park.webp";
import OTSV from "../../../assets/images/one-tech-stop-vietnam-company-ltd.webp";
import MCREDIT from "../../../assets/images/mcredit-cong-ty-tai-chinh-tnhh-mb-shinsei.webp";
import TYMEX from "../../../assets/images/tymex.webp";
import ANDPAD from "../../../assets/images/andpad-vietnam-co-ltd.webp";
import EMPLOYMENTHERO from "../../../assets/images/employment-hero.webp";
import BOSCH from "../../../assets/images/bosch-global-software-technologies-company-limited.webp";
import SSI from "../../../assets/images/ssi-securities-corporation.webp";

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
function CardCompanyHead({ companyInfor }) {
  return (
    <div className="card-company__head">
      <div className="container">
        <Row>
          <Col xxl={16} xl={16} lg={24} md={24} sm={24} xs={24}>
            <div className="card-company__head-left">
              <div className="card-company__head-img">
                <img src={logoMap[companyInfor.slug]} alt="logo_company" />
              </div>
              <div className="card-company__head-content">
                <h1 className="card-company__head-name">{companyInfor.companyName || "Tên công ty "}</h1>
                <div className="card-company__head-item-wrap">
                  <div className="card-company__head-item card-company__head-location">
                    <IoLocationOutline />
                    <span>{companyInfor.address || "Tên công ty "}</span>
                  </div>
                  <div className="card-company__head-item card-company__head-jobs">
                    <LuBriefcase />
                    <Link>{companyInfor.jobs.length} việc làm đang tuyển dụng </Link>
                  </div>
                </div>
                <div className="card-company__head-button-wrap">
                  <div className="card-company__head-button card-company__head-button--red">
                    Viết đánh giá
                  </div>
                  <div className="card-company__head-button card-company__head-button--white">
                    Theo dõi
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <div className="card-company__head-right">
              <div className="card-company__head-rate-wrap">
                <div className="card-company__head-rate">{companyInfor.rating || 5 }</div>
                <div className="card-company__head-star">
                  <Rate disabled defaultValue={companyInfor.rating || 5 } className="card-company__head-rate-antd"/>
                  <div className="card-company__head-count">{companyInfor.reviewCount || "Tên công ty "} đánh giá</div>
                </div>
              </div>
              <div className="card-company__head-percent-wrap">
                <div className="card-company__head-percent">{companyInfor.recommendationRate || 100 }<span>%</span></div>
                <div className="card-company__head-percent-text">Khuyến khích làm việc tại đây</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CardCompanyHead;
