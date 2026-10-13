export type SkillEnum = "VIDEO_EDITING" | "DEVELOPMENT" | "DRIVING";

export interface SkillProps {
  category: SkillEnum;
  displayOrder: number;
  iconUrl: string;
  id: string;
  name: string;
}
export interface CreateSkillProps {
  category: SkillEnum;
  displayOrder: number;
  name: string;
  iconUrl: File | null;
}
export interface FormCreateSkillProps {
  category: SkillEnum;
  setCategory: (value: SkillEnum) => void;

  displayOrder: number;
  setDisplayOrder: (value: number) => void;

  name: string;
  setName: (value: string) => void;

  iconUrl: File | null;
  setIconUrl: (value: File | null) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export interface FormUpdateSkillProps {
  skill: SkillProps;
  isLoading: boolean;
  category: SkillEnum;
  onCancel: () => void;
  setCategory: (value: SkillEnum) => void;

  displayOrder: number;
  setDisplayOrder: (value: number) => void;

  name: string;
  setName: (value: string) => void;

  iconUrl: File | null;
  setIconUrl: (value: File | null) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
