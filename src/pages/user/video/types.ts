export type VideoStatus = "Published" | "Draft";
export type StatusFilter = "All" | VideoStatus;
export type SortKey = "newest" | "oldest" | "views" | "title";
export type ViewMode = "table" | "grid";

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  videoUrl: string;
  duration: string;
  category: string;
  status: VideoStatus;
  createdAt: string;
  views: number;
}