import "./CampaignHighLight.scss";
import img from "../../assets/images/hot 1.webp";
import { BsArrowRightCircle } from "react-icons/bs";
function CampaignHighLight() {
  return (
    <>
      <div className="campaign-highlight">
        <div className="container">
          <div className="campaign-highlight__content">
            <div className="campaign-highlight__icon-hot">
              <img src={img} alt="icon hot"></img>
            </div>
            <div className="campaign-highlight__title">
              <div className="campaign-highlight__title-1">Khám phá Lời mời công việc</div>
              <div className="campaign-highlight__title-2">Cập nhật CV mới nhất để x2 tốc độ tìm việc</div>
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
