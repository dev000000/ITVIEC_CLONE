import "./CardInforEmployer.scss";
import { isObjectEmpty } from "@/helpers/checkObject";
import { useTranslation } from "react-i18next";
import {
  getCompanyModelOptions,
  getCompanySizeOptions,
  getWorkingHoursOptions,
  getOvertimePolicyOptions,
  getIndustryLabel,
} from "@/constants";
import type { CompanyBriefResponse } from "@/types/response.types";
import IMAGE_NOT_FOUND from "@/assets/images/Image-not-found.png";

interface CardInforEmployerProps {
  company: CompanyBriefResponse
};
const CardInforEmployer = ({ company }: CardInforEmployerProps) => {
  const { t } = useTranslation(["shared", "common"]);

  // Translated enum labels
  const companyModelOptions = getCompanyModelOptions(t);
  const companySizeOptions = getCompanySizeOptions(t);
  const workingHoursOptions = getWorkingHoursOptions(t);
  const overtimePolicyOptions = getOvertimePolicyOptions(t);

  const companyModelLabel = companyModelOptions.find((opt) => opt.value === company.companyModel)?.label || company.companyModel;
  const companySizeLabel = companySizeOptions.find((opt) => opt.value === company.companySize)?.label || company.companySize;
  const workingHoursLabel = workingHoursOptions.find((opt) => opt.value === company.workingHours)?.label || company.workingHours;
  const overtimePolicyLabel = overtimePolicyOptions.find((opt) => opt.value === company.overtimePolicy)?.label || company.overtimePolicy;

  if (isObjectEmpty(company)) {
    return <div>{t("employerDetailInfo.noInfo")}</div>
  }
  return (
    <div className="card-infor-employer">
      {/* Phần đầu */}
      <div className="card-infor-employer__head">
        <div className="card-infor-employer__head-top">
          {/* Hiển thị logo công ty */}
          <div className="card-infor-employer__logo">
            <img src={company?.logoUrl || IMAGE_NOT_FOUND} alt="logo_company" />
          </div>
          {/* Hiển thị tên công ty */}
          <div className="card-infor-employer__name">{company?.companyName || "--"}</div>
        </div>
        {/* Hiển thị mô tả công ty */}
        <div className="card-infor-employer__title">
          {company?.description || "--"}
        </div>
      </div>
      {/* Phần nội dung */}
      <div className="card-infor-employer__body">
        <div className="card-infor-employer__item">
          <div className="card-infor-employer__item-title">{t("employerDetailInfo.companyModel")}</div>
          {/* Hiển thị mô hình công ty */}
          <div className="card-infor-employer__item-content">{companyModelLabel || "--"}</div>
        </div>
        <div className="card-infor-employer__item">
          <div className="card-infor-employer__item-title">
            {t("employerDetailInfo.companyField")}
          </div>
          {/* Hiển thị lĩnh vực công ty */}
          <div className="card-infor-employer__item-content">{getIndustryLabel(company?.industry?.industryName, t) || "--"}</div>
        </div>
        <div className="card-infor-employer__item">
          <div className="card-infor-employer__item-title">{t("employerDetailInfo.companySize")}</div>
          {/* Hiển thị quy mô công ty */}
          <div className="card-infor-employer__item-content">
            {companySizeLabel || "--"}
          </div>
        </div>
        <div className="card-infor-employer__item">
          <div className="card-infor-employer__item-title">{t("employerDetailInfo.country")}</div>
          {/* Hiển thị quốc gia công ty */}
          <div className="card-infor-employer__item-content">{company?.country?.countryName || "--"}</div>
        </div>
        <div className="card-infor-employer__item">
          <div className="card-infor-employer__item-title">
            {t("employerDetailInfo.workingHours")}
          </div>
          {/* Hiển thị giờ làm việc */}
          <div className="card-infor-employer__item-content">{workingHoursLabel || "--"}</div>
        </div>
        <div className="card-infor-employer__item card-infor-employer__item--nodash">
          <div className="card-infor-employer__item-title">
            {t("employerDetailInfo.overtimePolicy")}
          </div>
          {/* Hiển thị chính sách làm thêm giờ */}
          <div className="card-infor-employer__item-content">{overtimePolicyLabel || "--"}</div>
        </div>
      </div>
    </div>
  );
}

export default CardInforEmployer;
