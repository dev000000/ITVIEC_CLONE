import EmployerPrivateRoute from "../components/route/EmployerPrivateRoute";
import LayoutCustomer from "../Layout/LayoutCustomer";
import EmployerApplications from "../pages/Employer/EmployerApplications";
import EmployerDashBoard from "../pages/Employer/EmployerDashBoard";
import EmployerJobDetail from "../pages/Employer/EmployerJobDetail";
import EmployerJobs from "../pages/Employer/EmployerJobs";
import EmployerProfile from "../pages/Employer/EmployerProfile";
import EmployerReports from "../pages/Employer/EmployerReports";
import EmployerDetailBlog from "../pages/Shared/EmployerDetailBlog";
import EmployerDetailInfo from "../pages/Shared/EmployerDetailInfo";
import EmployerDetailRate from "../pages/Shared/EmployerDetailRate";
const EmployerPrivateRoutes = {
  element: <EmployerPrivateRoute />,
  children: [
    {
      element: <LayoutCustomer />,
      children: [
        { path: "dashboard", element: <EmployerDashBoard /> },
        {
          path: "job",
          element: <EmployerJobs />
        },
        {
          path: "profile",
          element: <EmployerProfile />,
          children: [
          { path: "", element: <EmployerDetailInfo /> },
          { path: "bai-viet", element: <EmployerDetailBlog /> },
          { path: "danh-gia", element: <EmployerDetailRate /> },
        ],
        },
        { path: "job/:id", element: <EmployerJobDetail /> },
        { path: "application", element: <EmployerApplications /> },
        { path: "report", element: <EmployerReports /> },
      ],
    },
  ],
};

export default EmployerPrivateRoutes;
