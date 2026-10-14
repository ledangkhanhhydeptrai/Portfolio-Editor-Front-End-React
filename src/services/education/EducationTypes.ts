export interface EducationProps {
  id: string;
  degree: string;
  description: string;
  displayOrder: number;
  endYear: number;
  major: string;
  schoolName: string;
  startYear: number;
}

export interface EducationStatsProps {
  totalEducation: number;
  completedEducation: number;
  studyingEducation: number;
}

export interface EducationHeaderProps {
  isFetching: boolean;
  onRefresh: () => void;
}

export interface EducationSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export interface EducationTableProps {
  items: EducationProps[];
  currentYear: number;
  onEdit: (education: EducationProps) => void;
  onDelete: (education: EducationProps) => void;
}

export interface EducationCardProps {
  education: EducationProps;
  currentYear: number;
  onEdit: (education: EducationProps) => void;
}

export interface EducationContentStateProps {
  type: "loading" | "error" | "empty";
  error: unknown;
  searchTerm: string;
  onRetry: () => void;
}
export interface CreateEducationProps {
  degree: string;
  description: string;
  displayOrder: number;
  endYear: number;
  major: string;
  schoolName: string;
  startYear: number;
}
export interface FormCreateEducationProps {
  degree: string;
  setDegree: (value: string) => void;

  description: string;
  setDescription: (value: string) => void;

  displayOrder: number;
  setDisplayOrder: (value: number) => void;

  endYear: number;
  setEndYear: (value: number) => void;

  major: string;
  setMajor: (value: string) => void;

  schoolName: string;
  setSchoolName: (value: string) => void;

  startYear: number;
  setStartYear: (value: number) => void;

  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
export interface FormUpdateEducationProps {
  degree: string;
  setDegree: (value: string) => void;

  description: string;
  setDescription: (value: string) => void;

  displayOrder: number;
  setDisplayOrder: (value: number) => void;

  endYear: number;
  setEndYear: (value: number) => void;

  major: string;
  setMajor: (value: string) => void;

  schoolName: string;
  setSchoolName: (value: string) => void;

  startYear: number;
  setStartYear: (value: number) => void;

  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  education: EducationProps | null;
}
