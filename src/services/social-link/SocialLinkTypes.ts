export interface SocialLinkProps {
  id: string;
  displayOrder: number;
  iconUrl: string;
  platform: string;
  url: string;
}
export interface CreateSocialLink {
  platform: string;
  displayOrder: number;
  iconUrl: File | null;
  url: string;
}
export interface CreateSocialLinkProps {
  platform: string;
  setPlatform: (v: string) => void;
  displayOrder: number;
  setDisplayOrder: (v: number) => void;
  iconUrl: File | null;
  setIconUrl: (v: File | null) => void;
  url: string;
  setUrl: (v: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  open: boolean;
  onClose: () => void;
  isSaving?: boolean;
  error?: string | null;
}
