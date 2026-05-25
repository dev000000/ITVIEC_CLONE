import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface LegacyUserState {
  ok: boolean;
  id: string | null;
  userType: string;
}

const PublicRoute = () => {
  const isLogin = useSelector(
    (state: { UserReducer: LegacyUserState }) => state.UserReducer
  );
  const isLoggedIsAnUser = isLogin?.ok && isLogin?.userType === "jobSeeker";
  return (
    <>{!isLoggedIsAnUser ? <Outlet /> : <Navigate to="/" />}</>
  );
};

export default PublicRoute;
