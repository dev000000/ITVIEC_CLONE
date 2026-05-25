import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface LegacyUserState {
  ok: boolean;
  id: string | null;
  userType: string;
}

const EmployerPrivateRoute = () => {
  const isLogin = useSelector(
    (state: { UserReducer: LegacyUserState }) => state.UserReducer
  );
  const isLoggedIsAnEmployer = isLogin?.ok && isLogin?.userType === "employer";
  return (
    <>{isLoggedIsAnEmployer ? <Outlet /> : <Navigate to="login" />}</>
  );
};

export default EmployerPrivateRoute;
