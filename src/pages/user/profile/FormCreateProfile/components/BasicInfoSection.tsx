import React from "react";
import {
  BriefcaseBusiness,
  Clock,
  Mail,
  MapPin,
  Phone,
  User
} from "lucide-react";
import Input from "../../../../../components/ui/Input";
import FormSection from "./FormSection";

interface BasicInfoSectionProps {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  availabilityStatus: string;
  setFullName: (value: string) => void;
  setJobTitle: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setLocation: (value: string) => void;
  setAvailabilityStatus: (value: string) => void;
}

export default function BasicInfoSection({
  fullName,
  jobTitle,
  email,
  phone,
  location,
  availabilityStatus,
  setFullName,
  setJobTitle,
  setEmail,
  setPhone,
  setLocation,
  setAvailabilityStatus
}: BasicInfoSectionProps) {
  return (
    <FormSection
      icon={<User size={20} />}
      title="Thông tin cá nhân"
      description="Thông tin cơ bản của hồ sơ."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Họ và tên"
          placeholder="Nhập họ và tên"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          icon={<User size={18} />}
          required
        />

        <Input
          label="Chức danh"
          placeholder="Ví dụ: Video Editor"
          value={jobTitle}
          onChange={(event) => setJobTitle(event.target.value)}
          icon={<BriefcaseBusiness size={18} />}
          required
        />

        <Input
          label="Email"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          icon={<Mail size={18} />}
          required
        />

        <Input
          label="Số điện thoại"
          type="tel"
          placeholder="Nhập số điện thoại"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          icon={<Phone size={18} />}
        />

        <Input
          label="Địa điểm"
          placeholder="Ví dụ: Việt Nam"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          icon={<MapPin size={18} />}
        />

        <Input
          label="Trạng thái sẵn sàng làm việc"
          placeholder="Ví dụ: Available for work"
          value={availabilityStatus}
          onChange={(event) => setAvailabilityStatus(event.target.value)}
          icon={<Clock size={18} />}
          hint="Có thể để trống nếu chưa xác định."
        />
      </div>
    </FormSection>
  );
}
