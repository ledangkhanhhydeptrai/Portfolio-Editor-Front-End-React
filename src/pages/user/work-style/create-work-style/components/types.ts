import type React from "react";

export interface CreateWorkStyleModalProps {
  open: boolean;
  displayOrder: number;
  setDisplayOrder: (value: number) => void;
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  isSaving?: boolean;
  error?: string | null;
}

export interface PreviewCardProps {
  title: string;
  description: string;
  displayOrder: number;
}
