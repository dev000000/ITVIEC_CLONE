
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { getDefaultRouteByRole } from "@/utils/roleRedirect";

const PublicRoute = () => {
  const { authenticated, role } = useUserStore();
  return authenticated ? <Navigate to={getDefaultRouteByRole(role)} replace /> : <Outlet />;
};

export default PublicRoute;
