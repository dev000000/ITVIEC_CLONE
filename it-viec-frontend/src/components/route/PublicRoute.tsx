
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/store/userStore";

const PublicRoute = () => {
  const { authenticated, role } = useUserStore();
  const isLoggedAndIsASeeker = authenticated && role === "SEEKER";
  return (
    <>{!isLoggedAndIsASeeker ? <Outlet /> : <Navigate to="/" />}</>
  );
};

export default PublicRoute;
