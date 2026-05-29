
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
import { useSeekerStore } from "@/store/seekerStore";
import { useTranslation } from "react-i18next";

const LayoutJobSeeker = () => {
  const { t } = useTranslation("common");
  const fullName = useSeekerStore((state) => state.fullName);

  return (
    <>
      <div className="layout-jobseeker">
        <div className="job-seeker-container">
          <div className="layout-jobseeker__flex">
            <div className="layout-jobseeker__sidebar-wrap">
              <div className="layout-jobseeker__sidebar">
                <div className="layout-jobseeker__hello">
                  <PiHandWavingFill />
                  <span>{t("layout.hello")}</span>
                </div>
                <h3 className="layout-jobseeker__username">
                  {fullName || t("layout.defaultUser")}
                </h3>
                <div className="layout-jobseeker__menu">
                  <ul>
                    <li>
                      <NavLink
                        to="tong-quan-ho-so"
                        className="layout-jobseeker__menu-item"
                      >
                        <RxDashboard />
                        <span>{t("menu.overview")}</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="ho-so-cv/quan-ly-cv"
                        className="layout-jobseeker__menu-item"
                      >
                        <FaRegFileAlt />
                        <span>{t("menu.attachedCv")}</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="ho-so-cv"
                        className="layout-jobseeker__menu-item"
                        end
                      >
                        <FiUser />
                        <span>{t("menu.profile")}</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="viec-lam-cua-toi/ung-tuyen"
                        className="layout-jobseeker__menu-item"
                      >
                        <LuBriefcase />
                        <span>{t("menu.myJobs")}</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="loi-moi-cong-viec"
                        className="layout-jobseeker__menu-item"
                      >
                        <BsMailbox2Flag />
                        <span>{t("menu.jobInvitations")}</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="dang-ky"
                        className="layout-jobseeker__menu-item"
                      >
                        <MdMailOutline />
                        <span>{t("menu.emailSubscription")}</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="cai-dat"
                        className="layout-jobseeker__menu-item"
                      >
                        <IoMdSettings />
                        <span>{t("menu.settings")}</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="layout-jobseeker__manage-profile">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LayoutJobSeeker;
