import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  UserRound,
  Globe,
  BadgeCheck,
  CircleAlert,
  CircleCheck
} from "lucide-react";

import {
  useUpdateCurrentUser,
  useCurrentUser
} from "../../../../hooks/useCurrentUser";

import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import Textarea from "../../../../components/ui/Textarea";
import { UpdateProfileProps } from "../../../../services/profile/profileTypes";

interface UpdateFormProfileProps {
  onClose: () => void;
}

const AVAILABILITY_OPTIONS = [
  { value: "Available", label: "Đang tìm việc", dot: "bg-green-500" },
  { value: "Open to work", label: "Sẵn sàng nhận việc", dot: "bg-accent" },
  { value: "Freelance", label: "Nhận dự án freelance", dot: "bg-amber-500" },
  { value: "Unavailable", label: "Chưa sẵn sàng", dot: "bg-muted" }
];

// Lấy chữ cái đầu của 2 từ cuối trong tên (phù hợp tên Việt Nam)
function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const picked = words.length === 1 ? [words[0]] : words.slice(-2);
  return picked
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function UpdateFormProfile({ onClose }: UpdateFormProfileProps) {
  const currentUserQuery = useCurrentUser();
  const mutation = useUpdateCurrentUser();
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [workDirection, setWorkDirection] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [quote, setQuote] = useState("");

  useEffect(() => {
    if (!currentUserQuery.data) {
      return;
    }
    const user = currentUserQuery.data.data;

    if (!user) {
      return;
    }

    setFullName(user.fullName ?? "");
    setJobTitle(user.jobTitle ?? "");
    setShortDescription(user.shortDescription ?? "");
    setAboutMe(user.aboutMe ?? "");
    setEmail(user.email ?? "");
    setPhone(user.phone ?? "");
    setLocation(user.location ?? "");
    setWorkDirection(user.workDirection ?? "");
    setAvailabilityStatus(user.availabilityStatus ?? "");
    setQuote(user.quote ?? "");
  }, [currentUserQuery.data]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: UpdateProfileProps = {
      fullName,
      jobTitle,
      shortDescription,
      aboutMe,
      email,
      phone,
      location,
      workDirection,
      availabilityStatus,
      quote
    };

    mutation.mutate(data, {
      onSuccess: async () => {
        await currentUserQuery.refetch();
        onClose();
      }
    });
  };

  const currentStatus = AVAILABILITY_OPTIONS.find(
    (option) => option.value === availabilityStatus
  );

  if (currentUserQuery.isLoading) {
    return (
      <div className="py-10 text-center text-sm text-muted">
        Đang tải thông tin profile...
      </div>
    );
  }

  return (
    // Không đặt border/max-height ở đây: Modal đã lo khung và padding
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {/* Xem trước nhanh, gọn 1 hàng */}
      <div className="flex items-center gap-3 rounded-xl border border-line bg-accent-soft/40 px-4 py-2.5">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white"
        >
          {getInitials(fullName)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.9375rem] font-semibold leading-tight text-ink">
            {fullName || "Chưa có tên"}
          </p>
          <p className="truncate text-xs text-muted">
            {jobTitle || "Chưa có chức danh"}
            {location ? ` · ${location}` : ""}
          </p>
        </div>

        {currentStatus && (
          <span className="hidden items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink sm:inline-flex">
            <span className={`h-2 w-2 rounded-full ${currentStatus.dot}`} />
            {currentStatus.label}
          </span>
        )}
      </div>

      {/* 3 cột ở màn hình lớn */}
      <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
        <Input
          label="Họ và tên"
          placeholder="Nhập họ và tên"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          icon={<UserRound size={18} />}
          required
        />

        <Input
          label="Chức danh"
          placeholder="Frontend Developer"
          value={jobTitle}
          onChange={(event) => setJobTitle(event.target.value)}
          icon={<BriefcaseBusiness size={18} />}
          required
        />

        <Input
          label="Định hướng công việc"
          placeholder="Full-stack Developer"
          value={workDirection}
          onChange={(event) => setWorkDirection(event.target.value)}
          icon={<Globe size={18} />}
          required
        />

        <Input
          label="Email"
          type="email"
          placeholder="example@gmail.com"
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
          required
        />

        <Input
          label="Địa điểm"
          placeholder="TP. Hồ Chí Minh"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          icon={<MapPin size={18} />}
          required
        />

        <div className="flex flex-col gap-1.5 font-body text-ink">
          <label htmlFor="availabilityStatus" className="text-sm font-semibold">
            Trạng thái làm việc
          </label>

          <div className="flex min-h-11 items-center rounded-xl border-[1.5px] border-line bg-surface px-3.5 transition focus-within:border-accent focus-within:ring-4 focus-within:ring-accent-soft">
            <BadgeCheck size={18} className="shrink-0 text-muted" />

            <select
              id="availabilityStatus"
              value={availabilityStatus}
              onChange={(event) => setAvailabilityStatus(event.target.value)}
              required
              className="w-full bg-transparent px-2 py-2 text-[0.9375rem] text-ink outline-none"
            >
              <option value="">Chọn trạng thái</option>
              {AVAILABILITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="md:col-span-1 lg:col-span-2">
          <Input
            label="Mô tả ngắn"
            placeholder="Giới thiệu ngắn về bản thân"
            value={shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
            required
          />
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <Textarea
            label="Giới thiệu bản thân"
            placeholder="Viết phần giới thiệu bản thân..."
            value={aboutMe}
            onChange={(event) => setAboutMe(event.target.value)}
            rows={3}
            required
          />
        </div>

        <div className="md:col-span-2 lg:col-span-1">
          <Textarea
            label="Câu trích dẫn (hiển thị trên portfolio)"
            placeholder="Câu nói thể hiện quan điểm của bạn..."
            value={quote}
            onChange={(event) => setQuote(event.target.value)}
            rows={3}
            required
          />
        </div>
      </div>

      {/* Footer: thông báo và nút lưu cùng một hàng */}
      <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
        <div className="min-w-0 flex-1 text-sm">
          {mutation.isError && (
            <p role="alert" className="flex items-center gap-2 text-danger">
              <CircleAlert size={16} className="shrink-0" />
              <span className="truncate">
                Cập nhật thất bại: {String(mutation.error)}
              </span>
            </p>
          )}

          {mutation.isSuccess && (
            <p role="status" className="flex items-center gap-2 text-green-600">
              <CircleCheck size={16} className="shrink-0" />
              Cập nhật profile thành công.
            </p>
          )}
        </div>

        <Button
          type="submit"
          isLoading={mutation.isPending}
          disabled={currentUserQuery.isError}
        >
          Lưu thay đổi
        </Button>
      </div>
    </form>
  );
}
