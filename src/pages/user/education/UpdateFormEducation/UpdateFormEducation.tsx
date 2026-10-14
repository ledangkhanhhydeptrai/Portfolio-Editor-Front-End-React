import React from "react";
import {
  BookOpen,
  Building2,
  CalendarDays,
  GraduationCap,
  Hash,
  Save,
  RotateCcw
} from "lucide-react";
import type { FormUpdateEducationProps } from "../../../../services/education/EducationTypes";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import Textarea from "../../../../components/ui/Textarea";

export default function UpdateFormEducation({
  degree,
  description,
  displayOrder,
  endYear,
  major,
  onSubmit,
  schoolName,
  setDegree,
  setDescription,
  setDisplayOrder,
  setEndYear,
  setMajor,
  setSchoolName,
  setStartYear,
  startYear,
  education
}: FormUpdateEducationProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  if (education === null) {
    return (
      <div className="rounded-2xl border border-white/[0.07] bg-[#0E1015] p-6 text-center">
        <p className="text-sm text-gray-400">
          Không tìm thấy thông tin học vấn cần cập nhật.
        </p>
      </div>
    );
  }

  const clearError = (...keys: string[]) => {
    setErrors((previous) => {
      const next = { ...previous };
      keys.forEach((key) => {
        next[key] = "";
      });
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};

    if (schoolName.trim().length === 0) {
      nextErrors.schoolName = "Vui lòng nhập tên trường học.";
    }

    if (degree.trim().length === 0) {
      nextErrors.degree = "Vui lòng nhập bằng cấp.";
    }

    if (major.trim().length === 0) {
      nextErrors.major = "Vui lòng nhập chuyên ngành.";
    }

    if (description.trim().length === 0) {
      nextErrors.description = "Vui lòng nhập mô tả quá trình học tập.";
    }

    if (!Number.isInteger(startYear) || startYear < 1900 || startYear > 2100) {
      nextErrors.startYear = "Năm bắt đầu phải từ 1900 đến 2100.";
    }

    if (!Number.isInteger(endYear) || endYear < 1900 || endYear > 2100) {
      nextErrors.endYear = "Năm kết thúc phải từ 1900 đến 2100.";
    } else if (Number.isInteger(startYear) && endYear < startYear) {
      nextErrors.endYear = "Năm kết thúc không được trước năm bắt đầu.";
    }

    if (!Number.isInteger(displayOrder) || displayOrder < 0) {
      nextErrors.displayOrder =
        "Thứ tự hiển thị phải là số nguyên từ 0 trở lên.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit(event);
  };

  const handleYearChange = (value: string, setter: (value: number) => void) => {
    if (value.length === 0) {
      setter(0);
      return;
    }

    const parsedValue = Number(value);

    if (Number.isInteger(parsedValue)) {
      setter(parsedValue);
    }
  };

  const handleReset = () => {
    setSchoolName(education.schoolName);
    setDegree(education.degree);
    setMajor(education.major);
    setDescription(education.description);
    setDisplayOrder(education.displayOrder);
    setStartYear(education.startYear);
    setEndYear(education.endYear);
    setErrors({});
  };

  const isDirty =
    schoolName !== education.schoolName ||
    degree !== education.degree ||
    major !== education.major ||
    description !== education.description ||
    displayOrder !== education.displayOrder ||
    startYear !== education.startYear ||
    endYear !== education.endYear;

  const hasValidRange =
    startYear >= 1900 && endYear >= 1900 && endYear >= startYear;
  const duration = hasValidRange ? endYear - startYear : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* Slim header */}
      <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-400/10">
          <GraduationCap size={21} className="text-teal-300" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold leading-tight text-gray-100">
            Cập nhật thông tin học vấn
          </h3>
          <p className="mt-0.5 truncate text-sm text-gray-400">
            Chỉnh sửa trường học, bằng cấp và thời gian đào tạo.
          </p>
        </div>

        <span
          title={education.id}
          className="hidden max-w-[220px] shrink-0 truncate rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-gray-400 md:inline-block"
        >
          Mã: {education.id}
        </span>
      </div>

      {/* Fields: 3 compact rows */}
      <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-12">
        <div className="md:col-span-5">
          <Input
            label="Tên trường học"
            placeholder="VD: FPT University"
            value={schoolName}
            onChange={(event) => {
              setSchoolName(event.target.value);
              clearError("schoolName");
            }}
            icon={<Building2 size={17} />}
            error={errors.schoolName}
            maxLength={255}
            required
          />
        </div>

        <div className="md:col-span-4">
          <Input
            label="Bằng cấp"
            placeholder="VD: Cử nhân CNTT"
            value={degree}
            onChange={(event) => {
              setDegree(event.target.value);
              clearError("degree");
            }}
            icon={<GraduationCap size={17} />}
            error={errors.degree}
            maxLength={255}
            required
          />
        </div>

        <div className="md:col-span-3">
          <Input
            label="Thứ tự hiển thị"
            type="number"
            min={0}
            step={1}
            placeholder="VD: 1"
            value={String(displayOrder)}
            onChange={(event) => {
              const value = event.target.value;

              setDisplayOrder(value.length === 0 ? 0 : Number(value));
              clearError("displayOrder");
            }}
            icon={<Hash size={17} />}
            error={errors.displayOrder}
            required
          />
        </div>

        <div className="md:col-span-6">
          <Input
            label="Chuyên ngành"
            placeholder="VD: Software Engineering"
            value={major}
            onChange={(event) => {
              setMajor(event.target.value);
              clearError("major");
            }}
            icon={<BookOpen size={17} />}
            error={errors.major}
            maxLength={255}
            required
          />
        </div>

        <div className="md:col-span-3">
          <Input
            label="Năm bắt đầu"
            type="number"
            min={1900}
            max={2100}
            step={1}
            placeholder="VD: 2021"
            value={startYear === 0 ? "" : String(startYear)}
            onChange={(event) => {
              handleYearChange(event.target.value, setStartYear);
              clearError("startYear", "endYear");
            }}
            icon={<CalendarDays size={17} />}
            error={errors.startYear}
            required
          />
        </div>

        <div className="md:col-span-3">
          <Input
            label="Năm kết thúc"
            type="number"
            min={1900}
            max={2100}
            step={1}
            placeholder="VD: 2026"
            value={endYear === 0 ? "" : String(endYear)}
            onChange={(event) => {
              handleYearChange(event.target.value, setEndYear);
              clearError("endYear");
            }}
            icon={<CalendarDays size={17} />}
            error={errors.endYear}
            required
          />
        </div>

        <div className="md:col-span-12">
          <Textarea
            label="Mô tả quá trình học tập"
            placeholder="Chương trình đào tạo, chuyên môn hoặc thành tích nổi bật..."
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              clearError("description");
            }}
            error={errors.description}
            maxLength={5000}
            rows={3}
            required
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          {isDirty && (
            <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-1 text-amber-300">
              Có thay đổi chưa lưu
            </span>
          )}
          {duration !== null && (
            <span className="rounded-full border border-teal-400/20 bg-teal-400/10 px-2.5 py-1 text-teal-300">
              Thời gian học: {duration} năm
            </span>
          )}
          <span>{description.length}/5000 ký tự</span>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <Button
            type="button"
            variant="secondary"
            className="border-white/10 bg-white/[0.04] text-gray-300 hover:bg-white/[0.08]"
            onClick={handleReset}
          >
            <RotateCcw size={16} />
            Khôi phục dữ liệu
          </Button>

          <Button type="submit">
            <Save size={16} />
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </form>
  );
}