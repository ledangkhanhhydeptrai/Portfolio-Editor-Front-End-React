export interface HeaderProps {
  onMenuClick: () => void;
}

export interface PageMeta {
  title: string;
  description: string;
  parent: string;
}

export const pageMeta: Record<string, PageMeta> = {
  "/": {
    title: "Bảng điều khiển",
    description: "Chào mừng bạn đến với bảng điều khiển",
    parent: "Bảng điều khiển"
  },
  "/video": {
    title: "Video",
    description: "Quản lý video trên portfolio",
    parent: "Nội dung"
  },
  "/social-links": {
    title: "Liên kết mạng xã hội",
    description: "Quản lý các liên kết mạng xã hội",
    parent: "Nội dung"
  },
  "/work-styles": {
    title: "Phong cách làm việc",
    description: "Quản lý phong cách làm việc trên portfolio",
    parent: "Danh mục hồ sơ"
  },
  "/directions": {
    title: "Định hướng",
    description: "Quản lý định hướng nghề nghiệp",
    parent: "Danh mục hồ sơ"
  },
  "/skills": {
    title: "Kỹ năng",
    description: "Quản lý kỹ năng chuyên môn",
    parent: "Danh mục hồ sơ"
  },
  "/projects": {
    title: "Dự án",
    description: "Quản lý các dự án trên portfolio",
    parent: "Danh mục hồ sơ"
  },
  "/experiences": {
    title: "Kinh nghiệm",
    description: "Quản lý kinh nghiệm làm việc",
    parent: "Danh mục hồ sơ"
  },
  "/educations": {
    title: "Học vấn",
    description: "Quản lý thông tin học vấn",
    parent: "Danh mục hồ sơ"
  },
  "/profile": {
    title: "Thông tin cá nhân",
    description: "Quản lý thông tin cá nhân",
    parent: "Danh mục hồ sơ"
  },
  "/curriculum": {
    title: "CV",
    description: "Quản lý hồ sơ CV",
    parent: "Danh mục hồ sơ"
  }
};