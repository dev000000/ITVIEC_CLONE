import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { ROLE } from "@/types/common.types";
import { getDefaultRouteByRole } from "@/utils/roleRedirect";

const PublicRoute = () => {
  const { authenticated, role } = useUserStore();

  if (authenticated && role === ROLE.SEEKER) {
    return <Navigate to={getDefaultRouteByRole(role)} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
