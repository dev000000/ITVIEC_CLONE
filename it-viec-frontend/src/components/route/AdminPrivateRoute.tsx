import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { ROLE } from "@/types/common.types";
import { getDefaultRouteByRole, getLoginRouteByRole } from "@/utils/roleRedirect";

const AdminPrivateRoute = () => {
  const { authenticated, role } = useUserStore();

  if (authenticated && role === ROLE.ADMIN) {
    return <Outlet />;
  }

  if (authenticated) {
    return <Navigate to={getDefaultRouteByRole(role)} replace />;
  }

  return <Navigate to={getLoginRouteByRole(ROLE.ADMIN)} replace />;
};

export default AdminPrivateRoute;
