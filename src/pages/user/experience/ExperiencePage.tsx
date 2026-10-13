import React from "react";
import {
  useCreateExperience,
  useGetAllExperience
} from "../../../hooks/useExperience";
import {
  CreateExperienceProps,
  ExperienceProps
} from "../../../services/experience/ExperienceTypes";
import {
  EmptyState,
  ErrorState,
  ExperienceCardList,
  ExperienceHeader,
  ExperienceListHeader,
  ExperiencePagination,
  ExperienceStats,
  ExperienceTable,
  LoadingState
} from "./components";
import { DEFAULT_PAGE_SIZE, PAGE_HEIGHT } from "./constants";
import { useNavigate } from "react-router-dom";
import FormCreateExperience from "./FormCreateExperience/FormCreateExperience";
import Modal from "../../../components/ui/Modal";
import { Notifications } from "../../../components/ui/Notification";
import { Alert, Snackbar } from "@mui/material";

const ExperiencePage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetAllExperience();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE);
  const [companyName, setCompanyName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [displayOrder, setDisplayOrder] = React.useState(0);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [isCurrent, setIsCurrent] = React.useState(false);
  const [position, setPosition] = React.useState("");

  const createExperience = useCreateExperience();
  const [notification, setNotification] = React.useState<Notifications>({
    open: false,
    message: "",
    severity: "error"
  });
  const experiences: ExperienceProps[] = React.useMemo(() => {
    if (!data || !Array.isArray(data.data)) {
      return [];
    }

    return [...data.data].sort(
      (first, second) => first.displayOrder - second.displayOrder
    );
  }, [data]);

  const filteredExperiences = React.useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return experiences.filter((experience) => {
      const matchesSearch =
        experience.companyName.toLowerCase().includes(keyword) ||
        experience.position.toLowerCase().includes(keyword) ||
        experience.description.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "current" && experience.isCurrent) ||
        (statusFilter === "past" && !experience.isCurrent);

      return matchesSearch && matchesStatus;
    });
  }, [experiences, searchTerm, statusFilter]);

  const showAll = pageSize === 0;
  const totalItems = filteredExperiences.length;
  const totalPages = showAll
    ? 1
    : Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paginatedExperiences = React.useMemo(() => {
    if (showAll) {
      return filteredExperiences;
    }

    const startIndex = (currentPage - 1) * pageSize;

    return filteredExperiences.slice(startIndex, startIndex + pageSize);
  }, [filteredExperiences, showAll, currentPage, pageSize]);

  const rangeStart =
    totalItems === 0 ? 0 : showAll ? 1 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = showAll
    ? totalItems
    : Math.min(currentPage * pageSize, totalItems);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPage(1);
  };

  const currentCount = experiences.filter(
    (experience) => experience.isCurrent
  ).length;

  const companyCount = new Set(
    experiences.map((experience) => experience.companyName)
  ).size;
  const handleCreateExperience = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!companyName.trim() || !position.trim() || !description.trim()) {
      return;
    }

    if (!startDate) {
      return;
    }

    if (!isCurrent && (!endDate || endDate < startDate)) {
      return;
    }

    const payload: CreateExperienceProps = {
      companyName: companyName.trim(),
      description: description.trim(),
      displayOrder,
      startDate,
      endDate: isCurrent ? "" : endDate,
      isCurrent,
      position: position.trim()
    };

    createExperience.mutate(payload, {
      onSuccess: () => {
        setNotification({
          open: true,
          message: "Tạo kinh nghiệm thành công",
          severity: "success"
        });
        setIsCreateModalOpen(false);
        setCompanyName("");
        setDescription("");
        setDisplayOrder(0);
        setStartDate("");
        setEndDate("");
        setIsCurrent(false);
        setPosition("");
      }
    });
  };
  return (
    // Không dùng min-h-[calc(100vh-64px)]: header thực tế cao hơn nên đáy trang bị cắt.
    <div
      className={`flex w-full flex-col bg-[#090A0D] text-[#ECECF1] antialiased ${PAGE_HEIGHT}`}
    >
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-3 p-4 sm:p-5">
        <ExperienceHeader
          isFetching={isFetching}
          onRefresh={() => refetch()}
          onCreate={() => setIsCreateModalOpen(true)}
        />

        <ExperienceStats
          total={experiences.length}
          currentCount={currentCount}
          companyCount={companyCount}
        />

        {/* Danh sách: tiêu đề + tìm kiếm / lọc - bảng (cuộn) - phân trang */}
        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#12131A]">
          <ExperienceListHeader
            shownCount={paginatedExperiences.length}
            totalCount={experiences.length}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            statusFilter={statusFilter}
            onStatusChange={handleStatusChange}
          />

          {/* Vùng nội dung: chiếm hết chỗ còn lại, cuộn bên trong */}
          <div className="min-h-64 flex-1 overflow-auto overscroll-contain [scrollbar-gutter:stable] lg:min-h-0">
            {isLoading ? (
              <LoadingState />
            ) : isError ? (
              <ErrorState error={error} onRetry={() => refetch()} />
            ) : paginatedExperiences.length === 0 ? (
              <EmptyState onBack={() => navigate(-1)} />
            ) : (
              <>
                <ExperienceTable items={paginatedExperiences} />
                <ExperienceCardList items={paginatedExperiences} />
              </>
            )}
          </div>

          {!isLoading && !isError && totalItems > 0 && (
            <ExperiencePagination
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
              currentPage={currentPage}
              totalPages={totalPages}
              showAll={showAll}
              onPageChange={setPage}
            />
          )}
        </section>
      </div>
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#12131A] p-5 shadow-2xl sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Tạo kinh nghiệm làm việc
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Thêm thông tin về công việc và quá trình công tác.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="rounded-lg px-3 py-1 text-xl text-gray-400 hover:bg-white/5 hover:text-white"
                aria-label="Đóng modal"
              >
                ×
              </button>
            </div>

            <Modal
              open={isCreateModalOpen}
              onClose={() => setIsCreateModalOpen(false)}
              title="Tạo kinh nghiệm làm việc"
              size="2xl"
              footer={null}
            >
              <FormCreateExperience
                companyName={companyName}
                setCompanyName={setCompanyName}
                description={description}
                setDescription={setDescription}
                displayOrder={displayOrder}
                setDisplayOrder={setDisplayOrder}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                isCurrent={isCurrent}
                setIsCurrent={setIsCurrent}
                position={position}
                setPosition={setPosition}
                onSubmit={handleCreateExperience}
              />

              {createExperience.isPending && (
                <p className="text-sm text-[#8B9FF8]">
                  Đang tạo kinh nghiệm...
                </p>
              )}

              {createExperience.isError && (
                <p className="text-sm text-red-400">
                  Tạo kinh nghiệm thất bại. Vui lòng thử lại.
                </p>
              )}
            </Modal>
          </div>
        </div>
      )}
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
};

export default ExperiencePage;
