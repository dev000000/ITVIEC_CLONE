import type { RouteObject } from "react-router-dom";
import AdminPrivateRoute from "@/components/route/AdminPrivateRoute";
import LayoutAdmin from "@/layout/LayoutAdmin";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import AdminUsers from "@/pages/Admin/AdminUsers";
import AdminJobs from "@/pages/Admin/AdminJobs";
import AdminPopularTags from "@/pages/Admin/AdminPopularTags";
import AdminReport from "@/pages/Admin/AdminReport";

const AdminPrivateRoutes: RouteObject = {
  element: <AdminPrivateRoute />,
  children: [
    {
      element: <LayoutAdmin />,
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "users", element: <AdminUsers /> },
        { path: "job", element: <AdminJobs /> },
        { path: "popular-tags", element: <AdminPopularTags /> },
        { path: "report", element: <AdminReport /> },
      ],
    },
  ],
};

export default AdminPrivateRoutes;
