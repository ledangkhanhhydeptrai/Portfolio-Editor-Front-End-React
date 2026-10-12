import ProfilePage from "../pages/user/profile/ProfilePage";
import ProfileTablePage from "../pages/user/profileTable/ProfilePage";
import SocialLinkById from "../pages/user/social-link/SocialLinkById";
import SocialLinkPage from "../pages/user/social-link/SocialLinkPage";
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
  },
  {
    path: "/social-links",
    element: <SocialLinkPage />
  },
  {
    path: "/social-links/:id",
    element: <SocialLinkById />
  },
  {
    path: "/profile/table",
    element: <ProfileTablePage />
  }
];
