import VideoIdPage from "../pages/user/video/VideoIdPage";
import VideoPage from "../pages/user/video/VideoPage";
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
  }
];
