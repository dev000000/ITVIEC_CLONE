import type { RouteObject } from 'react-router-dom';
import EmployerPublicRoute from '@/components/route/EmployerPublicRoute';
import EmployerLogin from '@/pages/Employer/EmployerLogin';
import EmployerRegister from '@/pages/Employer/EmployerRegister';
import EmployerRegisterSuccess from '@/pages/Employer/EmployerRegisterSuccess';
import EmployerActivate from '@/pages/Employer/EmployerActivate';

/**
 * Public routes for Employer (unauthenticated users)
 */
const EmployerPublicRoutes: RouteObject = {
  element: <EmployerPublicRoute />,
  children: [
    { path: 'login', element: <EmployerLogin /> },
    { path: 'register', element: <EmployerRegister /> },
    { path: 'register-success', element: <EmployerRegisterSuccess /> },
    { path: 'activate', element: <EmployerActivate /> },
  ],
};

export default EmployerPublicRoutes;