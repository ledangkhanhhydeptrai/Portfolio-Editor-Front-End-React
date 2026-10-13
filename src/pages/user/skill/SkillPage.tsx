import React from "react";
import {
  useCreateSkill,
  useDeleteSkill,
  useGetAllSkill,
  useUpdateSkill
} from "../../../hooks/useSkill";
import type { SkillEnum, SkillProps } from "../../../services/skill/SkillTypes";
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
import FormUpdateSkill from "./FormUpdateSkill/FormUpdateSkill";
import type { Notifications } from "../../../components/ui/Notification";
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

  // Bộ lọc và phân trang
  const [search, setSearch] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState<SkillEnum | "ALL">(
    "ALL"
  );
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE);

  // Chi tiết skill
  const [selectedSkill, setSelectedSkill] = React.useState<SkillProps | null>(
    null
  );

  // Notification
  const [notification, setNotification] = React.useState<Notifications>({
    open: false,
    message: "",
    severity: "error"
  });

  // Tạo skill
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const { mutateAsync: createSkill, isPending: isCreating } = useCreateSkill();
  const { mutateAsync } = useDeleteSkill();
  const [category, setCategory] = React.useState<SkillEnum>("DEVELOPMENT");
  const [displayOrder, setDisplayOrder] = React.useState(0);
  const [name, setName] = React.useState("");
  const [iconUrl, setIconUrl] = React.useState<File | null>(null);

  // Cập nhật skill
  const [isUpdateOpen, setIsUpdateOpen] = React.useState(false);
  const [selectedUpdateSkill, setSelectedUpdateSkill] =
    React.useState<SkillProps | null>(null);

  const [updateName, setUpdateName] = React.useState("");
  const [updateCategory, setUpdateCategory] =
    React.useState<SkillEnum>("DEVELOPMENT");
  const [updateDisplayOrder, setUpdateDisplayOrder] = React.useState(0);
  const [updateIconUrl, setUpdateIconUrl] = React.useState<File | null>(null);

  const updateSkillId =
    selectedUpdateSkill === null ? "" : selectedUpdateSkill.id;

  const { mutateAsync: updateSkill, isPending: isUpdating } =
    useUpdateSkill(updateSkillId);

  // Dữ liệu từ API
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

  // Tìm kiếm, lọc danh mục và sắp xếp
  const filteredSkills = React.useMemo<SkillProps[]>(() => {
    return skills
      .filter((skill: SkillProps) => {
        const matchesName = skill.name
          .toLowerCase()
          .includes(search.trim().toLowerCase());

        const matchesCategory =
          filterCategory === "ALL" || skill.category === filterCategory;

        return matchesName && matchesCategory;
      })
      .sort((a: SkillProps, b: SkillProps) => {
        const difference = a.displayOrder - b.displayOrder;

        return sortOrder === "asc" ? difference : -difference;
      });
  }, [skills, search, filterCategory, sortOrder]);

  // Phân trang
  const showAll = pageSize === 0;
  const totalItems = filteredSkills.length;

  const totalPages = showAll
    ? 1
    : Math.max(1, Math.ceil(totalItems / pageSize));

  const currentPage = Math.min(page, totalPages);

  const pagedSkills = React.useMemo<SkillProps[]>(() => {
    if (showAll) {
      return filteredSkills;
    }

    const startIndex = (currentPage - 1) * pageSize;

    return filteredSkills.slice(startIndex, startIndex + pageSize);
  }, [filteredSkills, showAll, currentPage, pageSize]);

  const rangeStart =
    totalItems === 0 ? 0 : showAll ? 1 : (currentPage - 1) * pageSize + 1;

  const rangeEnd = showAll
    ? totalItems
    : Math.min(currentPage * pageSize, totalItems);

  React.useEffect(() => {
    setPage(1);
  }, [search, filterCategory, sortOrder, pageSize]);

  // Thống kê
  const developmentCount = skills.filter(
    (skill) => skill.category === "DEVELOPMENT"
  ).length;

  const videoCount = skills.filter(
    (skill) => skill.category === "VIDEO_EDITING"
  ).length;

  const drivingCount = skills.filter(
    (skill) => skill.category === "DRIVING"
  ).length;

  // Đóng modal chi tiết
  const handleCloseDetail = React.useCallback(() => {
    setSelectedSkill(null);
  }, []);

  // Mở popup tạo
  const handleOpenCreate = () => {
    setCategory("DEVELOPMENT");
    setDisplayOrder(0);
    setName("");
    setIconUrl(null);
    setIsCreateOpen(true);
  };

  // Đóng popup tạo
  const handleCloseCreate = () => {
    if (isCreating) {
      return;
    }

    setIsCreateOpen(false);
    setCategory("DEVELOPMENT");
    setDisplayOrder(0);
    setName("");
    setIconUrl(null);
  };

  // Submit tạo skill
  const handleCreateSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      await createSkill({
        category,
        displayOrder,
        iconUrl,
        name: name.trim()
      });

      setNotification({
        open: true,
        severity: "success",
        message: "Tạo kỹ năng thành công!"
      });

      setIsCreateOpen(false);
      setCategory("DEVELOPMENT");
      setDisplayOrder(0);
      setName("");
      setIconUrl(null);

      await refetch();
    } catch (error) {
      console.error("Create skill failed:", error);

      setNotification({
        open: true,
        severity: "error",
        message: "Tạo kỹ năng thất bại. Vui lòng thử lại!"
      });
    }
  };

  // Mở popup cập nhật và điền dữ liệu hiện tại
  const handleOpenUpdate = (skill: SkillProps) => {
    setSelectedUpdateSkill(skill);
    setUpdateName(skill.name);
    setUpdateCategory(skill.category);
    setUpdateDisplayOrder(skill.displayOrder);
    setUpdateIconUrl(null);
    setIsUpdateOpen(true);
  };

  // Đóng popup cập nhật
  const handleCloseUpdate = () => {
    if (isUpdating) {
      return;
    }

    setIsUpdateOpen(false);
    setSelectedUpdateSkill(null);
    setUpdateName("");
    setUpdateCategory("DEVELOPMENT");
    setUpdateDisplayOrder(0);
    setUpdateIconUrl(null);
  };

  // Submit cập nhật skill
  const handleUpdateSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (selectedUpdateSkill === null) {
      return;
    }

    try {
      await updateSkill({
        category: updateCategory,
        displayOrder: updateDisplayOrder,
        iconUrl: updateIconUrl,
        name: updateName.trim()
      });

      setNotification({
        open: true,
        severity: "success",
        message: "Cập nhật kỹ năng thành công!"
      });

      setIsUpdateOpen(false);
      setSelectedUpdateSkill(null);
      setUpdateName("");
      setUpdateCategory("DEVELOPMENT");
      setUpdateDisplayOrder(0);
      setUpdateIconUrl(null);

      await refetch();
    } catch (error) {
      console.error("Update skill failed:", error);

      setNotification({
        open: true,
        severity: "error",
        message: "Cập nhật kỹ năng thất bại. Vui lòng thử lại!"
      });
    }
  };
  const handleDelete = async (skill: SkillProps) => {
    const isConfirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa kỹ năng "${skill.name}" không?`
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await mutateAsync(skill.id);

      setNotification({
        open: true,
        severity: "success",
        message: "Xóa kỹ năng thành công!"
      });

      await refetch();
    } catch (error) {
      console.error("Delete skill failed:", error);

      setNotification({
        open: true,
        severity: "error",
        message: "Xóa kỹ năng thất bại. Vui lòng thử lại!"
      });
    }
  };
  return (
    <div className="min-h-screen bg-[#0B0B0D] px-4 py-6 text-[#F0EFEA] sm:px-6 lg:px-8">
      <div className="space-y-6">
        <SkillHeader
          isFetching={isFetching}
          onRefresh={() => refetch()}
          onCreate={handleOpenCreate}
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
            category={filterCategory}
            onCategoryChange={setFilterCategory}
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
            onEdit={handleOpenUpdate}
            onDelete={handleDelete}
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

      {/* Popup tạo skill */}
      <Modal
        open={isCreateOpen}
        onClose={handleCloseCreate}
        title=""
        size="2xl"
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
            onSubmit={handleCreateSubmit}
          />
        </div>
      </Modal>

      {/* Popup cập nhật skill */}
      <Modal
        open={isUpdateOpen}
        onClose={handleCloseUpdate}
        title=""
        size="2xl"
      >
        {selectedUpdateSkill !== null && (
          <div className="w-full">
            <h2 className="mb-2 text-xl font-bold text-white">
              Cập nhật kỹ năng
            </h2>

            <p className="mb-6 text-sm text-gray-400">
              Chỉnh sửa thông tin kỹ năng đang chọn.
            </p>

            <FormUpdateSkill
              skill={selectedUpdateSkill}
              isLoading={isUpdating}
              name={updateName}
              setName={setUpdateName}
              category={updateCategory}
              setCategory={setUpdateCategory}
              displayOrder={updateDisplayOrder}
              setDisplayOrder={setUpdateDisplayOrder}
              iconUrl={updateIconUrl}
              setIconUrl={setUpdateIconUrl}
              onSubmit={handleUpdateSubmit}
              onCancel={handleCloseUpdate}
            />
          </div>
        )}
      </Modal>

      {/* Thông báo */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => {
          setNotification((previous) => ({
            ...previous,
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
            setNotification((previous) => ({
              ...previous,
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
