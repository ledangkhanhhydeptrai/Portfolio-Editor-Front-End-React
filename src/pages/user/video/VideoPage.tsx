import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
// TODO: adjust this path to where your useVideo hook lives.
import { useVideo } from "../../../hooks/useVideo";

import BulkActionBar from "./components/BulkActionBar";
import DeleteDialog from "./components/DeleteDialog";
import EmptyState from "./components/EmptyState";
import ErrorState from "./components/ErrorState";
import LoadingState from "./components/LoadingState";
import Pagination from "./components/Pagination";
import Toast from "./components/Toast";
import VideoFilters from "./components/VideoFilters";
import VideoGrid from "./components/VideoGrid";
import VideoHeader from "./components/VideoHeader";
import VideoStats from "./components/VideoStats";
import VideoTable from "./components/VideoTable";

import { PAGE_SIZE } from "./constants";
import type { SortKey, ViewMode } from "./types";
import { VideoEnum, VideoProps } from "../../../services/video/VideoTypes";

const VideoPage: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { data, isLoading, isError, refetch } = useVideo();

  const [removedIds, setRemovedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<VideoEnum | "OTHER">(
    "OTHER"
  );
  const [sortKey, setSortKey] = useState<SortKey>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState<string[] | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  /* ----- Data from the API ----- */

  // Accepts both the full response ({ status, message, data: [...] })
  // and an already-unwrapped array, depending on what the service returns.
  const videos = useMemo<VideoProps[]>(() => {
    const raw: unknown = data;
    const list = Array.isArray(raw)
      ? raw
      : (raw as { data?: unknown } | undefined)?.data;

    return (Array.isArray(list) ? (list as VideoProps[]) : []).filter(
      (video) => !removedIds.includes(video.id)
    );
  }, [data, removedIds]);

  /* ----- Derived data ----- */

  const categories = useMemo(
    () => Array.from(new Set(videos.map((video) => video.category))),
    [videos]
  );

  const filteredVideos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const result = videos.filter((video) => {
      const matchesSearch =
        query === "" ||
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query);
      const matchesCategory =
        categoryFilter === VideoEnum.OTHER || video.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    return [...result].sort((a, b) => {
      switch (sortKey) {
        case "newest":
          return b.year - a.year || a.displayOrder - b.displayOrder;
        case "oldest":
          return a.year - b.year || a.displayOrder - b.displayOrder;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return a.displayOrder - b.displayOrder;
      }
    });
  }, [videos, searchTerm, categoryFilter, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filteredVideos.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageVideos = filteredVideos.slice(pageStart, pageStart + PAGE_SIZE);

  const allOnPageSelected =
    pageVideos.length > 0 &&
    pageVideos.every((video) => selectedIds.includes(video.id));
  const someOnPageSelected =
    pageVideos.some((video) => selectedIds.includes(video.id)) &&
    !allOnPageSelected;

  const hasActiveFilters =
    searchTerm !== "" || categoryFilter !== VideoEnum.OTHER;

  const pendingDeleteTitle =
    pendingDelete && pendingDelete.length === 1
      ? videos.find((video) => video.id === pendingDelete[0])?.title
      : undefined;

  /* ----- Effects ----- */

  useEffect(() => {
    setPage(1);
  }, [searchTerm, categoryFilter, sortKey]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  /* ----- Handlers ----- */

  const handleCreate = () => {
    // TODO: Navigate to the video creation page.
    // Example: navigate("/video/create");
  };

  const handleEdit = (id: string) => {
    // TODO: Navigate to the video editing page.
    // Example: navigate(`/video/edit/${id}`);
    console.log("Edit video:", id);
  };

  const handleView = (videoUrl: string) => {
    window.open(videoUrl, "_blank", "noopener,noreferrer");
  };

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const togglePageSelection = () => {
    const pageIds = pageVideos.map((video) => video.id);
    setSelectedIds((prev) =>
      allOnPageSelected
        ? prev.filter((id) => !pageIds.includes(id))
        : Array.from(new Set([...prev, ...pageIds]))
    );
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    const ids = pendingDelete;

    // TODO: Call the delete API (e.g. a useMutation), then invalidate
    // queryClient.invalidateQueries({ queryKey: ["video"] }).
    // Until then the videos are only hidden locally.
    setRemovedIds((prev) => [...prev, ...ids]);
    setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
    setPendingDelete(null);
    setToast(
      ids.length === 1 ? "Video deleted" : `${ids.length} videos deleted`
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter(VideoEnum.OTHER);
  };

  /* ----- Render ----- */

  const renderBody = () => {
    if (isLoading) return <LoadingState isDark={isDark} />;
    if (isError) return <ErrorState onRetry={() => refetch()} />;

    return (
      <>
        {selectedIds.length > 0 ? (
          <BulkActionBar
            isDark={isDark}
            selectedCount={selectedIds.length}
            onDelete={() => setPendingDelete(selectedIds)}
            onClear={() => setSelectedIds([])}
          />
        ) : (
          <VideoFilters
            isDark={isDark}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categories={categories}
            categoryFilter={categoryFilter}
            onCategoryChange={(value) => setCategoryFilter(value as VideoEnum)}
            sortKey={sortKey}
            onSortChange={setSortKey}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        )}

        {filteredVideos.length === 0 ? (
          <EmptyState
            isLibraryEmpty={videos.length === 0}
            hasActiveFilters={hasActiveFilters}
            onCreate={handleCreate}
            onClearFilters={clearFilters}
          />
        ) : viewMode === "table" ? (
          <VideoTable
            isDark={isDark}
            videos={pageVideos}
            selectedIds={selectedIds}
            allSelected={allOnPageSelected}
            someSelected={someOnPageSelected}
            onToggleAll={togglePageSelection}
            onToggleSelected={toggleSelected}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={setPendingDelete}
          />
        ) : (
          <VideoGrid
            isDark={isDark}
            videos={pageVideos}
            selectedIds={selectedIds}
            onToggleSelected={toggleSelected}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={setPendingDelete}
          />
        )}

        {filteredVideos.length > 0 && (
          <Pagination
            isDark={isDark}
            from={pageStart + 1}
            to={pageStart + pageVideos.length}
            total={filteredVideos.length}
            libraryTotal={videos.length}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </>
    );
  };

  return (
    <div
      className={`flex min-h-0 flex-1 flex-col gap-6 p-2 transition-colors ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"
      }`}
    >
      <VideoHeader isDark={isDark} onCreate={handleCreate} />

      <VideoStats isDark={isDark} videos={videos} />

      <section
        className={`flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border shadow-sm ${
          isDark ? "border-black bg-slate-900" : "border-slate-200 bg-white"
        }`}
      >
        {renderBody()}
      </section>

      {pendingDelete && (
        <DeleteDialog
          count={pendingDelete.length}
          title={pendingDeleteTitle}
          onCancel={() => setPendingDelete(null)}
          onConfirm={confirmDelete}
        />
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default VideoPage;
