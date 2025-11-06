import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const PublicRoute = () => {
  const isLogin = useSelector(state => state.UserReducer);
  const isLoggedIsAnUser = isLogin?.ok && isLogin?.userType === "jobSeeker";
  return  (
    <>
    { !isLoggedIsAnUser ? <Outlet/> : <Navigate to="/" />}
    </>
  )
}
export default PublicRoute;