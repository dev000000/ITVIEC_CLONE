import React, { useEffect, useState } from "react";
import "./EmployerDetailInfo.scss";
import { Col, Row } from "antd";
import TagSkill from "../../../components/TagSkill";
import { useOutletContext, useParams } from "react-router-dom";
import DOMPurify from "dompurify";

function EmployerDetailInfo() {
  const { companyInfor } = useOutletContext();
  console.log("companyInfor", companyInfor);
  const { slug } = useParams();

  const skills = ["JavaScript", "React", "Node.js", "Python", "Java", "C#"];
  return (
    <div className="empoyer-detail-infor">
      <div className="empoyer-detail-infor__box empoyer-detail-infor__overview">
        <h2 className="empoyer-detail-infor__main-title">Thông tin chung</h2>
        <Row className="empoyer-detail-infor__row" gutter={[16, 16]}>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <div className="empoyer-detail-infor__title-wrap">
              <div className="empoyer-detail-infor__title">Mô hình công ty</div>
              <div className="empoyer-detail-infor__content">
                {companyInfor.companyModel || "???"}
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <div className="empoyer-detail-infor__title-wrap">
              <div className="empoyer-detail-infor__title">
                Lĩnh vực công ty
              </div>
              <div className="empoyer-detail-infor__content">
                {companyInfor.industry || "Công ty TNHH"}
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <div className="empoyer-detail-infor__title-wrap">
              <div className="empoyer-detail-infor__title">Quy mô công ty</div>
              <div className="empoyer-detail-infor__content">
                {companyInfor.companySize || "???"}
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <div className="empoyer-detail-infor__title-wrap">
              <div className="empoyer-detail-infor__title">Quốc gia</div>
              <div className="empoyer-detail-infor__content">
                {companyInfor.country || "???"}
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <div className="empoyer-detail-infor__title-wrap">
              <div className="empoyer-detail-infor__title">
                Thời gian làm việc
              </div>
              <div className="empoyer-detail-infor__content">
                {companyInfor.workingHours || "???"}
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="empoyer-detail-infor__box empoyer-detail-infor__introduction">
        <h2 className="empoyer-detail-infor__main-title">Giới thiệu công ty</h2>
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(companyInfor.companyIntroduction),
          }} // Làm sạch HTML trước khi hiển thị
        />
      </div>
      <div className="empoyer-detail-infor__box empoyer-detail-infor__ourexpertise">
        <h2 className="empoyer-detail-infor__main-title">
          Chuyên môn của chúng tôi
        </h2>
        <div className="empoyer-detail-infor__intro-skills">Our Key Skills</div>
        <div className="empoyer-detail-infor__list-tag">
          {companyInfor.skills.map((skill) => (
            <TagSkill key={skill} text={skill} />
          ))}
        </div>
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(companyInfor.ourExpertise),
          }} // Làm sạch HTML trước khi hiển thị
        />
      </div>
      <div className="empoyer-detail-infor__box empoyer-detail-infor__benefits">
        <h2 className="empoyer-detail-infor__main-title">
          Tại sao bạn sẽ yêu thích làm việc tại đây?
        </h2>
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(companyInfor.whyWorkHere),
          }} // Làm sạch HTML trước khi hiển thị
        />
      </div>
    </div>
  );
}

export default EmployerDetailInfo;
