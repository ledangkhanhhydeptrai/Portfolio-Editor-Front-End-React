import ExperienceIdPage from "../pages/user/experience/ExperienceIdPage";
import ExperiencePage from "../pages/user/experience/ExperiencePage";
import ProfilePage from "../pages/user/profile/ProfilePage";
import ProfileTablePage from "../pages/user/profileTable/ProfilePage";
import ProjectIdPage from "../pages/user/project/ProjectIdPage";
import ProjectPage from "../pages/user/project/ProjectPage";
import SkillIdPage from "../pages/user/skill/SkillIdPage";
import SkillPage from "../pages/user/skill/SkillPage";
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
  },
  {
    path: "/skills",
    element: <SkillPage />
  },
  {
    path: "/skills/:id",
    element: <SkillIdPage />
  },
  {
    path: "/projects",
    element: <ProjectPage />
  },
  {
    path: "/projects/:id",
    element: <ProjectIdPage />
  },
  {
    path: "/experiences",
    element: <ExperiencePage />
  },
  {
    path: "/experiences/:id",
    element: <ExperienceIdPage />
  }
];
