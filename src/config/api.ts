const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export const API_CONFIG = {
  BASE_URL: API_URL.replace(/\/$/, ""),

  ENDPOINTS: {
    USER: {
      PROFILE: "/user/profile",
      PROJECTS: "/user/project",
      PROJECTS_USER_ID: (id: string) => `/user/project/${id}`,
      SKILLS: "/user/skill",
      SKILLS_USER_BY_ID: (id: string) => `/user/skill/${id}`,
      EXPERIENCES: "/user/experience",
      EXPERIENCES_USER_ID: (id: string) => `/user/experience/${id}`,
      EDUCATIONS: "/user/education",
      EDUCATIONS_USER_ID: (id: string) => `/user/education/${id}`,
      SOCIAL_LINKS: "/user/social-link",
      SOCIAL_LINKS_USER_BY_ID: (id: string) => `/user/social-link/${id}`,
      VIDEO_PROJECT: "/user/video",
      VIDEO_PROJECT_USER_BY_ID: (id: string) => `/user/video/${id}`,
      USERPROFILE: "/user/profile",
      CURRICULUM_USER: "/user/CV",
      CURRICULUM_USER_ID: (id: string) => `/user/CV/${id}`,
      WORK_STYLES_USER: "/user/work-style",
      WORK_STYLES_USER_ID: (id: string) => `/user/work-style/${id}`,
      DIRECTION_USER: "/user/direction",
      DIRECTION_USER_ID: (id: string) => `/user/direction/${id}`
    },

    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    CHANGE_PASSWORD: "/auth/change-password"
  }
} as const;

console.log("API_CONFIG.BASE_URL =", API_CONFIG.BASE_URL);
