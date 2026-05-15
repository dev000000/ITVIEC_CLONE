import type { RouteObject } from 'react-router-dom';
import EmployerPublicRoute from '@/components/route/EmployerPublicRoute';
import EmployerLogin from '@/pages/Employer/EmployerLogin';
import EmployerRegister from '@/pages/Employer/EmployerRegister';

/**
 * Public routes for Employer (unauthenticated users)
 */
const EmployerPublicRoutes: RouteObject = {
  element: <EmployerPublicRoute />,
  children: [
    { path: 'login', element: <EmployerLogin /> },
    { path: 'register', element: <EmployerRegister /> },
  ],
};

export default EmployerPublicRoutes;