import React from "react";
import { useCreateSkill, useGetAllSkill } from "../../../hooks/useSkill";
import { SkillEnum, SkillProps } from "../../../services/skill/SkillTypes";
import {
  DEFAULT_PAGE_SIZE,
  SkillDetailModal,
  SkillHeader,
  SkillPagination,
  SkillSummary,
  SkillTable,
  SkillToolbar
} from "./components";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/ui/Modal";
import FormCreateSkill from "./FormCreateSkill/FormCreateSkill";
import { Notifications } from "../../../components/ui/Notification";
import { Alert, Snackbar } from "@mui/material";

const EMPTY_SKILLS: SkillProps[] = [];

export default function SkillPage() {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
    isFetching
  } = useGetAllSkill();
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE);
  const [selectedSkill, setSelectedSkill] = React.useState<SkillProps | null>(
    null
  );
  const [notification, setNotification] = React.useState<Notifications>({
    open: false,
    message: "",
    severity: "error"
  });
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const { mutateAsync } = useCreateSkill();
  const [category, setCategory] = React.useState<SkillEnum>("DEVELOPMENT");
  const [displayOrder, setDisplayOrder] = React.useState(0);
  const [name, setName] = React.useState("");
  const [iconUrl, setIconUrl] = React.useState<File | null>(null);
  const skills: SkillProps[] = React.useMemo(() => {
    if (
      response === undefined ||
      response.data === undefined ||
      !Array.isArray(response.data)
    ) {
      return EMPTY_SKILLS;
    }

    return response.data as SkillProps[];
  }, [response]);

  const filteredSkills = React.useMemo<SkillProps[]>(() => {
    return skills
      .filter((skill: SkillProps) => {
        const matchesName = skill.name
          .toLowerCase()
          .includes(search.trim().toLowerCase());

        const matchesCategory =
          category === "DEVELOPMENT" || skill.category === category;

        return matchesName && matchesCategory;
      })
      .sort((a: SkillProps, b: SkillProps) => {
        const difference = a.displayOrder - b.displayOrder;

        return sortOrder === "asc" ? difference : -difference;
      });
  }, [skills, search, category, sortOrder]);

  // ----- Pagination -----
  const showAll = pageSize === 0;
  const totalItems = filteredSkills.length;
  const totalPages = showAll
    ? 1
    : Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);

  const pagedSkills = React.useMemo<SkillProps[]>(() => {
    if (showAll) return filteredSkills;

    const startIndex = (currentPage - 1) * pageSize;
    return filteredSkills.slice(startIndex, startIndex + pageSize);
  }, [filteredSkills, showAll, currentPage, pageSize]);

  const rangeStart =
    totalItems === 0 ? 0 : showAll ? 1 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = showAll
    ? totalItems
    : Math.min(currentPage * pageSize, totalItems);

  // Quay về trang 1 khi đổi bộ lọc
  React.useEffect(() => {
    setPage(1);
  }, [search, category, sortOrder, pageSize]);

  const handleCloseDetail = React.useCallback(() => {
    setSelectedSkill(null);
  }, []);

  const developmentCount = skills.filter(
    (skill) => skill.category === "DEVELOPMENT"
  ).length;
  const videoCount = skills.filter(
    (skill) => skill.category === "VIDEO_EDITING"
  ).length;
  const drivingCount = skills.filter(
    (skill) => skill.category === "DRIVING"
  ).length;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await mutateAsync({
        category,
        displayOrder,
        iconUrl,
        name
      });

      setNotification({
        open: true,
        severity: "success",
        message: "Tạo kỹ năng thành công!"
      });
    } catch (error) {
      console.error("Create skill failed:", error);

      setNotification({
        open: true,
        severity: "error",
        message: "Tạo kỹ năng thất bại. Vui lòng thử lại!"
      });
    }
  };
  return (
    <div className="min-h-screen bg-[#0B0B0D] px-4 py-6 text-[#F0EFEA] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px] space-y-6">
        <SkillHeader
          isFetching={isFetching}
          onRefresh={() => refetch()}
          onCreate={() => setIsCreateOpen(true)}
        />

        <SkillSummary
          total={skills.length}
          developmentCount={developmentCount}
          videoCount={videoCount}
          drivingCount={drivingCount}
        />

        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121216]">
          <SkillToolbar
            resultCount={totalItems}
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            sortOrder={sortOrder}
            onToggleSort={() =>
              setSortOrder((current) => (current === "asc" ? "desc" : "asc"))
            }
          />

          <SkillTable
            skills={pagedSkills}
            isLoading={isLoading}
            isError={isError}
            onRetry={() => refetch()}
            onView={(skill) => navigate(`/skills/${skill.id}`)}
            onEdit={(skill) => alert(`Tích hợp API cập nhật: ${skill.name}`)}
            onDelete={(skill) => alert(`Tích hợp API xóa: ${skill.name}`)}
          />

          <SkillPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            totalAll={skills.length}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </section>
      </div>

      <SkillDetailModal skill={selectedSkill} onClose={handleCloseDetail} />
      <Modal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title=""
      >
        <div className="w-full">
          <h2 className="mb-6 text-xl font-bold text-white">
            Thêm kỹ năng mới
          </h2>

          <FormCreateSkill
            category={category}
            setCategory={setCategory}
            displayOrder={displayOrder}
            setDisplayOrder={setDisplayOrder}
            name={name}
            setName={setName}
            iconUrl={iconUrl}
            setIconUrl={setIconUrl}
            onSubmit={handleSubmit}
          />
        </div>
      </Modal>
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => {
          setNotification((prev) => ({
            ...prev,
            open: false
          }));
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <Alert
          onClose={() => {
            setNotification((prev) => ({
              ...prev,
              open: false
            }));
          }}
          severity={notification.severity}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: "12px",
            fontSize: "14px"
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
