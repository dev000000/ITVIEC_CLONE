import { Outlet, useNavigate } from "react-router-dom";
import "./LayoutAdmin.scss";
import { useTranslation } from "react-i18next";
import MenuItem from "@/components/SiderBar/MenuItem";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import logo from "@/assets/images/nhieu viec (355 x 85 px).png";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiUsers, FiPieChart, FiTag, FiUserCheck, FiCpu } from "react-icons/fi";
import { BsBriefcase } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import Swal from "sweetalert2";
import { logoutApi } from "@/services/authApi";
import { useUserStore } from "@/store/userStore";
import { useCompanyStore } from "@/store/companyStore";
import { useSeekerStore } from "@/store/seekerStore";

function LayoutAdmin() {
  const { t } = useTranslation(["admin", "common"]);
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);
  const clearCompanyInfo = useCompanyStore((state) => state.clearCompanyInfo);
  const clearSeekerInfo = useSeekerStore((state) => state.clearSeekerInfo);

  const handleLogout = (): void => {
    Swal.fire({
      title: t("common:layout.logoutConfirm"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f766e",
      confirmButtonText: t("common:layout.logoutButton"),
      cancelButtonText: t("common:buttons.cancel"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        await logoutApi();
        logout();
        clearCompanyInfo();
        clearSeekerInfo();
        navigate("/admin/login");
        Swal.fire({
          title: t("common:layout.logoutSuccess"),
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="layout-admin">
      <div className="layout-admin__siderbar">
        <div className="layout-admin__siderbar-logo">
          <img src={logo} alt={t("common:layout.logoAlt")} />
          <div>{t("admin:layout.title")}</div>
        </div>

        <div className="layout-admin__siderbar-menu">
          <ul className="layout-admin__siderbar-list">
            <MenuItem
              props={{
                link: "dashboard",
                name: t("admin:menu.dashboard"),
                icon: <MdOutlineSpaceDashboard />,
              }}
            />
            <MenuItem
              props={{
                link: "users",
                name: t("admin:menu.users"),
                icon: <FiUsers />,
              }}
            />
            <MenuItem
              props={{
                link: "job",
                name: t("admin:menu.jobs"),
                icon: <BsBriefcase />,
              }}
            />
            <MenuItem
              props={{
                link: "popular-tags",
                name: t("admin:menu.popularTags"),
                icon: <FiTag />,
              }}
            />
            <MenuItem
              props={{
                link: "skills",
                name: t("admin:menu.skills"),
                icon: <FiCpu />,
              }}
            />
            <MenuItem
              props={{
                link: "report",
                name: t("admin:menu.report"),
                icon: <FiPieChart />,
              }}
            />
            <MenuItem
              props={{
                link: "employer-registrations",
                name: t("admin:menu.employerRegistrations"),
                icon: <FiUserCheck />,
              }}
            />
          </ul>
        </div>

        <div className="layout-admin__siderbar-button">
          <LanguageSwitcher />
          <button onClick={handleLogout}>
            <IoIosLogOut />
            <span>{t("common:menu.logout")}</span>
          </button>
        </div>
      </div>

      <div className="layout-admin__maincontent">
        <div className="layout-admin__background" />
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default LayoutAdmin;
