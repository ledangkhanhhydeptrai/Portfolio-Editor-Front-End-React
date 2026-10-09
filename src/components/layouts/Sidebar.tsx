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
          className="fixed inset-0 z-[45] bg-slate-900/50 lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col
  border-r border-slate-200 bg-white text-slate-900
  transition-all duration-300
  dark:border-white/10 dark:bg-slate-950 dark:text-white
  lg:sticky lg:bottom-auto lg:top-16 lg:z-30
  lg:h-[calc(100vh-4rem)] lg:translate-x-0
  ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
  ${collapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Brand */}
        <div
          className={`flex h-16 shrink-0 items-center justify-between
  border-b border-slate-200 px-5
  dark:border-white/10
  ${collapsed ? "lg:justify-center lg:px-0" : ""}`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-base font-bold text-white">
              P
            </div>

            <div className={hideWhenCollapsed}>
              <p
                className={`text-sm font-semibold leading-tight text-slate-900 dark:text-white ${hideWhenCollapsed}`}
              >
                Portfolio
              </p>

              <p
                className={`text-xs leading-tight text-slate-500 dark:text-slate-400 ${hideWhenCollapsed}`}
              >
                Admin
              </p>
            </div>
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
          className="flex-1 overflow-y-auto px-3 py-4"
        >
          {menuItems.map((group, groupIndex) => (
            <div key={group.title} className="mb-5">
              <h2
                className={`mb-1.5 px-3 text-xs font-medium text-slate-500 dark:text-slate-400 ${hideWhenCollapsed}`}
              >
                {group.title}
              </h2>

              {/* Divider replaces the group title when collapsed */}
              {groupIndex > 0 && (
                <div
                  className={`mx-3 mb-3 hidden h-px bg-white/10 ${
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
                        `relative flex items-center gap-3 rounded-lg px-3 py-2
  text-sm font-medium transition-colors
  focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
  ${
    isActive
      ? "bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
  }
  ${collapsed ? "lg:justify-center" : ""}`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute -left-3 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r bg-indigo-400" />
                          )}

                          <Icon
                            size={19}
                            strokeWidth={isActive ? 2.2 : 1.8}
                            className="shrink-0"
                          />

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
        <div className="hidden shrink-0 border-t border-slate-200 p-3 dark:border-white/10 lg:block">
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
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
