import "./EmployerDetailInfo.scss";
import { Col, Row } from "antd";
import TagSkill from "@/components/TagSkill";
import { useOutletContext } from "react-router-dom";
import DOMPurify from "dompurify";
import type { CompanyDetailResponse } from "@/types/response.types";
import {
  COMPANY_MODEL_EN,
  COMPANY_MODEL_VI,
  COMPANY_SIZE_EN,
  COMPANY_SIZE_VI,
  toVI,
  WORKING_HOURS_EN,
  WORKING_HOURS_VI,
} from "@/utils/displayValue";
import { useTranslation } from "react-i18next";

interface EmployerDetailOutletContext {
  companyInfor: CompanyDetailResponse;
}

function EmployerDetailInfo() {
  const { companyInfor } = useOutletContext<EmployerDetailOutletContext>();
  const { t, i18n } = useTranslation("shared");
  const isEN = i18n.language === "en";

  const companyModelMap = isEN ? COMPANY_MODEL_EN : COMPANY_MODEL_VI;
  const companySizeMap = isEN ? COMPANY_SIZE_EN : COMPANY_SIZE_VI;
  const workingHoursMap = isEN ? WORKING_HOURS_EN : WORKING_HOURS_VI;

  return (
    <div className="empoyer-detail-infor">
      <div className="empoyer-detail-infor__box empoyer-detail-infor__overview">
        <h2 className="empoyer-detail-infor__main-title">{t("employerDetailInfo.generalInfo")}</h2>
        <Row className="empoyer-detail-infor__row" gutter={[16, 16]}>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <div className="empoyer-detail-infor__title-wrap">
              <div className="empoyer-detail-infor__title">{t("employerDetailInfo.companyModel")}</div>
              <div className="empoyer-detail-infor__content">
                {toVI(companyInfor?.companyModel, companyModelMap) || "???"}
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <div className="empoyer-detail-infor__title-wrap">
              <div className="empoyer-detail-infor__title">
                {t("employerDetailInfo.companyField")}
              </div>
              <div className="empoyer-detail-infor__content">
                {companyInfor?.industry || "???"}
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <div className="empoyer-detail-infor__title-wrap">
              <div className="empoyer-detail-infor__title">{t("employerDetailInfo.companySize")}</div>
              <div className="empoyer-detail-infor__content">
                {toVI(companyInfor?.companySize, companySizeMap) || "???"}
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <div className="empoyer-detail-infor__title-wrap">
              <div className="empoyer-detail-infor__title">{t("employerDetailInfo.country")}</div>
              <div className="empoyer-detail-infor__content">
                {companyInfor?.country?.countryName || "???"}
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <div className="empoyer-detail-infor__title-wrap">
              <div className="empoyer-detail-infor__title">
                {t("employerDetailInfo.workingHours")}
              </div>
              <div className="empoyer-detail-infor__content">
                {toVI(companyInfor?.workingHours, workingHoursMap) || "???"}
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="empoyer-detail-infor__box empoyer-detail-infor__introduction">
        <h2 className="empoyer-detail-infor__main-title">{t("employerDetailInfo.companyIntro")}</h2>
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(companyInfor?.companyIntroduction || ""),
          }}
        />
      </div>
      <div className="empoyer-detail-infor__box empoyer-detail-infor__ourexpertise">
        <h2 className="empoyer-detail-infor__main-title">
          {t("employerDetailInfo.ourExpertise")}
        </h2>
        <div className="empoyer-detail-infor__intro-skills">{t("employerDetailInfo.keySkills")}</div>
        <div className="empoyer-detail-infor__list-tag">
          {companyInfor?.companySkills?.map((skill) => (
            <TagSkill key={skill.id} text={skill.skillName} />
          ))}
        </div>
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(companyInfor?.ourExpertise || ""),
          }}
        />
      </div>
      <div className="empoyer-detail-infor__box empoyer-detail-infor__benefits">
        <h2 className="empoyer-detail-infor__main-title">
          {t("employerDetailInfo.whyWorkHere")}
        </h2>
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(companyInfor?.whyWorkHere || ""),
          }}
        />
      </div>
    </div>
  );
}

export default EmployerDetailInfo;
