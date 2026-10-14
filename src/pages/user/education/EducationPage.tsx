import React from "react";
import { Plus } from "lucide-react";
import {
  useGetAllEducation,
  useCreateEducation,
  useUpdateEducation,
  useDeleteEducation
} from "../../../hooks/useEducation";
import EducationHeader from "./components/EducationHeader";
import EducationStats from "./components/EducationStats";
import EducationSearch from "./components/EducationSearch";
import EducationTable from "./components/EducationTable";
import EducationCard from "./components/EducationCard";
import EducationContentState from "./components/EducationContentState";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import type {
  EducationProps,
  CreateEducationProps
} from "../../../services/education/EducationTypes";
import FormCreateEducation from "./FormCreateEducation/FormCreateEducation";
import { Notifications } from "../../../components/ui/Notification";
import { Alert, Snackbar } from "@mui/material";
import UpdateFormEducation from "./UpdateFormEducation/UpdateFormEducation";

const PAGE_HEIGHT = "h-[calc(100dvh-64px)]";

const cardClass = "rounded-xl border border-white/[0.07] bg-[#111218]";

const initialForm: CreateEducationProps = {
  degree: "",
  description: "",
  displayOrder: 0,
  endYear: 0,
  major: "",
  schoolName: "",
  startYear: 0
};

const EducationPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);

  const [form, setForm] = React.useState<CreateEducationProps>(initialForm);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetAllEducation();
  const [isUpdateOpen, setIsUpdateOpen] = React.useState(false);

  const [selectedEducation, setSelectedEducation] =
    React.useState<EducationProps | null>(null);
  const updateEducation = useUpdateEducation(
    selectedEducation === null ? "" : selectedEducation.id
  );
  const createEducation = useCreateEducation();

  const educations: EducationProps[] = data && data.data ? data.data : [];

  const keyword = searchTerm.trim().toLowerCase();

  const filteredEducations = educations.filter((education) => {
    return (
      education.schoolName.toLowerCase().includes(keyword) ||
      education.degree.toLowerCase().includes(keyword) ||
      education.major.toLowerCase().includes(keyword)
    );
  });

  const totalEducation = educations.length;
  const currentYear = new Date().getFullYear();

  const completedEducation = educations.filter(
    (education) => education.endYear <= currentYear
  ).length;

  const studyingEducation = educations.filter(
    (education) => education.endYear > currentYear
  ).length;
  const [notification, setNotification] = React.useState<Notifications>({
    open: false,
    message: "",
    severity: "error"
  });
  const updateForm = <K extends keyof CreateEducationProps>(
    field: K,
    value: CreateEducationProps[K]
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value
    }));
  };

  const resetForm = () => {
    setForm({ ...initialForm });
  };

  const openCreateModal = () => {
    resetForm();
    setIsCreateOpen(true);
  };

  const closeCreateModal = () => {
    if (createEducation.isPending) {
      return;
    }

    setIsCreateOpen(false);
    resetForm();
  };

  const handleCreateEducation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createEducation.mutate(form, {
      onSuccess: () => {
        setNotification({
          open: true,
          message: "Tạo học vấn thành công",
          severity: "success"
        });
        setIsCreateOpen(false);
        resetForm();
      }
    });
  };

  const renderContentState = (type: "loading" | "error" | "empty") => (
    <EducationContentState
      type={type}
      error={error}
      searchTerm={searchTerm}
      onRetry={() => refetch()}
    />
  );
  const openUpdateModal = (education: EducationProps) => {
    setSelectedEducation(education);

    setForm({
      degree: education.degree,
      description: education.description,
      displayOrder: education.displayOrder,
      endYear: education.endYear,
      major: education.major,
      schoolName: education.schoolName,
      startYear: education.startYear
    });

    setIsUpdateOpen(true);
  };
  const handleUpdateEducation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedEducation === null) {
      return;
    }

    updateEducation.mutate(form, {
      onSuccess: () => {
        setNotification({
          open: true,
          message: "Cập nhật học vấn thành công",
          severity: "success"
        });

        setIsUpdateOpen(false);
        setSelectedEducation(null);
        resetForm();
      },
      onError: () => {
        setNotification({
          open: true,
          message: "Cập nhật học vấn thất bại",
          severity: "error"
        });
      }
    });
  };
  const closeUpdateModal = () => {
    if (updateEducation.isPending) {
      return;
    }

    setIsUpdateOpen(false);
    setSelectedEducation(null);
    resetForm();
  };
  const deleteEducation = useDeleteEducation(
    selectedEducation === null ? "" : selectedEducation.id
  );
  const handleDeleteEducation = (education: EducationProps) => {
    if (deleteEducation.isPending || updateEducation.isPending) {
      return;
    }

    const isConfirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa thông tin học vấn tại "${education.schoolName}" không?`
    );

    if (!isConfirmed) {
      return;
    }

    // Đảm bảo mutation dùng đúng ID của dòng được chọn.
    if (selectedEducation === null || selectedEducation.id !== education.id) {
      setSelectedEducation(education);
    }

    deleteEducation.mutate(undefined, {
      onSuccess: () => {
        setNotification({
          open: true,
          message: "Xóa học vấn thành công",
          severity: "success"
        });

        if (
          selectedEducation !== null &&
          selectedEducation.id === education.id
        ) {
          setIsUpdateOpen(false);
          setSelectedEducation(null);
          resetForm();
        }
      },
      onError: () => {
        setNotification({
          open: true,
          message: "Xóa học vấn thất bại",
          severity: "error"
        });
      }
    });
  };

  return (
    <div
      className={`flex w-full flex-col overflow-hidden bg-[#090A0D] text-[#ECECF1] antialiased ${PAGE_HEIGHT}`}
    >
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-5 overflow-y-auto p-4 sm:p-5">
        <EducationHeader isFetching={isFetching} onRefresh={() => refetch()} />

        <EducationStats
          totalEducation={totalEducation}
          completedEducation={completedEducation}
          studyingEducation={studyingEducation}
        />

        <section className={`${cardClass} flex min-h-0 flex-1 flex-col`}>
          <div className="flex flex-col gap-3 border-b border-white/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold">Danh sách học vấn</h2>
              <p className="mt-1 text-xs text-gray-500">
                Thông tin học tập được tải từ hệ thống.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <EducationSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <Button onClick={openCreateModal}>
                <Plus size={16} />
                Thêm học vấn
              </Button>
            </div>
          </div>

          {isLoading ? (
            renderContentState("loading")
          ) : isError ? (
            renderContentState("error")
          ) : filteredEducations.length === 0 ? (
            renderContentState("empty")
          ) : (
            <>
              <EducationTable
                items={filteredEducations}
                currentYear={currentYear}
                onEdit={openUpdateModal}
                onDelete={handleDeleteEducation}
              />

              <div className="grid grid-cols-1 gap-3 p-3 md:hidden">
                {filteredEducations.map((education) => (
                  <EducationCard
                    key={education.id}
                    education={education}
                    currentYear={currentYear}
                    onEdit={openUpdateModal}
                  />
                ))}
              </div>
            </>
          )}

          {!isLoading && !isError && filteredEducations.length > 0 && (
            <div className="border-t border-white/[0.07] px-4 py-3 text-xs text-gray-500">
              Hiển thị {filteredEducations.length} / {totalEducation} bản ghi
            </div>
          )}
        </section>
      </div>

      <Modal
        open={isCreateOpen}
        onClose={closeCreateModal}
        title="Thêm thông tin học vấn"
        size="2xl"
      >
        <FormCreateEducation
          degree={form.degree}
          setDegree={(value) => updateForm("degree", value)}
          description={form.description}
          setDescription={(value) => updateForm("description", value)}
          displayOrder={form.displayOrder}
          setDisplayOrder={(value) => updateForm("displayOrder", value)}
          endYear={form.endYear}
          setEndYear={(value) => updateForm("endYear", value)}
          major={form.major}
          setMajor={(value) => updateForm("major", value)}
          schoolName={form.schoolName}
          setSchoolName={(value) => updateForm("schoolName", value)}
          startYear={form.startYear}
          setStartYear={(value) => updateForm("startYear", value)}
          onSubmit={handleCreateEducation}
        />
      </Modal>
      <Modal
        open={isUpdateOpen}
        onClose={closeUpdateModal}
        title="Cập nhật thông tin học vấn"
        size="2xl"
      >
        {selectedEducation !== null && (
          <UpdateFormEducation
            education={selectedEducation}
            degree={form.degree}
            setDegree={(value) => updateForm("degree", value)}
            description={form.description}
            setDescription={(value) => updateForm("description", value)}
            displayOrder={form.displayOrder}
            setDisplayOrder={(value) => updateForm("displayOrder", value)}
            endYear={form.endYear}
            setEndYear={(value) => updateForm("endYear", value)}
            major={form.major}
            setMajor={(value) => updateForm("major", value)}
            schoolName={form.schoolName}
            setSchoolName={(value) => updateForm("schoolName", value)}
            startYear={form.startYear}
            setStartYear={(value) => updateForm("startYear", value)}
            onSubmit={handleUpdateEducation}
          />
        )}
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
};

export default EducationPage;
