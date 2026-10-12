import React from "react";
import { FileText } from "lucide-react";
import Input from "../../../../../components/ui/Input";
import Textarea from "../../../../../components/ui/Textarea";
import AvatarUpload from "./AvatarUpload";

interface MediaIntroRowProps {
  avatarUrl: File | null;
  cvUrl: string;
  aboutMe: string;
  setAvatarUrl: (file: File | null) => void;
  setCvUrl: (value: string) => void;
  setAboutMe: (value: string) => void;
}

/** Hàng giữa: ảnh đại diện bên trái, CV + giới thiệu bản thân bên phải. */
export default function MediaIntroRow({
  avatarUrl,
  cvUrl,
  aboutMe,
  setAvatarUrl,
  setCvUrl,
  setAboutMe
}: MediaIntroRowProps) {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[220px_minmax(0,1fr)]">
      <AvatarUpload file={avatarUrl} onChange={setAvatarUrl} />

      <div className="space-y-3">
        <Input
          label="CV URL"
          type="url"
          placeholder="https://drive.google.com/..."
          value={cvUrl}
          onChange={(event) => setCvUrl(event.target.value)}
          icon={<FileText size={18} />}
          required
        />

        <Textarea
          label="Giới thiệu bản thân"
          placeholder="Chia sẻ thông tin về bản thân..."
          value={aboutMe}
          onChange={(event) => setAboutMe(event.target.value)}
          rows={3}
          maxLength={2000}
        />
      </div>
    </div>
  );
}
