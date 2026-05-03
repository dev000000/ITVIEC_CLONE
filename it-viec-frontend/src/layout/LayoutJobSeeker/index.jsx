import { useState } from "react";
import "./LayoutJobSeeker.scss";
import { PiHandWavingFill } from "react-icons/pi";
import { NavLink, Outlet } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaRegFileAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { LuBriefcase } from "react-icons/lu";
import { BsMailbox2Flag } from "react-icons/bs";
import { MdMailOutline } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function LayoutJobSeeker() {
  const seeker = useSelector((state) => state.SeekerReducer);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(localStorage.getItem("id") || "");
  return (
    <>
      <div className="layout-jobseeker">
        <div className="job-seeker-container">
          <div className="layout-jobseeker__flex"><div className="layout-jobseeker__sidebar-wrap">
            <div className="layout-jobseeker__sidebar">
              <div className="layout-jobseeker__hello">
                <PiHandWavingFill />
                <span>Xin chào</span>
              </div>
              <h3 className="layout-jobseeker__username">
                {seeker.fullName || "Tên người dùng"}
              </h3>
              <div className="layout-jobseeker__menu">
                <ul>
                  <li>
                    <NavLink
                      to="tong-quan-ho-so"
                      className="layout-jobseeker__menu-item"
                    >
                      <RxDashboard />
                      <span>Tổng quan</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="ho-so-cv/quan-ly-cv"
                      className="layout-jobseeker__menu-item"
                    >
                      <FaRegFileAlt />
                      <span>Hồ sơ đính kèm</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="ho-so-cv"
                      className="layout-jobseeker__menu-item"
                      end
                    >
                      <FiUser />
                      <span>Hồ sơ ITviec</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="viec-lam-cua-toi/ung-tuyen"
                      className="layout-jobseeker__menu-item"
                    >
                      <LuBriefcase />
                      <span>Việc làm của tôi</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="loi-moi-cong-viec"
                      className="layout-jobseeker__menu-item"
                    >
                      <BsMailbox2Flag />
                      <span>Lời mời công việc</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="dang-ky"
                      className="layout-jobseeker__menu-item"
                    >
                      <MdMailOutline />
                      <span> Đăng ký nhận email </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="cai-dat"
                      className="layout-jobseeker__menu-item"
                    >
                      <IoMdSettings />
                      <span> Cài đặt </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="layout-jobseeker__manage-profile">
            <Outlet />
          </div></div>
        </div>
      </div>
    </>
  );
}

export default LayoutJobSeeker;
