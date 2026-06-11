import "./EmployerDetailRate.scss";
import image from "@/assets/images/everything-empty.svg";
import { useTranslation } from "react-i18next";

// 1.5.3 Tab đánh giá của nhà tuyển dụng
const EmployerDetailRate = () => {
  const { t } = useTranslation("shared");
  return (
    <div className="employer-detail-rate">
      <div className="employer-box employer-box--empty">
        <div className="employer-box__image">
          <img src={image} alt="No posts" />
        </div>
        <div className="employer-box__content">
          <p>{t("employerDetailRate.noReviews")}</p>
        </div>
      </div>
    </div>
  );
}

export default EmployerDetailRate;
