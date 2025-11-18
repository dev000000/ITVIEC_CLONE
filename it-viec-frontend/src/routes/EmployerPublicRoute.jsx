import EmployerPublicRoute from "../components/route/EmployerPublicRoute";
import EmployerLogin from "../pages/Employer/EmployerLogin";
import EmployerRegister from "../pages/Employer/EmployerRegister";


const EmployerPublicRoutes = {
  element: <EmployerPublicRoute />,
  children: [
    {path: "login", element : <EmployerLogin/>},
    {path: "register", element : <EmployerRegister/>},
  ],
};

export default EmployerPublicRoutes;