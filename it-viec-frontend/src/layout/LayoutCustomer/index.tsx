import { Outlet, useNavigate } from "react-router-dom";
import "./LayoutCustomer.scss";
import { useEffect, useState } from "react";
import logo from "@/assets/images/nhieu viec (355 x 85 px).png";
import { getCompanyWithJobsByUserID } from "@/services/EmployerServices";
import MenuItem from "@/components/SiderBar/MenuItem";
import { FiPieChart } from "react-icons/fi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsBriefcase } from "react-icons/bs";
import { HiOutlineDocument } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import { clearStorage } from "@/helpers/localStorage";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "@/actions/User";
import { clearCompanyInfo, setCompanyFullInfo } from "@/actions/Company";
import { CgProfile } from "react-icons/cg";
import { useTranslation } from "react-i18next";

interface CompanyState {
  id?: number;
  userId?: string;
  name?: string;
}

function LayoutCustomer(): JSX.Element {
  const { t } = useTranslation("common");
  const company = useSelector((state: any) => state.CompanyReducer) as CompanyState;
  const dispatch = useDispatch();
  const [isLoadingCompany, setIsLoadingCompany] = useState(false);
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    const getCompanyInfo = async (): Promise<void> => {
      try {
        const companyInfor = await getCompanyWithJobsByUserID(userId);
        if (companyInfor.length > 0 && companyInfor[0].userId === userId) {
          dispatch(setCompanyFullInfo(companyInfor[0]));
          setIsLoadingCompany(true);
        } else {
          dispatch(
            setLogin({
              id: 0,
              ok: false,
              userType: "none",
            })
          );
          clearStorage();
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to load company information", error);
        clearStorage();
        navigate("/");
      }
    };
    getCompanyInfo();
  }, [dispatch, navigate, userId]);

  console.log("company", company);

  const handleLogout = (): void => {
    Swal.fire({
      title: t("layout.logoutConfirm"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: t("layout.logoutButton"),
      cancelButtonText: t("buttons.cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          setLogin({
            id: 0,
            ok: false,
            userType: "none",
          })
        );
        dispatch(clearCompanyInfo());
        clearStorage();
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
