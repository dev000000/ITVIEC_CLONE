import "./DashBoardSider.scss";
import { MdLogout } from "react-icons/md";
import AvatarEmployer from "@/components/AvatarEmployer";
import Messages from "@/components/Messages";
import Activity from "@/components/Activity";
function DashBoardSider() {
  return (
    <div className="dashboard-sider">
      <div className="dashboard-sider__logout">
        <button>
          <MdLogout />
          <span>Logout</span>
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
