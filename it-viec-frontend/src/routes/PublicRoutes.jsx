import PublicRoute from "../components/route/PublicRoute";
import LayoutDefault from "../Layout/LayoutDefault";
import Home from "../pages/Shared/Home";
import Login from "../pages/JobSeeker/Login";
import Register from "../pages/JobSeeker/Register";

const PublicRoutes = {
  element: <PublicRoute />,
  children: [
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
  ],
};
export default PublicRoutes;
