import VideoIdPage from "../pages/user/video/VideoIdPage";
import VideoPage from "../pages/user/video/VideoPage";

export const privateRoutes = [
  {
    path: "/video",
    element: <VideoPage />
  },
  {
    path: "/video/:id",
    element: <VideoIdPage />
  }
];
