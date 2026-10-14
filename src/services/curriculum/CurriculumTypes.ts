export interface CurriculumTypes {
  id: string;
  title: string;
  fileUrl: string;
  displayOrder: number;
  isPrimary: boolean;
}
export interface CreateCurriculumProps {
  title: string;
  fileUrl: File | null;
  displayOrder: number;
  isPrimary: boolean;
}
export interface FormCreateCurriculumProps {
  title: string;
  setTitle: (value: string) => void;

  fileUrl: File | null;
  setFileUrl: (value: File | null) => void;

  displayOrder: number;
  setDisplayOrder: (value: number) => void;

  isPrimary: boolean;
  setIsPrimary: (value: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  onClose: () => void;
}
export interface UpdateCurriculumProps {
  title: string;
  fileUrl: File | null;
  displayOrder: number;
  isPrimary: boolean;
}
export interface FormUpdateCurriculumProps {
  
  title: string;
  setTitle: (value: string) => void;

  fileUrl: File | null;
  setFileUrl: (value: File | null) => void;

  displayOrder: number;
  setDisplayOrder: (value: number) => void;

  isPrimary: boolean;
  setIsPrimary: (value: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  onClose: () => void;
  curriculum: CurriculumTypes;
}
