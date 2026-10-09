export interface HeaderProps {
  onMenuClick: () => void;
}

export interface PageMeta {
  title: string;
  description: string;
  parent: string;
}

export const pageMeta: Record<string, PageMeta> = {
  "/video": {
    title: "Video",
    description: "Manage your video content",
    parent: "Dashboard"
  },
  "/videos": {
    title: "Videos",
    description: "Manage your video content",
    parent: "Dashboard"
  },
  "/social-links": {
    title: "Social Links",
    description: "Manage your social media links",
    parent: "Dashboard"
  },
  "/profile": {
    title: "Profile",
    description: "Manage your personal information",
    parent: "Settings"
  },
  "/settings": {
    title: "Settings",
    description: "Manage your application settings",
    parent: "Dashboard"
  }
};