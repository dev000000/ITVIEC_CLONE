import { Navigate, type RouteObject } from 'react-router-dom';
import Error404 from '@/pages/Shared/Error404';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import LayoutDefault from '@/layout/LayoutDefault';
import Home from '@/pages/Shared/Home';
import Term from '@/pages/Shared/Term';
import Policy from '@/pages/Shared/Policy';
import Employer from '@/pages/Employer/EmployerHome';
import EmployerPrivateRoutes from './EmployerPrivateRoute';
import EmployerPublicRoutes from './EmployerPublicRoute';
import AdminPrivateRoutes from './AdminPrivateRoute';
import AdminPublicRoutes from './AdminPublicRoute';
import LayoutEmployer from '@/layout/LayoutEmployer';
import LayoutCheckToken from '@/layout/LayoutCheckToken';
import JobApplications from '@/pages/JobSeeker/JobApplications';
import PrivateRoute from '@/components/route/PrivateRoute';
import EmployerDetail from '@/pages/Shared/EmployerDetail';
import EmployerDetailInfo from '@/pages/Shared/EmployerDetailInfo';
import EmployerDetailBlog from '@/pages/Shared/EmployerDetailBlog';
import EmployerDetailRate from '@/pages/Shared/EmployerDetailRate';
import JobSearch from '@/pages/Shared/JobSearch';
import RouteDecider from './RouteDecider';
import JobSearchDetail from '@/pages/Shared/JobSearchDetail';
import { ROLE } from '@/types/common.types';

/**
 * Main application routes configuration for React Router v6
 */
export const routes: RouteObject[] = [
  {
    path: '/', // Đã check
    element: <LayoutDefault />, 
    children: [
      { path: '/', element: <Home /> }, // Đã check
      { path: 'terms-conditions-vn', element: <Term /> }, // Đã check
      { path: 'quy-dinh-bao-mat', element: <Policy /> }, // Đã check
      {
        path: 'viec-lam-it', // Đã check
        children: [
          {
            path: '', // Đã check
            element: <JobSearch />, 
            children: [{ path: '', element: <JobSearchDetail /> }],
          },
          {
            path: ':param1', // Đã check
            element: <RouteDecider />,
            children: [{ path: '', element: <JobSearchDetail /> }],
          },
          {
            path: ':param1/:param2', // Đã check
            element: <RouteDecider />,
            children: [{ path: '', element: <JobSearchDetail /> }],
          },
        ],
      },
      {
        path: 'nha-tuyen-dung/:slug', // Đã check
        element: <EmployerDetail />, // Đã check
        children: [
          { path: '', element: <EmployerDetailInfo /> }, // Đã check
          { path: 'bai-viet', element: <EmployerDetailBlog /> }, // Đã check
          { path: 'danh-gia', element: <EmployerDetailRate /> }, // Đã check
        ],
      },
      // Public routes: không cần token check
      PublicRoutes,
      // Private routes: cần xác thực SEEKER
      {
        element: <LayoutCheckToken checkRole={ROLE.SEEKER} />,
        children: [PrivateRoutes],
      },
    ],
  },
  {
    element: <LayoutCheckToken checkRole={ROLE.SEEKER} />, 
    children: [
      {
        element: <PrivateRoute />, 
        children: [
          {
            path: 'viec-lam-it/:slug/job_applications/new', // Đã check
            element: <JobApplications />,
          },
        ],
      },
    ],
  },
  {
    path: 'employer',
    element: <LayoutEmployer />,
    children: [{ path: '', element: <Employer /> }],
  },
  {
    path: 'customer',
    children: [
      // Public routes: không cần token check (login, register)
      EmployerPublicRoutes,
      // Private routes: cần xác thực EMPLOYER
      {
        element: <LayoutCheckToken checkRole={ROLE.EMPLOYER} />,
        children: [EmployerPrivateRoutes],
      },
    ],
  },
  {
    path: 'admin',
    children: [
      { path: '', element: <Navigate to="login" replace /> },
      AdminPublicRoutes,
      {
        element: <LayoutCheckToken checkRole={ROLE.ADMIN} />,
        children: [AdminPrivateRoutes],
      },
    ],
  },
  {
    path: '*',
    element: <Error404 />,
  },
];
