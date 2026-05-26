import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/store/userStore";

const EmployerPublicRoute = () => {
  const { authenticated, role } = useUserStore();
  const isLoggedAndIsAnEmployer = authenticated && role === "EMPLOYER";
  return (
    <>{!isLoggedAndIsAnEmployer ? <Outlet /> : <Navigate to="dashboard" />}</>
  );
};

export default EmployerPublicRoute;
