import type { RouteObject } from "react-router-dom";
import AdminPublicRoute from "@/components/route/AdminPublicRoute";
import AdminLogin from "@/pages/Admin/AdminLogin";

const AdminPublicRoutes: RouteObject = {
  element: <AdminPublicRoute />,
  children: [{ path: "login", element: <AdminLogin /> }],
};

export default AdminPublicRoutes;
