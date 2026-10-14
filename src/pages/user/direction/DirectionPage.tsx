import React from "react";
import {
  Search,
  RefreshCw,
  Compass,
  X,
  AlertCircle,
  Plus,
  Trash2
} from "lucide-react";

import {
  useCreateDirection,
  useDeleteDirection,
  useGetALLDirection,
  useUpdateDirection
} from "../../../hooks/useDirection";
import type {
  CreateDirectionProps,
  DirectionProps
} from "../../../services/direction/directionTypes";

import DirectionStats from "./components/DirectionStats";
import DirectionCenterState from "./components/DirectionCenterState";
import DirectionTable from "./components/DirectionTable";
import DirectionDetailModal from "./components/DirectionDetailModal";
import { useGetAllSkill } from "../../../hooks/useSkill";
import { SkillProps } from "../../../services/skill/SkillTypes";
import Button from "../../../components/ui/Button";
import FormCreateDirection from "./FormCreateDirection/FormCreateDirection";
import Modal from "../../../components/ui/Modal";
import { Alert, Snackbar } from "@mui/material";
import { Notifications } from "../../../components/ui/Notification";
import FormUpdateDirection from "./FormUpdateDirection/FormUpdateDirection";

const panel = "rounded-2xl border border-white/[0.07] bg-[#0E1015]";

const DirectionPage: React.FC = () => {
  const { data: response, isLoading, isError, refetch } = useGetALLDirection();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedDirection, setSelectedDirection] =
    React.useState<DirectionProps | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [notification, setNotification] = React.useState<Notifications>({
    open: false,
    message: "",
    severity: "error"
  });
  const [title, setTitle] = React.useState("");
  const [code, setCode] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [icon, setIcon] = React.useState("");
  const [displayOrder, setDisplayOrder] = React.useState(0);
  const [skills, setSkills] = React.useState<string[]>([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);
  const [editingDirection, setEditingDirection] =
    React.useState<DirectionProps | null>(null);
  const [updateTitle, setUpdateTitle] = React.useState("");
  const [updateCode, setUpdateCode] = React.useState("");
  const [updateDescription, setUpdateDescription] = React.useState("");
  const [updateIcon, setUpdateIcon] = React.useState("");
  const [updateDisplayOrder, setUpdateDisplayOrder] = React.useState(0);
  const [updateSkills, setUpdateSkills] = React.useState<string[]>([]);
  const [deletingDirection, setDeletingDirection] =
    React.useState<DirectionProps | null>(null);

  const deleteDirection = useDeleteDirection(
    deletingDirection === null ? "" : deletingDirection.id
  );
  const updateDirection = useUpdateDirection(
    editingDirection !== null ? editingDirection.id : ""
  );
  const createDirection = useCreateDirection();
  const { data: skillResponse } = useGetAllSkill();

  const skillData: SkillProps[] = React.useMemo(() => {
    if (skillResponse === undefined || skillResponse === null) {
      return [];
    }

    if (Array.isArray(skillResponse)) {
      return skillResponse;
    }

    if ("data" in skillResponse && Array.isArray(skillResponse.data)) {
      return skillResponse.data;
    }

    return [];
  }, [skillResponse]);
  const directions: DirectionProps[] = React.useMemo(() => {
    if (response === undefined || response === null) {
      return [];
    }

    if (Array.isArray(response)) {
      return response;
    }

    if ("data" in response && Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  }, [response]);
  const resetCreateForm = (): void => {
    setTitle("");
    setCode("");
    setDescription("");
    setIcon("");
    setDisplayOrder(0);
    setSkills([]);
  };

  const handleCloseCreateModal = (): void => {
    if (createDirection.isPending) {
      return;
    }

    setIsCreateModalOpen(false);
    resetCreateForm();
  };

  const handleCreateDirection = (): void => {
    const payload: CreateDirectionProps = {
      title: title.trim(),
      code: code.trim(),
      description: description.trim(),
      icon: icon.trim(),
      displayOrder,
      skills
    };

    createDirection.mutate(payload, {
      onSuccess: () => {
        setNotification({
          open: true,
          message: "Tạo định hướng thành công",
          severity: "success"
        });
        setIsCreateModalOpen(false);
        resetCreateForm();
      }
    });
  };
  const handleOpenUpdateModal = (direction: DirectionProps): void => {
    setEditingDirection(direction);
    setUpdateTitle(direction.title);
    setUpdateCode(direction.code);
    setUpdateDescription(direction.description);
    setUpdateIcon(direction.icon);
    setUpdateDisplayOrder(direction.displayOrder);
    setUpdateSkills(direction.skills.map((skill) => skill.id));
    setIsUpdateModalOpen(true);
  };
  const handleCloseUpdateModal = (): void => {
    if (updateDirection.isPending) {
      return;
    }

    setIsUpdateModalOpen(false);
    setEditingDirection(null);
  };

  const handleUpdateDirection = (): void => {
    if (editingDirection === null) {
      return;
    }

    const payload: CreateDirectionProps = {
      title: updateTitle.trim(),
      code: updateCode.trim(),
      description: updateDescription.trim(),
      icon: updateIcon.trim(),
      displayOrder: updateDisplayOrder,
      skills: updateSkills
    };

    updateDirection.mutate(
      {
        id: editingDirection.id,
        ...payload
      },
      {
        onSuccess: () => {
          setNotification({
            open: true,
            message: "Cập nhật định hướng thành công",
            severity: "success"
          });

          setIsUpdateModalOpen(false);
          setEditingDirection(null);
        },
        onError: () => {
          setNotification({
            open: true,
            message: "Cập nhật định hướng thất bại",
            severity: "error"
          });
        }
      }
    );
  };
  const handleOpenDeleteModal = (direction: DirectionProps): void => {
    setDeletingDirection(direction);
  };
  const handleDeleteDirection = (): void => {
    if (deletingDirection === null) {
      return;
    }

    deleteDirection.mutate(undefined, {
      onSuccess: () => {
        setNotification({
          open: true,
          message: "Xóa định hướng thành công",
          severity: "success"
        });

        setDeletingDirection(null);
      },
      onError: () => {
        setNotification({
          open: true,
          message: "Xóa định hướng thất bại",
          severity: "error"
        });
      }
    });
  };
  const filteredDirections = React.useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    if (keyword.length === 0) {
      return directions;
    }

    return directions.filter((direction) => {
      const matchesDirection =
        direction.id.toLowerCase().includes(keyword) ||
        direction.code.toLowerCase().includes(keyword) ||
        direction.icon.toLowerCase().includes(keyword) ||
        direction.title.toLowerCase().includes(keyword) ||
        direction.description.toLowerCase().includes(keyword);

      const matchesSkill = direction.skills.some((skill) => {
        return (
          skill.id.toLowerCase().includes(keyword) ||
          skill.name.toLowerCase().includes(keyword) ||
          skill.category.toLowerCase().includes(keyword) ||
          skill.iconUrl.toLowerCase().includes(keyword)
        );
      });

      return matchesDirection || matchesSkill;
    });
  }, [directions, searchTerm]);

  const totalSkills = React.useMemo(() => {
    return directions.reduce((total, direction) => {
      return total + direction.skills.length;
    }, 0);
  }, [directions]);

  const totalCategories = React.useMemo(() => {
    const categories = new Set<string>();

    directions.forEach((direction) => {
      direction.skills.forEach((skill) => {
        categories.add(skill.category);
      });
    });

    return categories.size;
  }, [directions]);

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <DirectionCenterState
          icon={<RefreshCw size={26} className="animate-spin text-teal-300" />}
          title="Đang tải dữ liệu..."
          description="Vui lòng chờ trong giây lát."
        />
      );
    }

    if (isError) {
      return (
        <DirectionCenterState
          icon={<AlertCircle size={26} className="text-red-400" />}
          title="Không thể tải danh sách định hướng"
          description="Đã xảy ra lỗi khi lấy dữ liệu từ máy chủ. Hãy thử tải lại."
          action={
            <button
              type="button"
              onClick={() => {
                void refetch();
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-teal-300 px-4 py-2 text-sm font-semibold text-[#08090C] transition hover:bg-teal-200"
            >
              <RefreshCw size={15} />
              Thử lại
            </button>
          }
        />
      );
    }

    if (filteredDirections.length === 0) {
      return (
        <DirectionCenterState
          icon={<Search size={26} className="text-gray-500" />}
          title="Không tìm thấy định hướng"
          description={
            searchTerm.length > 0
              ? "Thử thay đổi từ khóa tìm kiếm."
              : "Hiện chưa có dữ liệu định hướng."
          }
          action={
            searchTerm.length > 0 ? (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                }}
                className="text-sm font-medium text-teal-300 transition hover:text-teal-200"
              >
                Xóa tìm kiếm
              </button>
            ) : undefined
          }
        />
      );
    }

    return (
      <DirectionTable
        directions={filteredDirections}
        onSelectDirection={setSelectedDirection}
        onUpdateDirection={handleOpenUpdateModal}
        onDeleteDirection={handleOpenDeleteModal}
      />
    );
  };

  return (
    <div className="flex w-full flex-col bg-[#08090C] text-[#ECECF1] antialiased lg:h-[calc(100dvh-64px)] lg:overflow-hidden">
      <style>{`
        .dir-scroll::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .dir-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,.12);
          border-radius: 9999px;
        }

        .dir-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,.12) transparent;
        }
      `}</style>

      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-4 p-4 sm:p-5">
        {/* Header */}
        <header className="flex shrink-0 flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-400/10">
              <Compass size={22} className="text-teal-300" />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight text-gray-50 sm:text-2xl">
                Quản lý định hướng
              </h1>

              <p className="mt-0.5 text-sm text-gray-400">
                Các định hướng phát triển và kỹ năng tương ứng.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-80">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
                placeholder="Tìm định hướng hoặc kỹ năng..."
                className="w-full rounded-xl border border-white/10 bg-[#0E1015] py-2.5 pl-9 pr-9 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-teal-300/50 focus:ring-2 focus:ring-teal-300/10"
              />

              {searchTerm.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                  }}
                  aria-label="Xóa tìm kiếm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 transition hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                void refetch();
              }}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/[0.09] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                size={15}
                className={isLoading ? "animate-spin" : ""}
              />
              Làm mới
            </button>
            <Button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-300 px-4 py-2.5 text-sm font-semibold text-[#08090C] transition hover:bg-teal-200"
            >
              <Plus size={16} />
              Tạo định hướng
            </Button>
          </div>
        </header>

        {/* Statistics */}
        <DirectionStats
          directions={directions.length}
          skills={totalSkills}
          categories={totalCategories}
        />

        {/* Table */}
        <section
          className={`${panel} flex min-h-[320px] flex-1 flex-col overflow-hidden`}
        >
          {renderTableBody()}

          {!isLoading && !isError && filteredDirections.length > 0 && (
            <div className="flex shrink-0 items-center justify-between border-t border-white/[0.07] px-5 py-3 text-xs text-gray-500">
              <p>
                Hiển thị{" "}
                <span className="font-semibold text-gray-300">
                  {filteredDirections.length}
                </span>{" "}
                / {directions.length} định hướng
              </p>

              <p>Tổng cộng {totalSkills} kỹ năng</p>
            </div>
          )}
        </section>
      </div>

      {/* Detail Modal */}
      {selectedDirection !== null && (
        <DirectionDetailModal
          direction={selectedDirection}
          onClose={() => {
            setSelectedDirection(null);
          }}
        />
      )}
      <Modal
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        title="Tạo định hướng mới"
        size="2xl"
        footer={
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseCreateModal}
              disabled={createDirection.isPending}
            >
              Hủy
            </Button>

            <Button
              type="button"
              onClick={handleCreateDirection}
              isLoading={createDirection.isPending}
              disabled={
                createDirection.isPending ||
                title.trim().length === 0 ||
                code.trim().length === 0
              }
            >
              Tạo định hướng
            </Button>
          </>
        }
      >
        <FormCreateDirection
          SkillData={skillData}
          title={title}
          setTitle={setTitle}
          code={code}
          setCode={setCode}
          description={description}
          setDescription={setDescription}
          icon={icon}
          setIcon={setIcon}
          displayOrder={displayOrder}
          setDisplayOrder={setDisplayOrder}
          skills={skills}
          setSkills={setSkills}
        />
      </Modal>
      <Modal
        open={deletingDirection !== null}
        onClose={() => {
          if (!deleteDirection.isPending) {
            setDeletingDirection(null);
          }
        }}
        title="Xác nhận xóa định hướng"
        size="md"
        footer={
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setDeletingDirection(null);
              }}
              disabled={deleteDirection.isPending}
            >
              Hủy
            </Button>

            <Button
              type="button"
              onClick={handleDeleteDirection}
              isLoading={deleteDirection.isPending}
              disabled={deletingDirection === null || deleteDirection.isPending}
            >
              Xóa định hướng
            </Button>
          </>
        }
      >
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-red-500/10 p-2 text-red-400">
            <Trash2 size={20} />
          </div>

          <div>
            <p className="text-sm text-gray-200">
              Bạn có chắc chắn muốn xóa định hướng này không?
            </p>

            {deletingDirection !== null && (
              <p className="mt-2 font-medium text-red-400">
                {deletingDirection.title}
              </p>
            )}

            <p className="mt-2 text-xs text-gray-400">
              Hành động này có thể ảnh hưởng đến các kỹ năng liên kết với định
              hướng.
            </p>
          </div>
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
      <Modal
        open={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        title="Cập nhật định hướng"
        size="2xl"
        footer={
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseUpdateModal}
              disabled={updateDirection.isPending}
            >
              Hủy
            </Button>

            <Button
              type="button"
              onClick={handleUpdateDirection}
              isLoading={updateDirection.isPending}
              disabled={
                updateDirection.isPending ||
                editingDirection === null ||
                updateTitle.trim().length === 0 ||
                updateCode.trim().length === 0
              }
            >
              Lưu thay đổi
            </Button>
          </>
        }
      >
        {editingDirection !== null && (
          <FormUpdateDirection
            id={editingDirection.id}
            SkillData={skillData}
            title={updateTitle}
            setTitle={setUpdateTitle}
            code={updateCode}
            setCode={setUpdateCode}
            description={updateDescription}
            setDescription={setUpdateDescription}
            icon={updateIcon}
            setIcon={setUpdateIcon}
            displayOrder={updateDisplayOrder}
            setDisplayOrder={setUpdateDisplayOrder}
            skills={updateSkills}
            setSkills={setUpdateSkills}
          />
        )}
      </Modal>
    </div>
  );
};

export default DirectionPage;
