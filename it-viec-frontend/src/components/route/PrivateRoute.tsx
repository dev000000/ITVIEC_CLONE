import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/store/userStore";

const PrivateRoute = () => {
  const { authenticated, role } = useUserStore();
  const isLoggedAndIsASeeker = authenticated && role === "SEEKER";
  return (
    <>{isLoggedAndIsASeeker ? <Outlet /> : <Navigate to="login" />}</>
  );
};

export default PrivateRoute;
