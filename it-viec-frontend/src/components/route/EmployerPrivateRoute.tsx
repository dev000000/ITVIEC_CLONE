import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/store/userStore";

const EmployerPrivateRoute = () => {
  const { authenticated, role } = useUserStore();
  const isLoggedAndIsAnEmployer = authenticated && role === "EMPLOYER";
  return (
    <>{isLoggedAndIsAnEmployer ? <Outlet /> : <Navigate to="login" />}</>
  );
};

export default EmployerPrivateRoute;
