import React from "react";

import type { CreateUserProps } from "../../../../services/profile/profileTypes";
import {
  AvatarUpload,
  BasicInfoFields,
  DescriptionFields,
  FormActions,
} from "./components";

export default function FormCreateProfile({
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
  workDirection,
  setAboutMe,
  setAvailabilityStatus,
  setAvatarUrl,
  setCvUrl,
  setEmail,
  setFullName,
  setJobTitle,
  setLocation,
  setPhone,
  setQuote,
  setShortDescription,
  setWorkDirection,
  onSubmit,
}: CreateUserProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  const handleReset = () => {
    setAboutMe("");
    setAvailabilityStatus("");
    setAvatarUrl(null);
    setCvUrl("");
    setEmail("");
    setFullName("");
    setJobTitle("");
    setLocation("");
    setPhone("");
    setQuote("");
    setShortDescription("");
    setWorkDirection("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Hàng trên: ảnh đại diện bên trái, thông tin + CV bên phải */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[170px_minmax(0,1fr)]">
        <AvatarUpload file={avatarUrl} onChange={setAvatarUrl} />

        <BasicInfoFields
          fullName={fullName}
          jobTitle={jobTitle}
          email={email}
          phone={phone}
          location={location}
          availabilityStatus={availabilityStatus}
          cvUrl={cvUrl}
          setFullName={setFullName}
          setJobTitle={setJobTitle}
          setEmail={setEmail}
          setPhone={setPhone}
          setLocation={setLocation}
          setAvailabilityStatus={setAvailabilityStatus}
          setCvUrl={setCvUrl}
        />
      </div>

      {/* Hàng giữa: 4 ô văn bản */}
      <DescriptionFields
        aboutMe={aboutMe}
        shortDescription={shortDescription}
        workDirection={workDirection}
        quote={quote}
        setAboutMe={setAboutMe}
        setShortDescription={setShortDescription}
        setWorkDirection={setWorkDirection}
        setQuote={setQuote}
      />

      <FormActions onReset={handleReset} />
    </form>
  );
}