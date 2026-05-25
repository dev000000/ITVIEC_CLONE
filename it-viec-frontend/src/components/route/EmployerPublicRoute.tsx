import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface LegacyUserState {
  ok: boolean;
  id: string | null;
  userType: string;
}

const EmployerPublicRoute = () => {
  const isLogin = useSelector(
    (state: { UserReducer: LegacyUserState }) => state.UserReducer
  );
  console.log("EmployerPublicRoute");
  const isLoggedIsAnEmployer = isLogin?.ok && isLogin?.userType === "employer";
  return (
    <>{!isLoggedIsAnEmployer ? <Outlet /> : <Navigate to="dashboard" />}</>
  );
};

export default EmployerPublicRoute;
