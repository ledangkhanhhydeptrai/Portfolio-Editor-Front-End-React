import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  UserRound,
  Globe,
  BadgeCheck
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

    setFullName(user.fullName);
    setJobTitle(user.jobTitle);
    setShortDescription(user.shortDescription);
    setAboutMe(user.aboutMe);
    setEmail(user.email);
    setPhone(user.phone);
    setLocation(user.location);
    setWorkDirection(user.workDirection);
    setAvailabilityStatus(user.availabilityStatus);
    setQuote(user.quote);
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

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="space-y-8 rounded-2xl border border-line bg-surface p-6 md:p-8"
      >
        {currentUserQuery.isLoading ? (
          <div className="py-8 text-center text-sm text-muted">
            Đang tải thông tin profile...
          </div>
        ) : (
          <>
            <section className="space-y-5">
              <h3 className="text-base font-semibold text-ink">
                Thông tin cá nhân
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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

                <Input
                  label="Định hướng công việc"
                  placeholder="Full-stack Developer"
                  value={workDirection}
                  onChange={(event) => setWorkDirection(event.target.value)}
                  icon={<Globe size={18} />}
                  required
                />

                <div className="flex flex-col gap-1.5 font-body text-ink">
                  <label
                    htmlFor="availabilityStatus"
                    className="text-sm font-semibold"
                  >
                    Trạng thái làm việc
                  </label>

                  <div className="flex min-h-11 items-center rounded-xl border-[1.5px] border-line bg-surface px-3.5 transition focus-within:border-accent focus-within:ring-4 focus-within:ring-accent-soft">
                    <BadgeCheck size={18} className="shrink-0 text-muted" />

                    <select
                      id="availabilityStatus"
                      value={availabilityStatus}
                      onChange={(event) =>
                        setAvailabilityStatus(event.target.value)
                      }
                      required
                      className="w-full bg-transparent px-2 py-2 text-[0.9375rem] text-ink outline-none"
                    >
                      <option value="">Chọn trạng thái</option>
                      <option value="Available">Đang tìm việc</option>
                      <option value="Open to work">Sẵn sàng nhận việc</option>
                      <option value="Freelance">Nhận dự án freelance</option>
                      <option value="Unavailable">Chưa sẵn sàng</option>
                    </select>
                  </div>
                </div>
              </div>

              <Input
                label="Mô tả ngắn"
                placeholder="Giới thiệu ngắn về bản thân"
                value={shortDescription}
                onChange={(event) => setShortDescription(event.target.value)}
                required
              />
            </section>

            <section className="space-y-5">
              <h3 className="text-base font-semibold text-ink">
                Nội dung giới thiệu
              </h3>

              <Textarea
                label="Giới thiệu bản thân"
                placeholder="Viết phần giới thiệu bản thân..."
                value={aboutMe}
                onChange={(event) => setAboutMe(event.target.value)}
                rows={5}
                required
              />

              <Textarea
                label="Câu trích dẫn"
                placeholder="Câu nói thể hiện quan điểm của bạn..."
                value={quote}
                onChange={(event) => setQuote(event.target.value)}
                rows={3}
                required
                hint="Câu trích dẫn hiển thị trên portfolio."
              />
            </section>

            {mutation.isError && (
              <div
                role="alert"
                className="rounded-xl border border-danger/20 bg-danger/5 p-3 text-sm text-danger"
              >
                Cập nhật thất bại: {String(mutation.error)}
              </div>
            )}

            {mutation.isSuccess && (
              <div
                role="status"
                className="rounded-xl border border-green-500/20 bg-green-500/5 p-3 text-sm text-green-600"
              >
                Cập nhật profile thành công.
              </div>
            )}

            <div className="flex justify-end border-t border-line pt-5">
              <Button
                type="submit"
                isLoading={mutation.isPending}
                disabled={currentUserQuery.isError}
              >
                Lưu thay đổi
              </Button>
            </div>
          </>
        )}
      </form>
    </>
  );
}
