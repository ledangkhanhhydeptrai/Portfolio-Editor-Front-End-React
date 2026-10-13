import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetExperienceById,
  useUpdateExperience
} from "../../../hooks/useExperience";
import type {
  CreateExperienceProps,
  ExperienceProps
} from "../../../services/experience/ExperienceTypes";
import {
  DetailDescription,
  DetailHeader,
  DetailOverview,
  DetailPeriod,
  DetailRecordInfo,
  EmptyState,
  ErrorState,
  LoadingState,
  MissingIdState
} from "./components";
import { PAGE_HEIGHT } from "./utils";
import UpdateFormExperience from "./UpdateFormExperience/UpdateFormExperience";
import Modal from "../../../components/ui/Modal";
import { Alert, Snackbar } from "@mui/material";
import { Notifications } from "../../../components/ui/Notification";

const ExperienceIdPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [companyName, setCompanyName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [displayOrder, setDisplayOrder] = React.useState(0);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [isCurrent, setIsCurrent] = React.useState(false);
  const [position, setPosition] = React.useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);
  const [notification, setNotification] = React.useState<Notifications>({
    open: false,
    message: "",
    severity: "error"
  });
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetExperienceById(id || "");
  const updateExperience = useUpdateExperience(id || "");

  const experience: ExperienceProps | null =
    data && data.data ? data.data : null;
  React.useEffect(() => {
    if (isUpdateModalOpen && experience !== null) {
      setCompanyName(experience.companyName);
      setDescription(experience.description);
      setDisplayOrder(experience.displayOrder);
      setStartDate(experience.startDate);
      setEndDate(experience.endDate || "");
      setIsCurrent(experience.isCurrent);
      setPosition(experience.position);
    }
  }, [isUpdateModalOpen, experience]);
  const goBack = () => navigate(-1);
  const renderBody = () => {
    if (!id) return <MissingIdState onBack={goBack} />;
    if (isLoading) return <LoadingState />;
    if (isError) return <ErrorState error={error} onRetry={() => refetch()} />;
    if (experience === null) return <EmptyState onBack={goBack} />;

    return (
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-3 lg:grid-rows-1">
        {/* Trái: tổng quan + mô tả (mô tả cuộn bên trong) */}
        <div className="flex min-h-0 flex-col gap-3 lg:col-span-2">
          <DetailOverview experience={experience} />
          <DetailDescription experience={experience} />
        </div>

        {/* Phải: thời gian + thông tin bản ghi */}
        <div className="flex min-h-0 flex-col gap-3 lg:overflow-auto">
          <DetailPeriod experience={experience} />
          <DetailRecordInfo experience={experience} />
        </div>
      </div>
    );
  };

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (id === undefined || experience === null) {
      return;
    }

    if (
      companyName.trim().length === 0 ||
      position.trim().length === 0 ||
      description.trim().length === 0 ||
      startDate.length === 0
    ) {
      return;
    }

    if (!isCurrent && endDate.length === 0) {
      return;
    }

    if (!isCurrent && endDate < startDate) {
      return;
    }

    if (!Number.isInteger(displayOrder) || displayOrder < 0) {
      return;
    }

    const payload: CreateExperienceProps = {
      companyName: companyName.trim(),
      position: position.trim(),
      description: description.trim(),
      displayOrder,
      startDate,
      endDate: isCurrent ? "" : endDate,
      isCurrent
    };

    updateExperience.mutate(payload, {
      onSuccess: () => {
        setNotification({
          open: true,
          message: "Cập nhật kinh nghiệm thành công",
          severity: "success"
        });
        setIsUpdateModalOpen(false);
      }
    });
  };
  return (
    // Cao cố định = 100dvh - header layout (80px) trên desktop; mobile cuộn tự nhiên.
    <div
      className={`flex w-full flex-col bg-[#090A0D] text-[#ECECF1] antialiased lg:overflow-hidden ${PAGE_HEIGHT}`}
    >
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-3 p-4 sm:p-5">
        <DetailHeader
          isFetching={isFetching}
          onBack={goBack}
          onRefresh={() => refetch()}
          onUpdate={() => setIsUpdateModalOpen(true)}
        />
        {renderBody()}
        {experience !== null && (
          <Modal
            open={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            title="Cập nhật kinh nghiệm"
            size="xl"
          >
            <UpdateFormExperience
              open={isUpdateModalOpen}
              experience={experience}
              onClose={() => setIsUpdateModalOpen(false)}
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
              onSubmit={handleUpdate}
            />
          </Modal>
        )}
      </div>
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

export default ExperienceIdPage;
