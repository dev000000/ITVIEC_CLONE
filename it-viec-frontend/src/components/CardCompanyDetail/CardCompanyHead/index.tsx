import "./CardCompanyHead.scss";
import { Col, Rate, Row } from "antd";
import { LuBriefcase } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import type { CompanyDetailResponse } from "@/types/response.types";
import { useTranslation } from "react-i18next";
import IMAGE_NOT_FOUND from "@/assets/images/Image-not-found.png";

interface CardCompanyHeadProps {
  companyInfor: CompanyDetailResponse;
}

const MockData = {
  rate: 5,
  recommendPercent: 100,
  reviewCount: 0,
}
const CardCompanyHead = ({ companyInfor }: CardCompanyHeadProps) => {
  const { t } = useTranslation("shared");
  // console.log("companyInfor in CardCompanyHead:", companyInfor);
  return (
    <div className="card-company__head">
      <div className="container">
        <Row>
          <Col xxl={16} xl={16} lg={24} md={24} sm={24} xs={24}>
            <div className="card-company__head-left">
              {/* Hiển thị logo công ty */}
              <div className="card-company__head-img">
                <img src={companyInfor.logoUrl || IMAGE_NOT_FOUND} alt="logo_company" />
              </div>
              <div className="card-company__head-content">
                {/* Hiển thị tên công ty */}
                <h1 className="card-company__head-name">{companyInfor.companyName || "--"}</h1>
                <div className="card-company__head-item-wrap">
                  <div className="card-company__head-item card-company__head-location">
                    <IoLocationOutline />
                    <span>{companyInfor.address || "--"}</span>
                  </div>
                  {companyInfor.jobs.length > 0 && (
                    <div className="card-company__head-item card-company__head-jobs">
                      <LuBriefcase />
                      <Link to={`/nha-tuyen-dung/${companyInfor.slug}`}>{t("employerDetail.jobsHiring", { count: companyInfor.jobs.length })}</Link>
                    </div>
                  )}
                </div>
                <div className="card-company__head-button-wrap">
                  <div className="card-company__head-button card-company__head-button--red">
                    {t("employerDetail.writeReview")}
                  </div>
                  <div className="card-company__head-button card-company__head-button--white">
                    {t("employerDetail.follow")}
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            {/* Tạm thời comment phần đánh giá và phần tỷ lệ đề xuất vì chưa xử lý phần này */}
            {/* <div className="card-company__head-right">
              <div className="card-company__head-rate-wrap">
                <div className="card-company__head-rate">{MockData.rate}</div>
                <div className="card-company__head-star">
                  <Rate disabled defaultValue={MockData.rate} className="card-company__head-rate-antd" />
                  <div className="card-company__head-count">{MockData.reviewCount} {t("employerDetail.reviews")}</div>
                </div>
              </div>
              <div className="card-company__head-percent-wrap">
                <div className="card-company__head-percent">{MockData.recommendPercent}<span>%</span></div>
                <div className="card-company__head-percent-text">{t("employerDetail.recommendPercent")}</div>
              </div>
            </div> */}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CardCompanyHead;
