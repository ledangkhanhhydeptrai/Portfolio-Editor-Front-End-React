import { SkillProps } from "../skill/SkillTypes";

export interface DirectionProps {
  id: string;
  code: string;
  icon: string;
  title: string;
  description: string;
  displayOrder: number;
  skills: SkillProps[];
}
export interface CreateDirectionProps {
  code: string;
  icon: string;
  title: string;
  description: string;
  displayOrder: number;
  skills: string[];
}
export interface FormCreateDirectionProps {
  code: string;
  setCode: (value: string) => void;

  icon: string;
  setIcon: (value: string) => void;

  title: string;
  setTitle: (value: string) => void;

  description: string;
  setDescription: (value: string) => void;

  displayOrder: number;
  setDisplayOrder: (value: number) => void;

  skills: string[];
  setSkills: (value: string[]) => void;
  SkillData: SkillProps[];
}
export interface FormUpdateDirectionProps {
  id: string;
  SkillData: SkillProps[];
  title: string;
  setTitle: (value: string) => void;
  code: string;
  setCode: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  icon: string;
  setIcon: (value: string) => void;
  displayOrder: number;
  setDisplayOrder: (value: number) => void;
  skills: string[];
  setSkills: (value: string[]) => void;
}
export interface UpdateDirectionProps {
  id:string;
  code: string;
  icon: string;
  title: string;
  description: string;
  displayOrder: number;
  skills: string[];
}