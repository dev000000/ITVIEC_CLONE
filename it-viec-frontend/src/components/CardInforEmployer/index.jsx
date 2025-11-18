import React from "react";
import "./CardInforEmployer.scss";
import logo from "../../assets/images/companyLogo.svg";
import { isObjectEmpty } from "../../helpers/checkObject";
import MB from "../../assets/images/mb-bank.webp";
import SCANDINAVIAN from "../../assets/images/scandinavian-software-park.webp";
import OTSV from "../../assets/images/one-tech-stop-vietnam-company-ltd.webp";
import MCREDIT from "../../assets/images/mcredit-cong-ty-tai-chinh-tnhh-mb-shinsei.webp";
import TYMEX from "../../assets/images/tymex.webp";
import ANDPAD from "../../assets/images/andpad-vietnam-co-ltd.webp";
import EMPLOYMENTHERO from "../../assets/images/employment-hero.webp";
import BOSCH from "../../assets/images/bosch-global-software-technologies-company-limited.webp";
import SSI from "../../assets/images/ssi-securities-corporation.webp";
import { LogoutOutlined } from "@ant-design/icons";

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
function CardInforEmployer({company}) {
  company = company || {};
  if(isObjectEmpty(company)) {
    return <div> Không có thông tin về công ty..... </div>
  }
  return (
    <div className="card-infor-employer">
      <div className="card-infor-employer__head">
        <div className="card-infor-employer__head-top">
          <div className="card-infor-employer__logo">
            <img src={logoMap[company.slug]} alt="logo_company" />
          </div>
          <div className="card-infor-employer__name">{company.companyName}</div>
        </div>
        <div className="card-infor-employer__title">
          {company.description}
        </div>
      </div>
      <div className="card-infor-employer__body">
        <div className="card-infor-employer__item">
          <div className="card-infor-employer__item-title">Mô hình công ty</div>
          <div className="card-infor-employer__item-content">{company.companyModel}</div>
        </div>
        <div className="card-infor-employer__item">
          <div className="card-infor-employer__item-title">
            Lĩnh vực công ty
          </div>
          <div className="card-infor-employer__item-content">{company.industry}</div>
        </div>
        <div className="card-infor-employer__item">
          <div className="card-infor-employer__item-title">Quy mô công ty</div>
          <div className="card-infor-employer__item-content">
            {company.companySize}
          </div>
        </div>
        <div className="card-infor-employer__item">
          <div className="card-infor-employer__item-title">Quốc gia</div>
          <div className="card-infor-employer__item-content">{company.country}</div>
        </div>
        <div className="card-infor-employer__item">
          <div className="card-infor-employer__item-title">
            Thời gian làm việc
          </div>
          <div className="card-infor-employer__item-content">{company.workingHours}</div>
        </div>
        <div className="card-infor-employer__item card-infor-employer__item--nodash">
          <div className="card-infor-employer__item-title">
            Làm việc ngoài giờ
          </div>
          <div className="card-infor-employer__item-content">{company.overtimePolicy}</div>
        </div>
      </div>
    </div>
  );
}

export default CardInforEmployer;
