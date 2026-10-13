import { SkillEnum } from "../skill/SkillTypes";

export interface ProjectProps {
  id: string;
  category: SkillEnum;
  demoUrl: string;
  description: string;
  displayOrder: number;
  featured: boolean;
  githubUrl: string;
  thumbnailUrl: string;
  title: string;
}
export interface CreateProjectProps {
  category: SkillEnum;
  demoUrl: string;
  description: string;
  displayOrder: number;
  featured: boolean;
  githubUrl: string;
  thumbnailUrl: File | null;
  title: string;
}
export interface FormCreateProject {
  category: SkillEnum;
  setCategory: (value: SkillEnum) => void;

  demoUrl: string;
  setDemoUrl: (value: string) => void;

  description: string;
  setDescription: (value: string) => void;

  displayOrder: number;
  setDisplayOrder: (value: number) => void;

  featured: boolean;
  setFeatured: (value: boolean) => void;

  githubUrl: string;
  setGithubUrl: (value: string) => void;

  thumbnailUrl: File | null;
  setThumbnailUrl: (value: File | null) => void;

  title: string;
  setTitle: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
