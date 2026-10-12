import React from "react";
import Textarea from "../../../../../components/ui/Textarea";

interface DescriptionFieldsProps {
  aboutMe: string;
  shortDescription: string;
  workDirection: string;
  quote: string;
  setAboutMe: (value: string) => void;
  setShortDescription: (value: string) => void;
  setWorkDirection: (value: string) => void;
  setQuote: (value: string) => void;
}

/** 4 ô văn bản xếp trên một hàng để tiết kiệm chiều cao. */
export default function DescriptionFields({
  aboutMe,
  shortDescription,
  workDirection,
  quote,
  setAboutMe,
  setShortDescription,
  setWorkDirection,
  setQuote
}: DescriptionFieldsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Textarea
        label="Giới thiệu bản thân"
        placeholder="Chia sẻ về bản thân..."
        value={aboutMe}
        onChange={(event) => setAboutMe(event.target.value)}
        rows={3}
        maxLength={2000}
      />
      <Textarea
        label="Mô tả ngắn"
        placeholder="Mô tả ngắn về bản thân..."
        value={shortDescription}
        onChange={(event) => setShortDescription(event.target.value)}
        rows={3}
        maxLength={500}
      />
      <Textarea
        label="Định hướng công việc"
        placeholder="Lĩnh vực bạn hướng đến..."
        value={workDirection}
        onChange={(event) => setWorkDirection(event.target.value)}
        rows={3}
        maxLength={1000}
      />
      <Textarea
        label="Câu trích dẫn"
        placeholder="Câu trích dẫn của bạn..."
        value={quote}
        onChange={(event) => setQuote(event.target.value)}
        rows={3}
        maxLength={500}
      />
    </div>
  );
}
