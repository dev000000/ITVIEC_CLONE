import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { ROLE } from "@/types/common.types";
import { getLoginRouteByRole } from "@/utils/roleRedirect";

const PrivateRoute = () => {
  const { authenticated, role } = useUserStore();
  if (authenticated && role === ROLE.SEEKER) {
    return <Outlet />;
  }

  return <Navigate to={getLoginRouteByRole(ROLE.SEEKER)} replace />;
};

export default PrivateRoute;
