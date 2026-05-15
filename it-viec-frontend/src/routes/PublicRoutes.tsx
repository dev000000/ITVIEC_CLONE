import type { RouteObject } from 'react-router-dom';
import PublicRoute from '@/components/route/PublicRoute';
import Login from '@/pages/JobSeeker/Login';
import Register from '@/pages/JobSeeker/Register';

/**
 * Public routes for Job Seeker (unauthenticated users)
 */
const PublicRoutes: RouteObject = {
  element: <PublicRoute />,
  children: [
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
  ],
};

export default PublicRoutes;
