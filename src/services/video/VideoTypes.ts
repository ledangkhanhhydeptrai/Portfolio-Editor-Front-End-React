export enum VideoEnum {
  PRODUCT_VIDEO = "PRODUCT_VIDEO",
  SHORT_FORM = "SHORT_FORM",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  STORYTELLING = "STORYTELLING",
  COMMERCIAL = "COMMERCIAL",
  PROMOTIONAL = "PROMOTIONAL",
  OTHER = "OTHER"
}
export interface VideoProps {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: VideoEnum;
  duration: string;
  year: number;
  displayOrder: number;
}
export interface CreateVideo {
  title: string;
  description: string;
  category: VideoEnum;
  year: number;
  displayOrder: number;
  videoFile: File | null;
  thumbnailFile: File | null;
}
export interface UpdateVideo {
  title: string;
  description: string;
  category: VideoEnum;
  year: number;
  displayOrder: number;
}
