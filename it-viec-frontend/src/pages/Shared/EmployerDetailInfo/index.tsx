import "./EmployerDetailInfo.scss";
import { Col, Row } from "antd";
import TagSkill from "@/components/TagSkill";
import { useOutletContext } from "react-router-dom";
import DOMPurify from "dompurify";
import type { CompanyDetailResponse } from "@/types/response.types";
import { COMPANY_MODEL_VI, COMPANY_SIZE_VI, toVI, WORKING_HOURS_VI } from "@/utils/displayValue";



interface EmployerDetailOutletContext {
  companyInfor: CompanyDetailResponse;
}

function EmployerDetailInfo() {
  const { companyInfor } = useOutletContext<EmployerDetailOutletContext>();
  console.log("companyInfor", companyInfor);

  return (
    <div className="empoyer-detail-infor">
      <div className="empoyer-detail-infor__box empoyer-detail-infor__overview">
        <h2 className="empoyer-detail-infor__main-title">Thông tin chung</h2>
        <Row className="empoyer-detail-infor__row" gutter={[16, 16]}>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <div className="empoyer-detail-infor__title-wrap">
              <div className="empoyer-detail-infor__title">Mô hình công ty</div>
              <div className="empoyer-detail-infor__content">
                {toVI(companyInfor?.companyModel, COMPANY_MODEL_VI) || "???"}
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <div className="empoyer-detail-infor__title-wrap">
              <div className="empoyer-detail-infor__title">
                Lĩnh vực công ty
              </div>
              <div className="empoyer-detail-infor__content">
                {companyInfor?.industry || "Công ty TNHH"}
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <div className="empoyer-detail-infor__title-wrap">
              <div className="empoyer-detail-infor__title">Quy mô công ty</div>
              <div className="empoyer-detail-infor__content">
                {toVI(companyInfor?.companySize, COMPANY_SIZE_VI) || "???"}
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <div className="empoyer-detail-infor__title-wrap">
              <div className="empoyer-detail-infor__title">Quốc gia</div>
              <div className="empoyer-detail-infor__content">
                {companyInfor?.country?.countryName || "???"}
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <div className="empoyer-detail-infor__title-wrap">
              <div className="empoyer-detail-infor__title">
                Thời gian làm việc
              </div>
              <div className="empoyer-detail-infor__content">
                {toVI(companyInfor?.workingHours, WORKING_HOURS_VI) || "???"}
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
            __html: DOMPurify.sanitize(companyInfor?.companyIntroduction || ""),
          }} // Làm sạch HTML trước khi hiển thị
        />
      </div>
      <div className="empoyer-detail-infor__box empoyer-detail-infor__ourexpertise">
        <h2 className="empoyer-detail-infor__main-title">
          Chuyên môn của chúng tôi
        </h2>
        <div className="empoyer-detail-infor__intro-skills">Our Key Skills</div>
        <div className="empoyer-detail-infor__list-tag">
          {companyInfor?.companySkills?.map((skill) => (
            <TagSkill key={skill.id} text={skill.skillName} />
          ))}
        </div>
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(companyInfor?.ourExpertise || ""),
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
            __html: DOMPurify.sanitize(companyInfor?.whyWorkHere || ""),
          }} // Làm sạch HTML trước khi hiển thị
        />
      </div>
    </div>
  );
}

export default EmployerDetailInfo;
