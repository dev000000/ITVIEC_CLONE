import "./DashBoardSider.scss";
import { MdLogout } from "react-icons/md";
import AvatarEmployer from "@/components/AvatarEmployer";
import Messages from "@/components/Messages";
import Activity from "@/components/Activity";
import { useTranslation } from "react-i18next";
function DashBoardSider() {
  const { t } = useTranslation("common");
  return (
    <div className="dashboard-sider">
      <div className="dashboard-sider__logout">
        <button>
          <MdLogout />
          <span>{t("buttons.logout")}</span>
        </button>
      </div>
      <div className="dashboard-sider__avatar">
        <AvatarEmployer />
      </div>
      <div className="dashboard-sider__msg">
        <Messages />
      </div>
      <div className="dashboard-sider__activity">
        <Activity />
      </div>

    </div>
  );
}

export default DashBoardSider;
