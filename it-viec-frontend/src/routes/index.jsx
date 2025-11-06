import Error404 from "../pages/Shared/Error404";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import LayoutDefault from "../Layout/LayoutDefault";
import Home from "../pages/Shared/Home";
import Term from "../pages/Shared/Term";
import Policy from "../pages/Shared/Policy";
import Employer from "../pages/Employer/EmployerHome";
import EmployerPrivateRoutes from "./EmployerPrivateRoute";
import EmployerPublicRoutes from "./EmployerPublicRoute";
import LayoutEmployer from "../Layout/LayoutEmployer";
import LayoutCheckToken from "../Layout/LayoutCheckToken";
import JobApplications from "../pages/JobSeeker/JobApplications";
import PrivateRoute from "../components/route/PrivateRoute";
import EmployerDetail from "../pages/Shared/EmployerDetail";
import EmployerDetailInfo from "../pages/Shared/EmployerDetailInfo";
import EmployerDetailBlog from "../pages/Shared/EmployerDetailBlog";
import EmployerDetailRate from "../pages/Shared/EmployerDetailRate";
import JobSearch from "../pages/Shared/JobSearch";
import RouteDecider from "./RouteDecider";
import JobSearchDetail from "../pages/Shared/JobSearchDetail";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      { path: "/", element: <Home /> },
      { path: "terms-conditions-vn", element: <Term /> },
      { path: "quy-dinh-bao-mat", element: <Policy /> },
      {
        path: "viec-lam-it",
        children: [
          {
            path: "",
            element: <JobSearch />,
            children: [{ path: "", element: <JobSearchDetail /> }]
          },
          {
            path: ":param1",
            element: <RouteDecider />,
            children: [{ path: "", element: <JobSearchDetail /> }],
          },
          {
            path: ":param1/:param2",
            element: <RouteDecider />,
            children: [{ path: "", element: <JobSearchDetail /> }],
          },
        ],
      },
      {
        path: "nha-tuyen-dung/:slug",
        element: <EmployerDetail />,
        children: [
          { path: "", element: <EmployerDetailInfo /> },
          { path: "bai-viet", element: <EmployerDetailBlog /> },
          { path: "danh-gia", element: <EmployerDetailRate /> },
        ],
      },
      {
        element: <LayoutCheckToken checkRole="jobSeeker" />,
        children: [PublicRoutes, PrivateRoutes],
      },
    ],
  },
  {
    element: <LayoutCheckToken checkRole="jobSeeker" />,
    children: [
      PublicRoutes,
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "viec-lam-it/:slug/job_applications/new",
            element: <JobApplications />,
          },
        ],
      },
    ],
  },
  {
    path: "employer",
    element: <LayoutEmployer />,
    children: [{ path: "", element: <Employer /> }],
  },
  {
    path: "customer",
    element: <LayoutCheckToken checkRole="employer" />,
    children: [EmployerPublicRoutes, EmployerPrivateRoutes],
  },
  {
    path: "*",
    element: <Error404 />,
  },
];
