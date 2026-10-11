import ProfilePage from "../pages/user/profile/ProfilePage";
import VideoIdPage from "../pages/user/video/VideoIdPage";
import VideoPage from "../pages/user/video/VideoPage";
import WorkStyleByIdPage from "../pages/user/work-style/WorkStyleByIdPage";
import WorkStylePage from "../pages/user/work-style/WorkStylePage";

export const privateRoutes = [
  {
    path: "/video",
    element: <VideoPage />
  },
  {
    path: "/video/:id",
    element: <VideoIdPage />
  },
  {
    path: "/work-styles",
    element: <WorkStylePage />
  },
  {
    path: "/work-styles/:id",
    element: <WorkStyleByIdPage />
  },
  {
    path: "/profile",
    element: <ProfilePage />
  }
];
