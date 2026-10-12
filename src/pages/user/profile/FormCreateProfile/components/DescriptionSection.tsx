import React from "react";
import { FileText } from "lucide-react";
import Textarea from "../../../../../components/ui/Textarea";
import FormSection from "./FormSection";

interface DescriptionSectionProps {
  aboutMe: string;
  shortDescription: string;
  workDirection: string;
  quote: string;
  setAboutMe: (value: string) => void;
  setShortDescription: (value: string) => void;
  setWorkDirection: (value: string) => void;
  setQuote: (value: string) => void;
}

export default function DescriptionSection({
  aboutMe,
  shortDescription,
  workDirection,
  quote,
  setAboutMe,
  setShortDescription,
  setWorkDirection,
  setQuote
}: DescriptionSectionProps) {
  return (
    <FormSection
      icon={<FileText size={20} />}
      title="Nội dung hồ sơ"
      description="Giới thiệu bản thân và định hướng công việc."
    >
      <div className="space-y-4">
        <Textarea
          label="Giới thiệu bản thân"
          placeholder="Chia sẻ thông tin về bản thân..."
          value={aboutMe}
          onChange={(event) => setAboutMe(event.target.value)}
          rows={5}
          maxLength={2000}
        />

        <Textarea
          label="Mô tả ngắn"
          placeholder="Viết một đoạn mô tả ngắn về bản thân..."
          value={shortDescription}
          onChange={(event) => setShortDescription(event.target.value)}
          rows={3}
          maxLength={500}
        />

        <Textarea
          label="Định hướng công việc"
          placeholder="Mô tả công việc hoặc lĩnh vực bạn hướng đến..."
          value={workDirection}
          onChange={(event) => setWorkDirection(event.target.value)}
          rows={3}
          maxLength={1000}
        />

        <Textarea
          label="Câu trích dẫn"
          placeholder="Nhập câu trích dẫn của bạn..."
          value={quote}
          onChange={(event) => setQuote(event.target.value)}
          rows={2}
          maxLength={500}
        />
      </div>
    </FormSection>
  );
}
