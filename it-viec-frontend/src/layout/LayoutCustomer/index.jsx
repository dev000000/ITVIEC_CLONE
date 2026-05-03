import { Outlet, useNavigate } from "react-router-dom";
import "./LayoutCustomer.scss";
import { useEffect, useState } from "react";
import logo from "../../assets/images/nhieu viec (355 x 85 px).png";
import { getCompanyWithJobsByUserID } from "../../services/EmployerServices";
import MenuItem from "../../components/SiderBar/MenuItem";
import { FiPieChart } from "react-icons/fi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsBriefcase } from "react-icons/bs";
import { HiOutlineDocument } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import { clearStorage } from "../../helpers/localStorage";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../actions/User";
import { clearCompanyInfo, setCompanyFullInfo } from "../../actions/Company";
import { CgProfile } from "react-icons/cg";
function LayoutCustomer() {
  const company = useSelector(state => state.CompanyReducer);
  const dispatch = useDispatch();
  const [isLoadingCompany, setIsLoadingCompany] = useState(false);
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  useEffect(() => {
    const getCompanyInfo = async () => {
      try {
        const companyInfor = await getCompanyWithJobsByUserID(userId);
        if (companyInfor.length > 0 && companyInfor[0].userId == userId) {
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
        console.log("Loi khi lay company detail", error);
        clearStorage();
        navigate("/");
      }
    };
    getCompanyInfo();
  }, [userId]);
  console.log("company", company);
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Logout",
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
          title: "Logout!",
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
              <img src={logo} alt="logoNhieuViec" />
              <div> Nhà Tuyển Dụng </div>
            </div>
            <div className="layout-customer__siderbar-menu">
              <ul className="layout-customer__siderbar-list">
                <MenuItem
                  props={{
                    link: "dashboard",
                    name: "DashBoard",
                    icon: <MdOutlineSpaceDashboard />,
                  }}
                />
                <MenuItem
                  props={{
                    link: "profile",
                    name: "Profile",
                    icon: <CgProfile />,
                  }}
                />
                <MenuItem
                  props={{ link: "job", name: "Jobs", icon: <BsBriefcase /> }}
                />
                <MenuItem
                  props={{
                    link: "application",
                    name: "Applications",
                    icon: <HiOutlineDocument />,
                  }}
                />
                <MenuItem
                  props={{
                    link: "report",
                    name: "Reports",
                    icon: <FiPieChart />,
                  }}
                />
              </ul>
            </div>
            <div className="layout-customer__siderbar-button">
              <button onClick={handleLogout}>
                <IoIosLogOut />
                <span>Log out</span>
              </button>
            </div>
          </div>

          <div className="layout-customer__maincontent">
            <div className="background-gradient"></div>
            <div className="container">
              <Outlet />
            </div>
          </div>
          {/* <Col span={5}>
            <div className="layout-customer__rightcontent"><DashBoardSider/></div>
          </Col> */}
        </div>
      ) : (
        <div>Loading.....</div>
      )}
    </>
  );
}
export default LayoutCustomer;
