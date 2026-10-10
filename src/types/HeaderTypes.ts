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
    description: "Quản lý nội dung video",
    parent: "Bảng điều khiển",
  },
  "/videos": {
    title: "Video",
    description: "Quản lý nội dung video",
    parent: "Bảng điều khiển",
  },
  "/social-links": {
    title: "Liên kết mạng xã hội",
    description: "Quản lý các liên kết mạng xã hội",
    parent: "Bảng điều khiển",
  },
  "/profile": {
    title: "Thông tin cá nhân",
    description: "Quản lý thông tin cá nhân của bạn",
    parent: "Cài đặt",
  },
  "/settings": {
    title: "Cài đặt",
    description: "Quản lý cài đặt ứng dụng",
    parent: "Bảng điều khiển",
  },
};
