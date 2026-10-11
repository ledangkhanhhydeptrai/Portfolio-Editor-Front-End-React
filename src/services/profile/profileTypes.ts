export interface UserProfile {
  aboutMe: string;
  availabilityStatus: string | null;
  avatarUrl: string;
  cvUrl: string;
  email: string;
  fullName: string;
  id: string;
  jobTitle: string;
  location: string;
  phone: string;
  quote: string | null;
  shortDescription: string;
  workDirection: string | null;
}
export interface CreateUserProfile {
  aboutMe: string;
  availabilityStatus: string;
  avatarUrl: File | null;
  cvUrl: string;
  email: string;
  fullName: string;
  jobTitle: string;
  location: string;
  phone: string;
  quote: string;
  shortDescription: string;
  workDirection: string;
}
export interface CreateUserProps {
  aboutMe: string;
  setAboutMe: (value: string) => void;

  availabilityStatus: string;
  setAvailabilityStatus: (value: string) => void;

  avatarUrl: File | null;
  setAvatarUrl: (value: File | null) => void;

  cvUrl: string;
  setCvUrl: (value: string) => void;

  email: string;
  setEmail: (value: string) => void;

  fullName: string;
  setFullName: (value: string) => void;

  jobTitle: string;
  setJobTitle: (value: string) => void;

  location: string;
  setLocation: (value: string) => void;

  phone: string;
  setPhone: (value: string) => void;

  quote: string;
  setQuote: (value: string) => void;

  shortDescription: string;
  setShortDescription: (value: string) => void;

  workDirection: string;
  setWorkDirection: (value: string) => void;
}
