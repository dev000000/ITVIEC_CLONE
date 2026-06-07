import { Outlet, useNavigate } from "react-router-dom";
import "./LayoutCustomer.scss";
import { useEffect, useState } from "react";
import logo from "@/assets/images/nhieu viec (355 x 85 px).png";
import { logoutApi } from "@/services/authApi";
import { getMyCompanyApi } from "@/services/companyApi";
import MenuItem from "@/components/SiderBar/MenuItem";
import { FiPieChart } from "react-icons/fi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsBriefcase } from "react-icons/bs";
import { HiOutlineDocument } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import Swal from "sweetalert2";
import { useUserStore } from "@/store/userStore";
import { useCompanyStore } from "@/store/companyStore";
import { useSeekerStore } from "@/store/seekerStore";
import { CgProfile } from "react-icons/cg";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

function LayoutCustomer() {
  const { t } = useTranslation("common");
  const logout = useUserStore((state) => state.logout);
  const setCompanyFullInfo = useCompanyStore((state) => state.setCompanyFullInfo);
  const clearCompanyInfo = useCompanyStore((state) => state.clearCompanyInfo);
  const clearSeekerInfo = useSeekerStore((state) => state.clearSeekerInfo);
  const [isLoadingCompany, setIsLoadingCompany] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCompanyInfo = async (): Promise<void> => {
      try {
        const response = await getMyCompanyApi();
        setCompanyFullInfo(response.data.result);
        setIsLoadingCompany(true);
      } catch (error) {
        console.error("Failed to load company information", error);
        logout();
        clearCompanyInfo();
        clearSeekerInfo();
        navigate("/");
      }
    };
    getCompanyInfo();
  }, [clearCompanyInfo, clearSeekerInfo, logout, navigate, setCompanyFullInfo]);

  const handleLogout = (): void => {
    Swal.fire({
      title: t("layout.logoutConfirm"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: t("layout.logoutButton"),
      cancelButtonText: t("buttons.cancel"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        await logoutApi();
        logout();
        clearCompanyInfo();
        clearSeekerInfo();
        navigate("/");
        Swal.fire({
          title: t("layout.logoutSuccess"),
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      {isLoadingCompany ? (
        <div className="layout-customer">
          <div className="layout-customer__siderbar">
            <div className="layout-customer__siderbar-logo">
              <img src={logo} alt={t("layout.logoAlt")} />
              <div>{t("layout.employer")}</div>
            </div>
            <div className="layout-customer__siderbar-menu">
              <ul className="layout-customer__siderbar-list">
                <MenuItem
                  props={{
                    link: "dashboard",
                    name: t("menu.dashboard"),
                    icon: <MdOutlineSpaceDashboard />,
                  }}
                />
                <MenuItem
                  props={{
                    link: "profile",
                    name: t("menu.profile"),
                    icon: <CgProfile />,
                  }}
                />
                <MenuItem
                  props={{ link: "job", name: t("menu.jobs"), icon: <BsBriefcase /> }}
                />
                <MenuItem
                  props={{
                    link: "application",
                    name: t("menu.applications"),
                    icon: <HiOutlineDocument />,
                  }}
                />
                <MenuItem
                  props={{
                    link: "report",
                    name: t("menu.reports"),
                    icon: <FiPieChart />,
                  }}
                />
              </ul>
            </div>
            <div className="layout-customer__siderbar-button">
              <LanguageSwitcher />
              <button onClick={handleLogout}>
                <IoIosLogOut />
                <span>{t("menu.logout")}</span>
              </button>
            </div>
          </div>

          <div className="layout-customer__maincontent">
            <div className="background-gradient"></div>
            <div className="container">
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <div>{t("layout.loading")}</div>
      )}
    </>
  );
}

export default LayoutCustomer;
