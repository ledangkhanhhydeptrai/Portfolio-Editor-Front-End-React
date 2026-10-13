export interface ExperienceProps {
  id: string;
  companyName: string;
  description: string;
  displayOrder: number;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  position: string;
}
export interface CreateExperienceProps {
  companyName: string;
  description: string;
  displayOrder: number;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  position: string;
}
export interface FormCreateExperienceProps {
  companyName: string;
  setCompanyName: (value: string) => void;

  description: string;
  setDescription: (value: string) => void;

  displayOrder: number;
  setDisplayOrder: (value: number) => void;

  startDate: string;
  setStartDate: (value: string) => void;

  endDate: string;
  setEndDate: (value: string) => void;

  isCurrent: boolean;
  setIsCurrent: (value: boolean) => void;

  position: string;
  setPosition: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface FormUpdateExperienceProps {
  companyName: string;
  setCompanyName: (value: string) => void;

  description: string;
  setDescription: (value: string) => void;

  displayOrder: number;
  setDisplayOrder: (value: number) => void;

  startDate: string;
  setStartDate: (value: string) => void;

  endDate: string;
  setEndDate: (value: string) => void;

  isCurrent: boolean;
  setIsCurrent: (value: boolean) => void;

  position: string;
  setPosition: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  open: boolean;
  experience: ExperienceProps;
  onClose: () => void;
}
