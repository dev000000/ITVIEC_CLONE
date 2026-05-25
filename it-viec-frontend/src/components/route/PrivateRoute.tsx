import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

interface LegacyUserState {
  ok: boolean;
  id: string | null;
  userType: string;
}

const PrivateRoute = () => {
  const isLogin = useSelector(
    (state: { UserReducer: LegacyUserState }) => state.UserReducer
  );
  const isLoggedIsAnUser = isLogin?.ok && isLogin?.userType === "jobSeeker";
  return (
    <>{isLoggedIsAnUser ? <Outlet /> : <Navigate to="login" />}</>
  );
};

export default PrivateRoute;
