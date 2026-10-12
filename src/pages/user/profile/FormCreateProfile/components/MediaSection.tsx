import React from "react";
import { FileText, Image } from "lucide-react";
import Input from "../../../../../components/ui/Input";
import FormSection from "./FormSection";
import AvatarUpload from "./AvatarUpload";


interface MediaSectionProps {
  avatarUrl: File | null;
  cvUrl: string;
  setAvatarUrl: (file: File | null) => void;
  setCvUrl: (value: string) => void;
}

export default function MediaSection({
  avatarUrl,
  cvUrl,
  setAvatarUrl,
  setCvUrl
}: MediaSectionProps) {
  return (
    <FormSection
      icon={<Image size={20} />}
      title="Hình ảnh và CV"
      description="Ảnh đại diện và liên kết CV."
    >
      <div className="space-y-5">
        <AvatarUpload file={avatarUrl} onChange={setAvatarUrl} />

        <Input
          label="CV URL"
          type="url"
          placeholder="https://drive.google.com/..."
          value={cvUrl}
          onChange={(event) => setCvUrl(event.target.value)}
          icon={<FileText size={18} />}
          required
          hint="Nhập đường dẫn CV có thể truy cập được."
        />
      </div>
    </FormSection>
  );
}
