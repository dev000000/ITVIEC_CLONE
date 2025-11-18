import React from "react";
import "./DashBoardSider.scss";
import { MdLogout } from "react-icons/md";
import AvatarEmployer from "../AvatarEmployer";
import Messages from "../Messages";
import Activity from "../Activity";
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
        <AvatarEmployer/>
      </div>
      <div className="dashboard-sider__msg">
        <Messages/>
      </div>
      <div className="dashboard-sider__activity">
        <Activity/>
      </div>

    </div>
  );
}

export default DashBoardSider;
