import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const EmployerPublicRoute = () => {
  const isLogin = useSelector(state => state.UserReducer);
  console.log("EmployerPublicRoute");
  const isLoggedIsAnEmployer = isLogin?.ok && isLogin?.userType === "employer";
  return  (
    <>
    { !isLoggedIsAnEmployer ? <Outlet/> : <Navigate to="dashboard" />}
    </>
  )
}
export default EmployerPublicRoute;