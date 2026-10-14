import React from "react";
import { Code2, Image, Layers3, ListOrdered, Search, Tag, X } from "lucide-react";

import type { FormCreateDirectionProps } from "../../../../services/direction/directionTypes";

import Button from "../../../../components/ui/Button";
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
        <Layers3 size={22} className="text-teal-300" />
      )}
    </div>
  );
}

const smallBtn =
  "!rounded-lg !border-white/10 !bg-white/[0.04] !px-3 !py-1.5 !text-xs !text-gray-300 hover:!bg-white/[0.08]";

export default function FormCreateDirection({
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
}: FormCreateDirectionProps) {
  const [category, setCategory] = React.useState("");
  const [searchSkill, setSearchSkill] = React.useState("");

  const categories = React.useMemo(() => {
    const categorySet = new Set<string>();

    SkillData.forEach((skill) => {
      if (skill.category.trim().length > 0) {
        categorySet.add(skill.category);
      }
    });

    return Array.from(categorySet).sort((a, b) => a.localeCompare(b));
  }, [SkillData]);

  const categoryOptions = React.useMemo(
    () =>
      categories.map((item) => ({
        value: item,
        label: item
      })),
    [categories]
  );

  const filteredSkills = React.useMemo(() => {
    return SkillData.filter((skill) => {
      const matchesCategory =
        category.length === 0 || skill.category === category;

      const matchesSearch = skill.name
        .toLowerCase()
        .includes(searchSkill.trim().toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [SkillData, category, searchSkill]);

  const toggleSkill = (skillId: string) => {
    if (skills.includes(skillId)) {
      setSkills(skills.filter((id) => id !== skillId));
      return;
    }

    setSkills([...skills, skillId]);
  };

  const selectFilteredSkills = () => {
    const filteredIds = filteredSkills.map((skill) => skill.id);
    const nextSkills = [...skills];

    filteredIds.forEach((skillId) => {
      if (!nextSkills.includes(skillId)) {
        nextSkills.push(skillId);
      }
    });

    setSkills(nextSkills);
  };

  const clearFilteredSkills = () => {
    const filteredIds = filteredSkills.map((skill) => skill.id);

    setSkills(skills.filter((skillId) => !filteredIds.includes(skillId)));
  };

  return (
    <div
      className={`grid min-h-0 grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-1 ${FORM_HEIGHT}`}
    >
      {/* ── Trái: thông tin cơ bản ── */}
      <section
        className={`${panel} flex min-h-0 min-w-0 flex-col overflow-hidden lg:col-span-5`}
      >
        <div className="flex shrink-0 items-center gap-3 border-b border-white/[0.07] px-5 py-3.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-400/10">
            <Layers3 size={18} className="text-teal-300" />
          </div>

          <div>
            <h2 className="font-semibold leading-tight text-gray-100">
              Thông tin định hướng
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Nhập thông tin cơ bản cho định hướng mới.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-4 p-5 sm:p-6 sm:grid-cols-2">
          <Input
            label="Tên định hướng"
            placeholder="VD: Frontend Developer"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            icon={<Tag size={17} />}
            required
          />

          <Input
            label="Mã định hướng"
            placeholder="VD: FE"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            icon={<Code2 size={17} />}
            required
          />

          <Input
            label="Đường dẫn biểu tượng"
            placeholder="https://example.com/icon.svg"
            value={icon}
            onChange={(event) => setIcon(event.target.value)}
            icon={<Image size={17} />}
          />

          <Input
            label="Thứ tự hiển thị"
            type="number"
            min={0}
            placeholder="0"
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
            icon={<ListOrdered size={17} />}
            required
          />
        </div>

        {/* Mô tả giãn hết phần còn lại */}
        <div className="flex min-h-[120px] flex-1 flex-col px-5 pb-5 sm:px-6 [&>*]:flex [&>*]:h-full [&>*]:min-h-0 [&>*]:flex-col [&_textarea]:min-h-0 [&_textarea]:flex-1 [&_textarea]:resize-none">
          <Textarea
            label="Mô tả"
            placeholder="Mô tả về định hướng nghề nghiệp..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={500}
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

      {/* ── Phải: chọn kỹ năng ── */}
      <section
        className={`${panel} flex min-h-0 min-w-0 flex-col overflow-hidden lg:col-span-7`}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-400/10">
              <Code2 size={18} className="text-teal-300" />
            </div>

            <div>
              <h2 className="font-semibold leading-tight text-gray-100">
                Kỹ năng định hướng
              </h2>
              <p className="mt-0.5 text-xs text-gray-500">
                Lọc theo nhóm rồi chọn các kỹ năng phù hợp.
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
            <Select
              label="Lọc theo nhóm"
              options={categoryOptions}
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="Tất cả nhóm"
            />

            <Input
              label="Tìm kiếm kỹ năng"
              placeholder="Nhập tên kỹ năng..."
              value={searchSkill}
              onChange={(event) => setSearchSkill(event.target.value)}
              icon={<Search size={17} />}
            />
          </div>

          {/* Thao tác chọn nhanh */}
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-gray-500">
              Hiển thị {filteredSkills.length} / {SkillData.length} kỹ năng
            </p>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                className={smallBtn}
                onClick={selectFilteredSkills}
                disabled={filteredSkills.length === 0}
              >
                Chọn tất cả đang lọc
              </Button>

              <Button
                type="button"
                variant="secondary"
                className={smallBtn}
                onClick={clearFilteredSkills}
                disabled={
                  !filteredSkills.some((skill) => skills.includes(skill.id))
                }
              >
                Bỏ chọn đang lọc
              </Button>
            </div>
          </div>

          {/* Danh sách kỹ năng: chiếm phần còn lại, cuộn bên trong nếu nhiều */}
          {filteredSkills.length === 0 ? (
            <div className="flex min-h-[160px] flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 px-4 text-center">
              <Code2 size={28} className="text-gray-600" />

              <p className="mt-3 text-sm font-medium text-gray-300">
                Không tìm thấy kỹ năng
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Thử chọn nhóm khác hoặc thay đổi từ khóa tìm kiếm.
              </p>
            </div>
          ) : (
            <div className="direction-scroll grid min-h-[160px] flex-1 auto-rows-min grid-cols-1 content-start gap-2 overflow-y-auto pr-1 sm:grid-cols-2 xl:grid-cols-3">
              {filteredSkills.map((skill) => {
                const isSelected = skills.includes(skill.id);

                return (
                  <label
                    key={skill.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 transition ${
                      isSelected
                        ? "border-teal-300/40 bg-teal-300/[0.07]"
                        : "border-white/[0.07] bg-[#12141A] hover:border-white/20"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSkill(skill.id)}
                      className="h-4 w-4 shrink-0 accent-teal-300"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-100">
                        {skill.name}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] text-gray-500">
                        {skill.category}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          )}

          {/* Kỹ năng đã chọn */}
          {skills.length > 0 && (
            <div className="direction-scroll max-h-[76px] shrink-0 overflow-y-auto border-t border-white/[0.07] pt-3">
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skillId) => {
                  const selectedSkill = SkillData.find(
                    (skill) => skill.id === skillId
                  );

                  return (
                    <button
                      key={skillId}
                      type="button"
                      onClick={() => toggleSkill(skillId)}
                      title="Nhấn để bỏ chọn"
                      className="inline-flex max-w-full items-center gap-1.5 rounded-md border border-teal-300/20 bg-teal-300/[0.06] px-2 py-1 text-xs text-teal-200 transition hover:bg-red-400/10 hover:text-red-300"
                    >
                      <span className="max-w-[160px] truncate">
                        {selectedSkill ? selectedSkill.name : skillId}
                      </span>
                      <X size={12} aria-hidden="true" />
                    </button>
                  );
                })}
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