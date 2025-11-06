import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const isLogin = useSelector(state => state.UserReducer);
  const isLoggedIsAnUser = isLogin?.ok && isLogin?.userType === "jobSeeker";
  return  (
    <>
    { isLoggedIsAnUser ? <Outlet/> : <Navigate to="login" />}
    </>
  )
};
export default PrivateRoute;