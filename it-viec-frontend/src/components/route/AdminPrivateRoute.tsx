import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { ROLE } from "@/types/common.types";
import { getLoginRouteByRole } from "@/utils/roleRedirect";

const AdminPrivateRoute = () => {
  const { authenticated, role } = useUserStore();

  if (authenticated && role === ROLE.ADMIN) {
    return <Outlet />;
  }

  return <Navigate to={getLoginRouteByRole(ROLE.ADMIN)} replace />;
};

export default AdminPrivateRoute;
