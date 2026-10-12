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

  const [isCreateOpen, setIsCreateOpen] = React.useState(false);

  const [aboutMe, setAboutMe] = React.useState("");
  const [availabilityStatus, setAvailabilityStatus] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState<File | null>(null);
  const [cvUrl, setCvUrl] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [quote, setQuote] = React.useState("");
  const [shortDescription, setShortDescription] = React.useState("");
  const [workDirection, setWorkDirection] = React.useState("");

  const { mutate } = useCreateCurrentUser();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (avatarUrl === null) {
      return;
    }

    mutate(
      {
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
      },
      {
        onSuccess: () => {
          setIsCreateOpen(false);
          void refetch();
        }
      }
    );
  };

  if (isLoading) {
    return <ProfileLoading />;
  }

  if (isError) {
    return <ProfileError onRetry={() => void refetch()} />;
  }

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-950">
      <div className="flex min-h-full flex-col gap-4 p-4 sm:p-5">
        <ProfileHeader
          isFetching={isFetching}
          onRefresh={() => void refetch()}
        />

        {profile ? (
          <ProfileTable profile={profile} />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M5 21a7 7 0 0 1 14 0" />
                <path d="M19 8v6" />
                <path d="M16 11h6" />
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Bạn chưa có Profile
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
              Tạo hồ sơ cá nhân để bổ sung thông tin, giới thiệu bản thân và
              định hướng công việc của bạn.
            </p>

            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <span className="text-lg leading-none">+</span>
              Tạo profile
            </button>
          </div>
        )}

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
