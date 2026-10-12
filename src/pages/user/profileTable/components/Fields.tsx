import React from "react";
import {
  AlignLeft,
  BriefcaseBusiness,
  CircleCheck,
  FileText,
  Hash,
  Image,
  Mail,
  MapPin,
  Phone,
  Quote,
  UserRound,
} from "lucide-react";

export type FieldKind = "text" | "copy" | "link" | "image";

export interface FieldConfig {
  /** Tên thuộc tính trong object profile trả về từ API. */
  key: string;
  label: string;
  icon: React.ReactNode;
  kind?: FieldKind;
}

/** Thêm / bớt / đổi thứ tự dòng của bảng chỉ cần sửa mảng này. */
export const PROFILE_FIELDS: FieldConfig[] = [
  { key: "id", label: "ID", icon: <Hash size={16} />, kind: "copy" },
  { key: "fullName", label: "Họ và tên", icon: <UserRound size={16} /> },
  { key: "jobTitle", label: "Chức danh", icon: <BriefcaseBusiness size={16} /> },
  { key: "email", label: "Email", icon: <Mail size={16} />, kind: "copy" },
  { key: "phone", label: "Số điện thoại", icon: <Phone size={16} />, kind: "copy" },
  { key: "location", label: "Địa điểm", icon: <MapPin size={16} /> },
  { key: "aboutMe", label: "Giới thiệu", icon: <AlignLeft size={16} /> },
  { key: "shortDescription", label: "Mô tả ngắn", icon: <AlignLeft size={16} /> },
  { key: "workDirection", label: "Định hướng công việc", icon: <BriefcaseBusiness size={16} /> },
  { key: "availabilityStatus", label: "Trạng thái sẵn sàng", icon: <CircleCheck size={16} /> },
  { key: "quote", label: "Trích dẫn", icon: <Quote size={16} /> },
  { key: "avatarUrl", label: "Ảnh đại diện", icon: <Image size={16} />, kind: "image" },
  { key: "cvUrl", label: "CV", icon: <FileText size={16} />, kind: "link" },
];