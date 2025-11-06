import ProfileOverview from "../pages/JobSeeker/ProfileOverview";
import PrivateRoute from "../components/route/PrivateRoute";
import CVManager from "../pages/JobSeeker/CVManager";
import Settings from "../pages/JobSeeker/Settings";
import JobAlertSignUp from "../pages/JobSeeker/JobAlertSignUp";
import JobInvitations from "../pages/JobSeeker/JobInvitations";
import MyJobs from "../pages/JobSeeker/MyJobs";
import CVProfile from "../pages/JobSeeker/CVProfile";
import LayoutJobSeeker from "../Layout/LayoutJobSeeker";
import AppliedJobs from "../pages/JobSeeker/MyJobs/AppliedJobs";
import SavedJobs from "../pages/JobSeeker/MyJobs/SavedJobs";
import RecentlyViewed from "../pages/JobSeeker/MyJobs/RecentlyViewed";
const PrivateRoutes = {
  element: <PrivateRoute />,
  children: [
    {
      element: <LayoutJobSeeker />,
      children: [
        { path: "tong-quan-ho-so", element: <ProfileOverview /> },
        { path: "ho-so-cv/quan-ly-cv", element: <CVManager /> },
        { path: "ho-so-cv", element: <CVProfile /> },
        { path: "viec-lam-cua-toi", element: <MyJobs />, children: [
          {path: "", element: <SavedJobs />},
          {path: "ung-tuyen", element: <AppliedJobs /> },
          {path: "xem-gan-day", element: <RecentlyViewed /> },
        ] },
        { path: "loi-moi-cong-viec", element: <JobInvitations /> },
        { path: "dang-ky", element: <JobAlertSignUp /> },
        { path: "cai-dat", element: <Settings /> },
      ],
    },
  ],
};
export default PrivateRoutes;
