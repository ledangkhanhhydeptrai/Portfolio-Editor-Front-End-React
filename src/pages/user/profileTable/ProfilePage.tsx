import React from "react";
import {
  useCreateCurrentUser,
  useCurrentUser
} from "../../../hooks/useCurrentUser";
import {
  ProfileError,
  ProfileHeader,
  ProfileLoading,
  ProfileTable
} from "./components";
import Modal from "../../../components/ui/Modal";
import FormCreateProfile from "../profile/FormCreateProfile/FormCreateProfile";

const ProfileTablePage: React.FC = () => {
  const { data, isLoading, isError, refetch, isFetching } = useCurrentUser();

  const profile = data && data.data ? data.data : null;

  const [isCreateOpen, setIsCreateOpen] = React.useState<boolean>(false);

  const [aboutMe, setAboutMe] = React.useState<string>("");
  const [availabilityStatus, setAvailabilityStatus] =
    React.useState<string>("");
  const [avatarUrl, setAvatarUrl] = React.useState<File | null>(null);
  const [cvUrl, setCvUrl] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [fullName, setFullName] = React.useState<string>("");
  const [jobTitle, setJobTitle] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [quote, setQuote] = React.useState<string>("");
  const [shortDescription, setShortDescription] = React.useState<string>("");
  const [workDirection, setWorkDirection] = React.useState<string>("");
  const { mutate } = useCreateCurrentUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (avatarUrl === null) {
      return;
    }

    mutate({
      aboutMe,
      availabilityStatus,
      avatarUrl,
      cvUrl,
      email,
      fullName,
      jobTitle,
      location,
      phone,
      quote,
      shortDescription,
      workDirection
    });
  };

  if (isLoading) return <ProfileLoading />;

  if (isError || !profile) {
    return <ProfileError onRetry={() => void refetch()} />;
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-950">
      <div className="flex h-full flex-col gap-3 p-4 sm:p-5">
        <ProfileHeader
          isFetching={isFetching}
          onRefresh={() => void refetch()}
        />

        <ProfileTable profile={profile} />

        <Modal
          open={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title="Tạo profile"
          size="2xl"
        >
          <FormCreateProfile
            aboutMe={aboutMe}
            setAboutMe={setAboutMe}
            availabilityStatus={availabilityStatus}
            setAvailabilityStatus={setAvailabilityStatus}
            avatarUrl={avatarUrl}
            setAvatarUrl={setAvatarUrl}
            cvUrl={cvUrl}
            setCvUrl={setCvUrl}
            email={email}
            setEmail={setEmail}
            fullName={fullName}
            setFullName={setFullName}
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            location={location}
            setLocation={setLocation}
            phone={phone}
            setPhone={setPhone}
            quote={quote}
            setQuote={setQuote}
            shortDescription={shortDescription}
            setShortDescription={setShortDescription}
            workDirection={workDirection}
            setWorkDirection={setWorkDirection}
            onSubmit={handleSubmit}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ProfileTablePage;
