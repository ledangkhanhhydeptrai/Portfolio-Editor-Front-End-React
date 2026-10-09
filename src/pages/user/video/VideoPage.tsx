import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Play,
  ExternalLink,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Video
} from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";

type VideoStatus = "Published" | "Draft";
type StatusFilter = "All" | VideoStatus;
type SortKey = "newest" | "oldest" | "views" | "title";
type ViewMode = "table" | "grid";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  videoUrl: string;
  duration: string;
  category: string;
  status: VideoStatus;
  createdAt: string;
  views: number;
}

const PAGE_SIZE = 10;

const initialVideos: VideoItem[] = [
  {
    id: "1",
    title: "My Portfolio Introduction",
    description: "A short introduction to my portfolio.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400",
    videoUrl: "https://example.com/video-1",
    duration: "02:35",
    category: "Introduction",
    status: "Published",
    createdAt: "2026-10-01",
    views: 1250
  },
  {
    id: "2",
    title: "Project Showcase 2026",
    description: "Showcase of my latest development projects.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
    videoUrl: "https://example.com/video-2",
    duration: "04:20",
    category: "Project",
    status: "Published",
    createdAt: "2026-09-25",
    views: 860
  },
  {
    id: "3",
    title: "Behind the Scenes",
    description: "A look at my creative workflow.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400",
    videoUrl: "https://example.com/video-3",
    duration: "01:45",
    category: "Behind the Scenes",
    status: "Draft",
    createdAt: "2026-09-20",
    views: 0
  },
  {
    id: "4",
    title: "Building a Design System from Scratch",
    description: "How I structure tokens, components and documentation.",
    videoUrl: "https://example.com/video-4",
    duration: "08:12",
    category: "Tutorial",
    status: "Published",
    createdAt: "2026-09-14",
    views: 2310
  },
  {
    id: "5",
    title: "Client Case Study: Online Store Redesign",
    description: "From research to launch, and the results after 3 months.",
    videoUrl: "https://example.com/video-5",
    duration: "05:48",
    category: "Project",
    status: "Published",
    createdAt: "2026-09-02",
    views: 940
  },
  {
    id: "6",
    title: "My Developer Setup",
    description: "Tools, editor config and daily workflow.",
    videoUrl: "https://example.com/video-6",
    duration: "03:30",
    category: "Behind the Scenes",
    status: "Draft",
    createdAt: "2026-08-28",
    views: 0
  },
  {
    id: "7",
    title: "Animating Interfaces with CSS",
    description: "Practical motion patterns you can reuse in any project.",
    videoUrl: "https://example.com/video-7",
    duration: "06:05",
    category: "Tutorial",
    status: "Published",
    createdAt: "2026-08-15",
    views: 1780
  }
];

const sortLabels: Record<SortKey, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  views: "Most viewed",
  title: "Title A–Z"
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

/* ---------- Small building blocks ---------- */

const Thumbnail: React.FC<{
  video: VideoItem;
  className?: string;
}> = ({ video, className = "" }) => {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(video.thumbnailUrl) && !failed;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 ${className}`}
    >
      {showImage ? (
        <img
          src={video.thumbnailUrl}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-slate-400">
          <Play size={20} className="fill-current" />
        </div>
      )}

      <span className="absolute bottom-1 right-1 rounded bg-slate-950/80 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white">
        {video.duration}
      </span>
    </div>
  );
};

const Checkbox: React.FC<{
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  label: string;
}> = ({ checked, indeterminate = false, onChange, label }) => (
  <input
    type="checkbox"
    aria-label={label}
    checked={checked}
    onChange={onChange}
    ref={(element) => {
      if (element) element.indeterminate = indeterminate;
    }}
    className="h-4 w-4 cursor-pointer rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
  />
);

const PublishSwitch: React.FC<{
  published: boolean;
  onChange: () => void;
  title: string;
}> = ({ published, onChange, title }) => (
  <button
    type="button"
    role="switch"
    aria-checked={published}
    aria-label={`${published ? "Unpublish" : "Publish"} ${title}`}
    onClick={onChange}
    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
      published ? "bg-indigo-600" : "bg-slate-300"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
        published ? "translate-x-4" : "translate-x-0.5"
      }`}
    />
  </button>
);

const IconButton: React.FC<{
  label: string;
  onClick: () => void;
  danger?: boolean;
  children: React.ReactNode;
}> = ({ label, onClick, danger = false, children }) => (
  <button
    type="button"
    onClick={onClick}
    title={label}
    aria-label={label}
    className={`rounded-lg p-2 text-slate-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
      danger
        ? "hover:bg-red-50 hover:text-red-600"
        : "hover:bg-slate-100 hover:text-slate-900"
    }`}
  >
    {children}
  </button>
);

const controlClass =
  "rounded-lg border border-slate-200 bg-white py-2 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

/* ---------- Page ---------- */

const VideoPage: React.FC = () => {
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const [videos, setVideos] = useState<VideoItem[]>(initialVideos);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [sortKey, setSortKey] = useState<SortKey>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState<string[] | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(videos.map((video) => video.category)))
    ],
    [videos]
  );

  const counts = useMemo(
    () => ({
      All: videos.length,
      Published: videos.filter((video) => video.status === "Published").length,
      Draft: videos.filter((video) => video.status === "Draft").length
    }),
    [videos]
  );

  const totalViews = useMemo(
    () => videos.reduce((total, video) => total + video.views, 0),
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
        categoryFilter === "All" || video.category === categoryFilter;
      const matchesStatus =
        statusFilter === "All" || video.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    return [...result].sort((a, b) => {
      switch (sortKey) {
        case "oldest":
          return a.createdAt.localeCompare(b.createdAt);
        case "views":
          return b.views - a.views;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return b.createdAt.localeCompare(a.createdAt);
      }
    });
  }, [videos, searchTerm, categoryFilter, statusFilter, sortKey]);

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
    searchTerm !== "" || categoryFilter !== "All" || statusFilter !== "All";

  useEffect(() => {
    setPage(1);
  }, [searchTerm, categoryFilter, statusFilter, sortKey]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!pendingDelete) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPendingDelete(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [pendingDelete]);

  /* ----- Handlers ----- */

  const handleCreate = () => {
    // TODO: Navigate to the video creation page.
    // Example: navigate("/videos/create");
  };

  const handleEdit = (id: string) => {
    // TODO: Navigate to the video editing page.
    // Example: navigate(`/videos/edit/${id}`);
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

  const setPublished = (ids: string[], published: boolean) => {
    // TODO: Call the API to update the status.
    setVideos((prev) =>
      prev.map((video) =>
        ids.includes(video.id)
          ? { ...video, status: published ? "Published" : "Draft" }
          : video
      )
    );
    setToast(
      ids.length === 1
        ? published
          ? "Video published"
          : "Video moved to drafts"
        : published
          ? `${ids.length} videos published`
          : `${ids.length} videos moved to drafts`
    );
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    // TODO: Call the API to delete the videos.
    const ids = pendingDelete;
    setVideos((prev) => prev.filter((video) => !ids.includes(video.id)));
    setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
    setPendingDelete(null);
    setToast(
      ids.length === 1 ? "Video deleted" : `${ids.length} videos deleted`
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All");
    setStatusFilter("All");
  };

  const pendingDeleteTitle =
    pendingDelete && pendingDelete.length === 1
      ? videos.find((video) => video.id === pendingDelete[0])?.title
      : undefined;

  /* ----- Pieces ----- */

  const emptyState = (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-3 rounded-xl bg-slate-100 p-3.5">
        <Video size={24} className="text-slate-400" />
      </div>
      <p className="font-medium text-slate-900">
        {videos.length === 0 ? "No videos yet" : "No videos match your filters"}
      </p>
      <p className="mt-1 max-w-xs text-sm text-slate-600">
        {videos.length === 0
          ? "Add your first video to show it on your portfolio."
          : "Try a different keyword, or clear the filters to see everything."}
      </p>
      {videos.length === 0 ? (
        <button
          type="button"
          onClick={handleCreate}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus size={16} />
          Add video
        </button>
      ) : (
        hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Clear filters
          </button>
        )
      )}
    </div>
  );

  const statusBadge = (status: VideoStatus) => (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${
        status === "Published" ? "text-emerald-700" : "text-amber-700"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Published" ? "bg-emerald-500" : "bg-amber-500"
        }`}
      />
      {status}
    </span>
  );

  const stats = [
    {
      label: "Total videos",
      value: counts.All.toString(),
      hint: "In your library"
    },
    {
      label: "Published",
      value: counts.Published.toString(),
      hint: "Visible to visitors"
    },
    {
      label: "Drafts",
      value: counts.Draft.toString(),
      hint: "Not visible yet"
    },
    {
      label: "Total views",
      value: totalViews.toLocaleString(),
      hint: "Across published videos"
    }
  ];

  return (
    <div
      className={`flex min-h-0 flex-1 flex-col gap-6 p-2 transition-colors ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"
      }`}
    >
      {/* Page heading */}
      <div className="flex shrink-0 flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2
            className={`text-2xl font-semibold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Videos
          </h2>
          <p
            className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            Upload, organize and publish the videos shown on your portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <Plus size={18} />
          Add video
        </button>
      </div>
      {/* Statistics: one strip instead of four separate cards */}
      <dl
        className={`grid shrink-0 grid-cols-2 gap-px overflow-hidden rounded-xl border lg:grid-cols-4 ${
          isDark ? "border-black bg-black" : "border-slate-200 bg-slate-200"
        }`}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${isDark ? "bg-slate-900" : "bg-white"} px-5 py-4`}
          >
            <dt
              className={`text-sm ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              {stat.label}
            </dt>

            <dd
              className={`mt-1 text-2xl font-semibold tabular-nums ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {stat.value}
            </dd>

            <p
              className={`mt-0.5 text-xs ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              {stat.hint}
            </p>
          </div>
        ))}
      </dl>
      {/* Library */}

      <section
        className={`flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border shadow-sm ${
          isDark ? "border-black bg-slate-900" : "border-slate-200 bg-white"
        }`}
      >
        {/* Status tabs + view toggle */}
        <div
          className={`flex shrink-0 items-center justify-between gap-4 border-b px-4 sm:px-5 ${
            isDark ? "border-black" : "border-slate-200"
          }`}
        >
          <div className="-mb-px flex gap-5 overflow-x-auto" role="tablist">
            {(["All", "Published", "Draft"] as StatusFilter[]).map((tab) => {
              const active = statusFilter === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setStatusFilter(tab)}
                  className={`flex items-center gap-2 whitespace-nowrap border-b-2 py-3.5 text-sm font-medium transition-colors ${
                    active
                      ? "border-indigo-600 text-indigo-700"
                      : isDark
                        ? "border-transparent text-slate-400 hover:text-white"
                        : "border-transparent text-slate-600 hover:text-slate-800"
                  }`}
                >
                  {tab === "Draft" ? "Drafts" : tab}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-xs tabular-nums ${
                      active
                        ? isDark
                          ? "bg-indigo-950 text-indigo-300"
                          : "bg-indigo-50 text-indigo-700"
                        : isDark
                          ? "bg-slate-800 text-slate-300"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {counts[tab]}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className={`hidden shrink-0 rounded-lg border p-0.5 sm:flex ${
              isDark ? "border-black" : "border-slate-200"
            }`}
            role="group"
            aria-label="View mode"
          >
            {(
              [
                { mode: "table", label: "Table view", Icon: List },
                { mode: "grid", label: "Grid view", Icon: LayoutGrid }
              ] as const
            ).map(({ mode, label, Icon }) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                aria-label={label}
                aria-pressed={viewMode === mode}
                title={label}
                className={`rounded-md p-1.5 transition ${
                  viewMode === mode
                    ? "bg-indigo-600 text-white"
                    : isDark
                      ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Filters or bulk-action bar */}
        {selectedIds.length > 0 ? (
          <div
            className={`flex shrink-0 flex-wrap items-center gap-2 border-b px-4 py-3 sm:px-5 ${
              isDark
                ? "border-black bg-indigo-950/40"
                : "border-indigo-100 bg-indigo-50"
            }`}
          >
            <p
              className={`mr-2 text-sm font-medium ${
                isDark ? "text-indigo-200" : "text-indigo-900"
              }`}
            >
              {selectedIds.length} selected
            </p>

            <button
              type="button"
              onClick={() => setPublished(selectedIds, true)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ring-1 transition ${
                isDark
                  ? "bg-slate-900 text-slate-200 ring-black hover:bg-slate-800"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              Publish
            </button>

            <button
              type="button"
              onClick={() => setPublished(selectedIds, false)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ring-1 transition ${
                isDark
                  ? "bg-slate-900 text-slate-200 ring-black hover:bg-slate-800"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              Move to drafts
            </button>

            <button
              type="button"
              onClick={() => setPendingDelete(selectedIds)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ring-1 transition ${
                isDark
                  ? "bg-slate-900 text-red-400 ring-black hover:bg-red-950/40"
                  : "bg-white text-red-600 ring-slate-200 hover:bg-red-50"
              }`}
            >
              Delete
            </button>

            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className={`ml-auto rounded-lg px-3 py-1.5 text-sm ${
                isDark
                  ? "text-indigo-300 hover:bg-indigo-950"
                  : "text-indigo-700 hover:bg-indigo-100"
              }`}
            >
              Clear selection
            </button>
          </div>
        ) : (
          <div
            className={`flex shrink-0 flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:px-5 ${
              isDark ? "border-black" : "border-slate-200"
            }`}
          >
            <div className="relative sm:w-72">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by title or description"
                aria-label="Search videos"
                className={`${controlClass} w-full pl-9 pr-3`}
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              aria-label="Filter by category"
              className={`${controlClass} px-3`}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "All" ? "All categories" : category}
                </option>
              ))}
            </select>

            <select
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value as SortKey)}
              aria-label="Sort videos"
              className={`${controlClass} px-3 sm:ml-auto`}
            >
              {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                <option key={key} value={key}>
                  {sortLabels[key]}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Content */}
        {filteredVideos.length === 0 ? (
          emptyState
        ) : viewMode === "table" ? (
          <div className="min-h-0 flex-1 overflow-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead
                className={`sticky top-0 z-10 border-b text-xs font-medium ${
                  isDark
                    ? "border-black bg-slate-800 text-slate-300"
                    : "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                <tr>
                  <th className="w-12 py-3 pl-5">
                    <Checkbox
                      checked={allOnPageSelected}
                      indeterminate={someOnPageSelected}
                      onChange={togglePageSelection}
                      label="Select all videos on this page"
                    />
                  </th>
                  <th className="px-3 py-3 font-medium">Video</th>
                  <th className="px-3 py-3 font-medium">Category</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 text-right font-medium">Views</th>
                  <th className="px-3 py-3 font-medium">Created</th>
                  <th className="px-5 py-3 text-right font-medium">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>

              <tbody
                className={`divide-y ${
                  isDark ? "divide-black" : "divide-slate-100"
                }`}
              >
                {pageVideos.map((video) => {
                  const isSelected = selectedIds.includes(video.id);
                  const isPublished = video.status === "Published";

                  return (
                    <tr
                      key={video.id}
                      className={`transition-colors ${
                        isSelected
                          ? isDark
                            ? "bg-indigo-950/40"
                            : "bg-indigo-50/50"
                          : isDark
                            ? "hover:bg-slate-800/70"
                            : "hover:bg-slate-50/70"
                      }`}
                    >
                      <td className="py-3 pl-5">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => toggleSelected(video.id)}
                          label={`Select ${video.title}`}
                        />
                      </td>

                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                          <Thumbnail
                            video={video}
                            className="h-14 w-24 shrink-0 rounded-md"
                          />
                          <div className="min-w-0 max-w-xs">
                            <p
                              className={`truncate font-semibold ${
                                isDark ? "text-slate-100" : "text-slate-900"
                              }`}
                            >
                              {video.title}
                            </p>
                            <p
                              className={`mt-0.5 line-clamp-1 text-xs ${
                                isDark ? "text-slate-400" : "text-slate-600"
                              }`}
                            >
                              {video.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-3">
                        <span
                          className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${
                            isDark
                              ? "bg-indigo-950 text-indigo-300"
                              : "bg-indigo-50 text-indigo-700"
                          }`}
                        >
                          {video.category}
                        </span>
                      </td>

                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                          <PublishSwitch
                            published={isPublished}
                            title={video.title}
                            onChange={() =>
                              setPublished([video.id], !isPublished)
                            }
                          />
                          {statusBadge(video.status)}
                        </div>
                      </td>

                      <td
                        className={`px-3 py-3 text-right font-medium tabular-nums ${
                          isDark ? "text-slate-200" : "text-slate-800"
                        }`}
                      >
                        {video.views > 0 ? video.views.toLocaleString() : "–"}
                      </td>

                      <td
                        className={`whitespace-nowrap px-3 py-3 ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        {formatDate(video.createdAt)}
                      </td>

                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end">
                          <IconButton
                            label="Open video"
                            onClick={() => handleView(video.videoUrl)}
                          >
                            <ExternalLink size={16} />
                          </IconButton>
                          <IconButton
                            label="Edit video"
                            onClick={() => handleEdit(video.id)}
                          >
                            <Pencil size={16} />
                          </IconButton>
                          <IconButton
                            label="Delete video"
                            danger
                            onClick={() => setPendingDelete([video.id])}
                          >
                            <Trash2 size={16} />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <ul className="grid min-h-0 flex-1 content-start gap-4 overflow-y-auto p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3">
            {pageVideos.map((video) => {
              const isSelected = selectedIds.includes(video.id);
              const isPublished = video.status === "Published";

              return (
                <li
                  key={video.id}
                  className={`overflow-hidden rounded-lg border transition-colors ${
                    isSelected
                      ? "border-indigo-400 ring-1 ring-indigo-400"
                      : isDark
                        ? "border-black"
                        : "border-slate-200"
                  } ${isDark ? "bg-slate-900" : "bg-white"}`}
                >
                  <div className="relative">
                    <Thumbnail video={video} className="aspect-video w-full" />
                    <div
                      className={`absolute left-2 top-2 rounded p-1 ${
                        isDark ? "bg-slate-900/90" : "bg-white/90"
                      }`}
                    >
                      <Checkbox
                        checked={isSelected}
                        onChange={() => toggleSelected(video.id)}
                        label={`Select ${video.title}`}
                      />
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p
                        className={`line-clamp-2 font-semibold ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        {video.title}
                      </p>
                      <PublishSwitch
                        published={isPublished}
                        title={video.title}
                        onChange={() => setPublished([video.id], !isPublished)}
                      />
                    </div>

                    <p
                      className={`mt-1 text-xs ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      <span
                        className={`font-medium ${
                          isDark ? "text-indigo-300" : "text-indigo-700"
                        }`}
                      >
                        {video.category}
                      </span>{" "}
                      • {formatDate(video.createdAt)}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div
                        className={`flex items-center gap-3 text-xs ${
                          isDark ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {statusBadge(video.status)}
                        <span className="tabular-nums">
                          {video.views.toLocaleString()} views
                        </span>
                      </div>

                      <div className="-mr-2 flex items-center">
                        <IconButton
                          label="Open video"
                          onClick={() => handleView(video.videoUrl)}
                        >
                          <ExternalLink size={16} />
                        </IconButton>
                        <IconButton
                          label="Edit video"
                          onClick={() => handleEdit(video.id)}
                        >
                          <Pencil size={16} />
                        </IconButton>
                        <IconButton
                          label="Delete video"
                          danger
                          onClick={() => setPendingDelete([video.id])}
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* Pagination */}
        {filteredVideos.length > 0 && (
          <div
            className={`flex shrink-0 flex-col gap-3 border-t px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-5 ${
              isDark
                ? "border-black text-slate-400"
                : "border-slate-200 text-slate-600"
            }`}
          >
            <p>
              Showing {pageStart + 1}–{pageStart + pageVideos.length} of{" "}
              {filteredVideos.length}
              {filteredVideos.length !== videos.length &&
                ` (filtered from ${videos.length})`}
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={`rounded-lg p-2 disabled:cursor-not-allowed disabled:opacity-40 ${
                  isDark
                    ? "hover:bg-slate-800 disabled:hover:bg-transparent"
                    : "hover:bg-slate-100 disabled:hover:bg-transparent"
                }`}
              >
                <ChevronLeft size={16} />
              </button>

              <span className="px-2 tabular-nums">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className={`rounded-lg p-2 disabled:cursor-not-allowed disabled:opacity-40 ${
                  isDark
                    ? "hover:bg-slate-800 disabled:hover:bg-transparent"
                    : "hover:bg-slate-100 disabled:hover:bg-transparent"
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Delete confirmation */}
      {pendingDelete && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
        >
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setPendingDelete(null)}
          />
          <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h3
              id="delete-dialog-title"
              className="text-base font-semibold text-slate-900"
            >
              {pendingDelete.length === 1
                ? `Delete “${pendingDeleteTitle ?? "this video"}”?`
                : `Delete ${pendingDelete.length} videos?`}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              {pendingDelete.length === 1
                ? "This video will be removed from your portfolio."
                : "These videos will be removed from your portfolio."}{" "}
              This can't be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                autoFocus
                onClick={() => setPendingDelete(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Toast */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm text-white shadow-lg"
        >
          <Check size={16} className="text-emerald-400" />
          {toast}
          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Dismiss"
            className="-mr-1 ml-1 rounded p-0.5 text-slate-400 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPage;
