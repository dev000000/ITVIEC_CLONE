import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const EmployerPrivateRoute = () => {
  const isLogin = useSelector(state => state.UserReducer);
  const isLoggedIsAnEmployer = isLogin?.ok && isLogin?.userType === "employer";
  return  (
    <>
    { isLoggedIsAnEmployer ? <Outlet/> : <Navigate to="login" />}
    </>
  )
}
export default EmployerPrivateRoute;