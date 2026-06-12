import { Col, Row } from "antd";
import "./TopCompanies.scss";
import { RiRadioButtonLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import type { CompanyCardResponse } from "@/types/response.types";
import { useTranslation } from "react-i18next";
import IMAGE_NOT_FOUND from "@/assets/images/Image-not-found.png";

interface TopCompaniesProps {
  companyList: CompanyCardResponse[];
}

// Component hiển thị phần các công ty hàng đầu trên trang chủ
const TopCompanies = ({ companyList }: TopCompaniesProps) => {
  console.log("TopCompanies component rendered with companyList:", companyList);
  const navigate = useNavigate();
  const { t } = useTranslation("job");

  const handleNavigateToCompanyDetail = (slug: string) => {
    navigate(`/nha-tuyen-dung/${slug}`);
  }
  return (
    <>
      <div className="top-companies">
        <div className="container">
          {/* Tiêu đề */}
          <h1 className="top-companies__title">{t("topEmployers")}</h1>
          {/* Danh sách công ty */}
          <div className="top-companies__list">
            <Row gutter={[{ xs: 0, sm: 16, md: 20, lg: 20 }, 20]}>
              {companyList.map((company) => {

                return (
                  <Col
                    xxl={8}
                    xl={8}
                    lg={12}
                    md={12}
                    sm={24}
                    xs={24}
                    key={company.id}
                  >
                    <div
                      className="top-companies__item"
                      onClick={() => handleNavigateToCompanyDetail(company.slug)}
                    >
                      {/* Logo công ty */}
                      <div className="top-companies__image">
                        <img
                          src={company.logoUrl || IMAGE_NOT_FOUND}
                          alt="logo_companies"
                        ></img>
                      </div>
                      {/* Tên công ty */}
                      <div className="top-companies__name">
                        {company.companyName}
                      </div>
                      {/* Danh sách kỹ năng */}
                      <div className="top-companies__list-tag">
                        {company.companySkills.map((skill) => (
                          <div className="top-companies__tag" key={skill.id}>
                            {skill.skillName}
                          </div>
                        ))}
                      </div>
                      {/* Địa chỉ và số lượng công việc */}
                      <div className="top-companies__footer">
                        <div>{company.address}</div>
                        <div className="top-companies__view-more">
                          {company.numberOfJobsActive > 0 ? (
                            <>
                              <RiRadioButtonLine className="top-companies__icon-live" />
                              <div>{t("jobCount", { count: company.numberOfJobsActive })}</div>
                              <MdOutlineKeyboardArrowRight />
                            </>
                          ) : (
                            <>
                              <div>{t("viewCompany")}</div>
                              <MdOutlineKeyboardArrowRight />
                            </>
                          )}
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
