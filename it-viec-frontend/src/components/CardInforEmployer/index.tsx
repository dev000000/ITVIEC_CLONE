import "./CardInforEmployer.scss";
import { isObjectEmpty } from "@/helpers/checkObject";
import MB from "@/assets/images/mb-bank.webp";
import SCANDINAVIAN from "@/assets/images/scandinavian-software-park.webp";
import OTSV from "@/assets/images/one-tech-stop-vietnam-company-ltd.webp";
import MCREDIT from "@/assets/images/mcredit-cong-ty-tai-chinh-tnhh-mb-shinsei.webp";
import TYMEX from "@/assets/images/tymex.webp";
import ANDPAD from "@/assets/images/andpad-vietnam-co-ltd.webp";
import EMPLOYMENTHERO from "@/assets/images/employment-hero.webp";
import BOSCH from "@/assets/images/bosch-global-software-technologies-company-limited.webp";
import SSI from "@/assets/images/ssi-securities-corporation.webp";
import { useTranslation } from "react-i18next";
import {
  getCompanyModelOptions,
  getCompanySizeOptions,
  getWorkingHoursOptions,
  getOvertimePolicyOptions,
} from "@/constants";

interface Company {
  slug?: string;
  companyName?: string;
  description?: string;
  companyModel?: string;
  industry?: string;
  companySize?: string;
  country?: string | { countryName?: string };
  workingHours?: string;
  overtimePolicy?: string;
}

interface CardInforEmployerProps {
  company: Company;
}

const logoMap: Record<string, string> = {
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
function CardInforEmployer({ company }: CardInforEmployerProps) {
  company = company || {};
  const { t } = useTranslation("shared");
  const countryName =
    typeof company.country === "string"
      ? company.country
      : company.country?.countryName;

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
          <div className="card-infor-employer__item-title">{t("employerDetailInfo.companyModel")}</div>
          <div className="card-infor-employer__item-content">{companyModelLabel}</div>
        </div>
        <div className="card-infor-employer__item">
          <div className="card-infor-employer__item-title">
            {t("employerDetailInfo.companyField")}
          </div>
          <div className="card-infor-employer__item-content">{company.industry}</div>
        </div>
        <div className="card-infor-employer__item">
          <div className="card-infor-employer__item-title">{t("employerDetailInfo.companySize")}</div>
          <div className="card-infor-employer__item-content">
            {companySizeLabel}
          </div>
        </div>
        <div className="card-infor-employer__item">
          <div className="card-infor-employer__item-title">{t("employerDetailInfo.country")}</div>
          <div className="card-infor-employer__item-content">{countryName}</div>
        </div>
        <div className="card-infor-employer__item">
          <div className="card-infor-employer__item-title">
            {t("employerDetailInfo.workingHours")}
          </div>
          <div className="card-infor-employer__item-content">{workingHoursLabel}</div>
        </div>
        <div className="card-infor-employer__item card-infor-employer__item--nodash">
          <div className="card-infor-employer__item-title">
            {t("employerDetailInfo.overtimePolicy")}
          </div>
          <div className="card-infor-employer__item-content">{overtimePolicyLabel}</div>
        </div>
      </div>
    </div>
  );
}

export default CardInforEmployer;
