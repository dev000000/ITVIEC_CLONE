import { Outlet, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import "./LayoutDefault.scss";
import Header from "../../components/Header";
import FooterComp from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkTokenUsers } from "../../services/UserServices";
import { setLogin } from "../../actions/User";
import { clearSeekerInfo, setSeekerFullInfo } from "../../actions/Seeker";
import { getSeekerInforByUserId } from "../../services/SeekerServices";
const { Content } = Layout;
function LayoutDefault() {
  const checkRole = "jobSeeker";
  const isLogin = useSelector((state) => state.UserReducer);
  const seeker = useSelector((state) => state.SeekerReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem("token");
        const userType = localStorage.getItem("userType");

        if (!token || !userType) {
          setIsCheckingToken(false);
          return;
        }
        const resultCheckToken = await checkTokenUsers(token, userType);
        if (userType === checkRole) {
          if (resultCheckToken.length > 0) {
            const resultSeeker = await getSeekerInforByUserId(
              resultCheckToken[0].id
            );
            dispatch(
              setLogin({
                id: resultCheckToken[0].id,
                ok: true,
                userType: userType,
              })
            );
            if (resultSeeker && resultSeeker[0]) {
                dispatch(setSeekerFullInfo(resultSeeker[0]));
            }
          } else {
            dispatch(
              setLogin({
                id: 0,
                ok: false,
                role: "none",
              })
            );
            localStorage.clear();
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Error checking token:", error);
      } finally {
        setIsCheckingToken(false);
      }
    };
    checkToken();
  }, []);
  return (
    <>
      {isCheckingToken ? (
        <div>....Loading</div>
      ) : (
        <Layout className="layout-default">
          <Header type="jobSeeker"/>
          <Content className="content">
            <Outlet />
          </Content>
          <FooterComp />
        </Layout>
      )}
    </>
  );
}
export default LayoutDefault;
