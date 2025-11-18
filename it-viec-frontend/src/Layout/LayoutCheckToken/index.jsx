import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { checkTokenUsers } from "../../services/UserServices";
import { setLogin } from "../../actions/User";
import { clearStorage } from "../../helpers/localStorage";

function LayoutCheckToken({ checkRole }) {
  const isLogin = useSelector((state) => state.UserReducer);
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
        const result = await checkTokenUsers(token, userType);
        if (userType === checkRole) {
          if (result.length > 0) {
            dispatch(
              setLogin({
                id: result[0].id,
                ok: true,
                userType: userType,
              })
            );
          } else {
            clearStorage();
            navigate("/");
          }
        } else {
        }
      } catch (error) {
        console.error("Loi khi kiem tra token: ", error);
      } finally {
        setIsCheckingToken(false);
      }
    };
    checkToken();
  }, []);
  if (isCheckingToken) {
    return <div>Đang tải...</div>;
  }
  return <Outlet />;
}
export default LayoutCheckToken;
