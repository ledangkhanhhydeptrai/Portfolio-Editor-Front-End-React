import React from "react";
import { NavLink } from "react-router-dom";
import {
  Video,
  Share2,
  Palette,
  Compass,
  Wrench,
  FolderKanban,
  Briefcase,
  GraduationCap,
  UserRound,
  FileText,
  ChevronLeft,
  X
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  /** Mobile drawer (< lg). Optional, so existing usages keep working. */
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const menuItems = [
  {
    title: "Content",
    items: [
      { name: "Videos", path: "/video", icon: Video },
      { name: "Social links", path: "/social-links", icon: Share2 }
    ]
  },
  {
    title: "Portfolio",
    items: [
      { name: "Work styles", path: "/work-styles", icon: Palette },
      { name: "Directions", path: "/directions", icon: Compass },
      { name: "Skills", path: "/skills", icon: Wrench },
      { name: "Projects", path: "/projects", icon: FolderKanban },
      { name: "Experience", path: "/experiences", icon: Briefcase },
      { name: "Education", path: "/educations", icon: GraduationCap },
      { name: "Profile", path: "/profile", icon: UserRound },
      { name: "CV", path: "/curriculum", icon: FileText }
    ]
  }
];

const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  onToggle,
  mobileOpen = false,
  onMobileClose
}) => {
  // On mobile the drawer is always expanded; "collapsed" only applies from lg up.
  const hideWhenCollapsed = collapsed ? "lg:hidden" : "";
  const { isAuthenticated, user } = useAuth();

  React.useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onMobileClose?.();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, onMobileClose]);

  return (
    <>
      {/* Backdrop for the mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[45] bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/*
        Mobile: drawer cố định.
        Desktop (lg+): nằm cạnh nội dung, cao full màn hình và dính ở top-0,
        nên Header giờ nằm bên phải sidebar.
      */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col overflow-hidden
  border-r border-slate-200 bg-white text-slate-900
  transition-all duration-300
  dark:border-white/10 dark:bg-slate-950 dark:text-white
  lg:sticky lg:top-0 lg:z-30 lg:translate-x-0 lg:self-start
  ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
  ${collapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-indigo-500/15 via-purple-500/5 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl"
        />

        {/* Brand */}
        <div
          className={`relative flex h-20 shrink-0 items-center justify-between
  border-b border-slate-200 px-5
  dark:border-white/10
  ${collapsed ? "lg:justify-center lg:px-0" : ""}`}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-lg font-bold text-white shadow-lg shadow-indigo-500/30">
              P
            </div>

            {isAuthenticated && user && (
              <div className={`min-w-0 ${hideWhenCollapsed}`}>
                <p className="truncate text-sm font-semibold leading-tight text-slate-900 dark:text-white">
                  Portfolio
                </p>

                <p className="mt-0.5 truncate text-xs leading-tight text-slate-500 dark:text-slate-400">
                  {user.fullName}
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onMobileClose}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="relative flex-1 overflow-y-auto px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {menuItems.map((group, groupIndex) => (
            <div key={group.title} className="mb-3">
              <h2
                className={`mb-1.5 px-3 text-xs font-medium text-slate-500 dark:text-slate-400 ${hideWhenCollapsed}`}
              >
                {group.title}
              </h2>

              {/* Divider replaces the group title when collapsed */}
              {groupIndex > 0 && (
                <div
                  className={`mx-3 mb-3 hidden h-px bg-slate-200 dark:bg-white/10 ${
                    collapsed ? "lg:block" : ""
                  }`}
                />
              )}

              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      title={collapsed ? item.name : undefined}
                      onClick={onMobileClose}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-3 rounded-xl px-2 py-1
  text-sm font-medium transition-colors
  focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
  ${
    isActive
      ? "bg-gradient-to-r from-indigo-500/15 via-indigo-500/5 to-transparent text-indigo-700 dark:text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
  }
  ${collapsed ? "lg:justify-center lg:px-0" : ""}`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute -left-3 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-indigo-400" />
                          )}

                          <span
                            className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition ${
                              isActive
                                ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/30"
                                : "bg-slate-100 text-slate-500 group-hover:text-slate-900 dark:bg-white/5 dark:text-slate-400 dark:group-hover:text-white"
                            }`}
                          >
                            <Icon size={17} strokeWidth={isActive ? 2.2 : 1.8} />
                          </span>

                          <span className={`truncate ${hideWhenCollapsed}`}>
                            {item.name}
                          </span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse toggle (desktop only) */}
        <div className="relative hidden shrink-0 border-t border-slate-200 p-2 dark:border-white/10 lg:block">
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="flex w-full items-center justify-center gap-3 rounded-xl px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
          >
            <ChevronLeft
              size={19}
              className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
            />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;