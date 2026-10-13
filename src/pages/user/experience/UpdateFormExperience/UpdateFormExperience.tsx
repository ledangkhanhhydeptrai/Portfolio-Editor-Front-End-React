import React from "react";
import {
  BriefcaseBusiness,
  Building2,
  Hash,
  Save,
  UserRound,
  X
} from "lucide-react";
import type { FormUpdateExperienceProps } from "../../../../services/experience/ExperienceTypes";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import Textarea from "../../../../components/ui/Textarea";

export default function UpdateFormExperience({
  companyName,
  description,
  displayOrder,
  endDate,
  isCurrent,
  position,
  setCompanyName,
  setDescription,
  setDisplayOrder,
  setEndDate,
  setIsCurrent,
  setPosition,
  setStartDate,
  startDate,
  onSubmit,
  experience,
  onClose,
  open
}: FormUpdateExperienceProps) {
  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    onSubmit(event);
  };

  const handleReset = () => {
    setCompanyName("");
    setDescription("");
    setDisplayOrder(0);
    setStartDate("");
    setEndDate("");
    setIsCurrent(false);
    setPosition("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4 text-[#ECECF1]"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-400/20 bg-indigo-500/10 text-indigo-400">
          <BriefcaseBusiness size={18} />
        </div>

        <div className="min-w-0">
          <h2 className="text-base font-semibold leading-tight text-white">
            Cập nhật kinh nghiệm làm việc
          </h2>
          <p className="text-xs text-slate-400">
            Chỉnh sửa thông tin công ty, vị trí và thời gian làm việc.
          </p>
        </div>
      </div>

      {/* Hàng 1: công ty - vị trí - thứ tự */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="md:col-span-5">
          <Input
            label="Tên công ty"
            placeholder="Ví dụ: FPT Software"
            value={companyName}
            onChange={(event) =>
              setCompanyName(event.target.value)
            }
            icon={<Building2 size={17} />}
            required
          />
        </div>

        <div className="md:col-span-5">
          <Input
            label="Vị trí công việc"
            placeholder="Ví dụ: Frontend Developer"
            value={position}
            onChange={(event) =>
              setPosition(event.target.value)
            }
            icon={<UserRound size={17} />}
            required
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Thứ tự"
            type="number"
            min={0}
            value={String(displayOrder)}
            onChange={(event) =>
              setDisplayOrder(Number(event.target.value))
            }
            icon={<Hash size={17} />}
            required
          />
        </div>
      </div>

      {/* Hàng 2: thời gian làm việc */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-end">
        <div className="md:col-span-4">
          <Input
            label="Ngày bắt đầu"
            type="date"
            value={startDate}
            onChange={(event) =>
              setStartDate(event.target.value)
            }
            required
          />
        </div>

        <div className="md:col-span-4">
          <Input
            label="Ngày kết thúc"
            type="date"
            value={endDate}
            onChange={(event) =>
              setEndDate(event.target.value)
            }
            disabled={isCurrent}
            required={!isCurrent}
          />
        </div>

        <label className="flex h-[42px] cursor-pointer items-center gap-2.5 rounded-lg border border-white/[0.08] bg-[#12131A] px-3 transition hover:border-indigo-400/30 md:col-span-4">
          <input
            type="checkbox"
            checked={isCurrent}
            onChange={(event) =>
              setIsCurrent(event.target.checked)
            }
            className="h-4 w-4 shrink-0 accent-indigo-500"
          />
          <span className="truncate text-sm text-slate-200">
            Đang làm việc tại đây
          </span>
        </label>
      </div>

      {/* Mô tả */}
      <Textarea
        label="Mô tả công việc"
        placeholder="Mô tả công việc, trách nhiệm và những thành tựu đạt được..."
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
        rows={3}
        maxLength={5000}
        hint="Nên mô tả ngắn gọn các nhiệm vụ và kết quả nổi bật."
      />

      {/* Footer */}
      <div className="flex flex-col-reverse gap-3 border-t border-white/[0.08] pt-4 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={handleReset}
          className="border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white"
        >
          <X size={16} />
          Xóa nội dung
        </Button>

        <Button
          type="submit"
          variant="primary"
          className="bg-indigo-600 hover:bg-indigo-500"
        >
          <Save size={16} />
          Lưu thay đổi
        </Button>
      </div>
    </form>
  );
}