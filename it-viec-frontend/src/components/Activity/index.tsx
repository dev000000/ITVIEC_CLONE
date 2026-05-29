import "./Activity.scss";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";

function Activity() {
  const { t } = useTranslation("employer");
  return (
    <div className="activity">
      <div className="activity__head">
        <div className="activity__title">{t("activity.title")}</div>
        <div className="activity__icon">
          <IoMdNotificationsOutline />
        </div>
      </div>
      <div className="activity__items">
        {[1, 2, 3, 4, 5].map((i) => (
          <div className="activity__item" key={i}>
            <div className="activity__logo">
              <MdErrorOutline />
            </div>
            <div className="activity__body-item">
              <div className="activity__notify">{t("activity.notification")}</div>
              <div className="activity__action">{t("activity.renewNow")}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Activity