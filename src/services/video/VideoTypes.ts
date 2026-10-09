export enum VideoEnum {
  PRODUCT_VIDEO = "PRODUCT_VIDEO",
  SHORT_FORM = "SHORT_FORM",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  STORYTELLING = "STORYTELLING",
  COMMERCIAL = "COMMERCIAL",
  PROMOTIONAL = "PROMOTIONAL",
  OTHER = "OTHER",
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
