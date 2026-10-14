import React from "react";
import { Compass, Code2, Layers3, Search, Check, X } from "lucide-react";

import type { FormUpdateDirectionProps } from "../../../../services/direction/directionTypes";

import Input from "../../../../components/ui/Input";
import Select from "../../../../components/ui/Select";
import Textarea from "../../../../components/ui/Textarea";

const panel = "rounded-2xl border border-white/[0.07] bg-[#0E1015]";

// Chiều cao form trên màn hình lớn = chiều cao khung nhìn trừ phần bên ngoài
// (header trang, tiêu đề, nút lưu...). Chỉnh số 210px nếu còn dư hoặc thiếu.
const FORM_HEIGHT = "lg:h-[calc(100dvh-210px)]";

function IconPreview({ url }: { url: string }) {
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    setFailed(false);
  }, [url]);

  const show = url.trim().length > 0 && !failed;

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-teal-400/10">
      {show ? (
        <img
          src={url}
          alt=""
          className="h-8 w-8 object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <Compass size={22} className="text-teal-300" />
      )}
    </div>
  );
}

export default function FormUpdateDirection({
  id,
  SkillData,
  code,
  description,
  displayOrder,
  icon,
  setCode,
  setDescription,
  setDisplayOrder,
  setIcon,
  setSkills,
  setTitle,
  skills,
  title
}: FormUpdateDirectionProps) {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [skillKeyword, setSkillKeyword] = React.useState("");

  const categories = React.useMemo(() => {
    const categorySet = new Set<string>();

    SkillData.forEach((skill) => {
      categorySet.add(skill.category);
    });

    return Array.from(categorySet).sort((a, b) => a.localeCompare(b));
  }, [SkillData]);

  const categoryOptions = React.useMemo(() => {
    return categories.map((category) => ({
      value: category,
      label: category
    }));
  }, [categories]);

  const filteredSkills = React.useMemo(() => {
    const keyword = skillKeyword.trim().toLowerCase();

    return SkillData.filter((skill) => {
      const matchesCategory =
        selectedCategory.length === 0 || skill.category === selectedCategory;

      const matchesKeyword =
        keyword.length === 0 ||
        skill.name.toLowerCase().includes(keyword) ||
        skill.category.toLowerCase().includes(keyword) ||
        skill.id.toLowerCase().includes(keyword);

      return matchesCategory && matchesKeyword;
    });
  }, [SkillData, selectedCategory, skillKeyword]);

  const selectedSkills = React.useMemo(() => {
    return SkillData.filter((skill) => skills.includes(skill.id));
  }, [SkillData, skills]);

  const toggleSkill = (skillId: string): void => {
    if (skills.includes(skillId)) {
      setSkills(skills.filter((selectedId) => selectedId !== skillId));
      return;
    }

    setSkills([...skills, skillId]);
  };

  const selectFilteredSkills = (): void => {
    const nextSkills = new Set(skills);

    filteredSkills.forEach((skill) => {
      nextSkills.add(skill.id);
    });

    setSkills(Array.from(nextSkills));
  };

  const removeFilteredSkills = (): void => {
    const filteredIds = new Set(filteredSkills.map((skill) => skill.id));

    setSkills(skills.filter((skillId) => !filteredIds.has(skillId)));
  };

  const removeSkill = (skillId: string): void => {
    setSkills(skills.filter((selectedId) => selectedId !== skillId));
  };

  return (
    <div
      className={`grid min-h-0 grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-1 ${FORM_HEIGHT}`}
    >
      {/* ── Trái: thông tin định hướng ── */}
      <section
        className={`${panel} flex min-h-0 min-w-0 flex-col overflow-hidden lg:col-span-5`}
      >
        <div className="flex shrink-0 items-center gap-3 border-b border-white/[0.07] px-5 py-3.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-400/10">
            <Compass size={18} className="text-teal-300" />
          </div>

          <div>
            <h3 className="font-semibold leading-tight text-gray-100">
              Thông tin định hướng
            </h3>
            <p className="mt-0.5 text-xs text-gray-500">
              Cập nhật thông tin và thứ tự hiển thị.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-4 p-5 sm:grid-cols-2 sm:p-6">
          <div className="sm:col-span-2">
            <Input
              label="ID định hướng"
              value={id}
              onChange={() => {}}
              disabled
            />
          </div>

          <Input
            label="Tên định hướng"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="VD: Frontend Developer"
            required
          />

          <Input
            label="Mã định hướng"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="VD: FRONTEND"
            required
          />

          <Input
            label="Đường dẫn biểu tượng"
            value={icon}
            onChange={(event) => setIcon(event.target.value)}
            placeholder="https://example.com/icon.svg"
          />

          <Input
            label="Thứ tự hiển thị"
            type="number"
            min={0}
            step={1}
            value={String(displayOrder)}
            onChange={(event) => {
              const value = event.target.value;

              if (value.length === 0) {
                setDisplayOrder(0);
                return;
              }

              const parsedValue = Number(value);

              if (Number.isInteger(parsedValue) && parsedValue >= 0) {
                setDisplayOrder(parsedValue);
              }
            }}
          />
        </div>

        {/* Mô tả giãn hết phần còn lại */}
        <div className="flex min-h-[120px] flex-1 flex-col px-5 pb-5 sm:px-6 [&>*]:flex [&>*]:h-full [&>*]:min-h-0 [&>*]:flex-col [&_textarea]:min-h-0 [&_textarea]:flex-1 [&_textarea]:resize-none">
          <Textarea
            label="Mô tả"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Mô tả về định hướng phát triển..."
          />
        </div>

        {/* Xem trước */}
        <div className="shrink-0 border-t border-white/[0.07] bg-[#12141A] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <IconPreview url={icon} />

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-gray-100">
                {title.trim().length > 0 ? title : "Tên định hướng"}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded bg-teal-400/10 px-1.5 py-0.5 font-mono text-teal-200">
                  {code.trim().length > 0 ? code : "MÃ"}
                </span>
                <span className="text-gray-500">Thứ tự {displayOrder}</span>
                <span className="text-gray-500">{skills.length} kỹ năng</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Phải: quản lý kỹ năng ── */}
      <section
        className={`${panel} flex min-h-0 min-w-0 flex-col overflow-hidden lg:col-span-7`}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-400/10">
              <Layers3 size={18} className="text-teal-300" />
            </div>

            <div>
              <h3 className="font-semibold leading-tight text-gray-100">
                Kỹ năng định hướng
              </h3>
              <p className="mt-0.5 text-xs text-gray-500">
                Chọn những kỹ năng phù hợp với định hướng này.
              </p>
            </div>
          </div>

          <span className="shrink-0 rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium text-teal-200">
            Đã chọn {skills.length}
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-3 p-5">
          {/* Bộ lọc */}
          <div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                value={skillKeyword}
                onChange={(event) => setSkillKeyword(event.target.value)}
                placeholder="Tìm kỹ năng..."
                className="w-full rounded-xl border border-white/10 bg-[#08090C] py-2.5 pl-9 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-teal-300/50 focus:ring-2 focus:ring-teal-300/10"
              />
            </div>

            <Select
              label=""
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              options={categoryOptions}
              placeholder="Tất cả nhóm"
            />
          </div>

          {/* Thao tác hàng loạt */}
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-gray-500">
              {filteredSkills.length} / {SkillData.length} kỹ năng phù hợp
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={selectFilteredSkills}
                disabled={filteredSkills.length === 0}
                className="rounded-lg border border-teal-300/20 bg-teal-300/10 px-3 py-1.5 text-xs font-medium text-teal-300 transition hover:bg-teal-300/15 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Chọn tất cả
              </button>

              <button
                type="button"
                onClick={removeFilteredSkills}
                disabled={
                  !filteredSkills.some((skill) => skills.includes(skill.id))
                }
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-gray-400 transition hover:bg-white/[0.07] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Bỏ chọn
              </button>
            </div>
          </div>

          {/* Danh sách kỹ năng: chiếm phần còn lại, cuộn bên trong nếu nhiều */}
          {filteredSkills.length === 0 ? (
            <div className="flex min-h-[160px] flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 px-4 text-center">
              <Code2 size={26} className="mb-2 text-gray-600" />
              <p className="text-sm text-gray-400">Không tìm thấy kỹ năng</p>
              <p className="mt-1 text-xs text-gray-600">
                Thử đổi từ khóa hoặc nhóm.
              </p>
            </div>
          ) : (
            <div className="direction-scroll grid min-h-[160px] flex-1 auto-rows-min grid-cols-1 content-start gap-2 overflow-y-auto pr-1 sm:grid-cols-2 xl:grid-cols-3">
              {filteredSkills.map((skill) => {
                const isSelected = skills.includes(skill.id);

                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => toggleSkill(skill.id)}
                    aria-pressed={isSelected}
                    className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                      isSelected
                        ? "border-teal-300/40 bg-teal-300/[0.07]"
                        : "border-white/[0.07] bg-[#12141A] hover:border-white/20"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                        isSelected
                          ? "border-teal-300 bg-teal-300 text-[#08090C]"
                          : "border-gray-600"
                      }`}
                    >
                      {isSelected && <Check size={13} strokeWidth={3} />}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-gray-100">
                        {skill.name}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-gray-500">
                        {skill.category}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Kỹ năng đã chọn */}
          {selectedSkills.length > 0 && (
            <div className="direction-scroll max-h-[76px] shrink-0 overflow-y-auto border-t border-white/[0.07] pt-3">
              <div className="flex flex-wrap gap-1.5">
                {selectedSkills.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex max-w-full items-center gap-1.5 rounded-md border border-teal-300/20 bg-teal-300/[0.06] py-1 pl-2 pr-1 text-xs text-teal-200"
                  >
                    <span className="max-w-[160px] truncate">{skill.name}</span>

                    <button
                      type="button"
                      onClick={() => removeSkill(skill.id)}
                      aria-label={`Bỏ chọn ${skill.name}`}
                      className="shrink-0 rounded p-0.5 text-teal-300/70 transition hover:bg-white/10 hover:text-white"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .direction-scroll::-webkit-scrollbar{width:6px}
        .direction-scroll::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:9999px}
        .direction-scroll{scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.12) transparent}
      `}</style>
    </div>
  );
}