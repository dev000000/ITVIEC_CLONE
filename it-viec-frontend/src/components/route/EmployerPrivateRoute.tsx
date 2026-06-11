import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { ROLE } from "@/types/common.types";
import { getLoginRouteByRole } from "@/utils/roleRedirect";

const EmployerPrivateRoute = () => {
  const { authenticated, role } = useUserStore();
  if (authenticated && role === ROLE.EMPLOYER) {
    return <Outlet />;
  }

  return <Navigate to={getLoginRouteByRole(ROLE.EMPLOYER)} replace />;
};

export default EmployerPrivateRoute;
