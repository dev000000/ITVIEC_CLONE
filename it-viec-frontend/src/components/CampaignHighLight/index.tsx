import "./CampaignHighLight.scss";
import img from "@/assets/images/hot 1.webp";
import { BsArrowRightCircle } from "react-icons/bs";
import { useTranslation } from "react-i18next";

// Component hiển thị phần highlight các chiến dịch tuyển dụng nổi bật trên trang chủ
const CampaignHighLight = () => {
  const { t } = useTranslation("jobseeker");
  return (
    <>
      <div className="campaign-highlight">
        <div className="container">
          <div className="campaign-highlight__content">
            <div className="campaign-highlight__icon-hot">
              <img src={img} alt="icon hot"></img>
            </div>
            <div className="campaign-highlight__title">
              <div className="campaign-highlight__title-1">{t("campaign.title1")}</div>
              <div className="campaign-highlight__title-2">{t("campaign.title2")}</div>
            </div>
            <div>
              <BsArrowRightCircle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CampaignHighLight;
