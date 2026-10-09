import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ExternalLink,
  Menu,
  Moon,
  Sun,
  UserRound
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import LogoutButton from "../common/LogoutButton";
import { useAuth } from "../../contexts/AuthContext";
import { HeaderProps, PageMeta, pageMeta } from "../../types/HeaderTypes";

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, authReady } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const currentPath = location.pathname;

  const matchedPath = Object.keys(pageMeta)
    .sort((a, b) => b.length - a.length)
    .find((path) => currentPath === path || currentPath.startsWith(`${path}/`));

  const currentPage: PageMeta = matchedPath
    ? pageMeta[matchedPath]
    : {
        title: "Dashboard",
        description: "Welcome to your dashboard",
        parent: "Dashboard"
      };

  const currentUser = {
    name: user && user.fullName ? user.fullName : "Người dùng",
    email: user && user.email ? user.email : ""
  };
  console.log("User", user && user.fullName);
  const initials = currentUser.name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const headerClass = isDark
    ? "border-white/10 bg-slate-950 text-white"
    : "border-slate-200 bg-white text-slate-900";

  const mutedTextClass = isDark ? "text-slate-400" : "text-slate-500";

  const hoverClass = isDark
    ? "hover:bg-white/10 hover:text-white"
    : "hover:bg-slate-100 hover:text-slate-900";

  const dropdownClass = isDark
    ? "border-white/10 bg-slate-900"
    : "border-slate-200 bg-white";

  const dropdownTextClass = isDark ? "text-slate-200" : "text-slate-700";

  const dividerClass = isDark ? "border-white/10" : "border-slate-200";

  return (
    <header
      className={`relative z-30 flex min-h-20 items-center justify-between gap-4 border-b px-4 py-3 transition-colors sm:px-6 lg:px-8 ${headerClass}`}
    >
      {/* Left: Menu and page information */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open sidebar"
            className={`shrink-0 rounded-lg p-2 transition ${hoverClass}`}
          >
            <Menu size={21} />
          </button>
        )}

        <div className="min-w-0">
          {/* Breadcrumb */}
          <div
            className={`mb-1 flex items-center gap-2 text-xs ${mutedTextClass}`}
          >
            <Link to="/" className="transition hover:text-indigo-500">
              Dashboard
            </Link>

            {currentPath !== "/" && (
              <>
                <span>/</span>
                <span className="truncate">{currentPage.title}</span>
              </>
            )}
          </div>

          {/* Page title */}
          <h1 className="truncate text-lg font-semibold sm:text-xl">
            {currentPage.title}
          </h1>

          <p className={`hidden truncate text-xs sm:block ${mutedTextClass}`}>
            {currentPage.description}
          </p>
        </div>
      </div>

      {/* Right: Theme, website link and account */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {/* Toggle theme */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          title={isDark ? "Light mode" : "Dark mode"}
          className={`rounded-lg p-2 transition ${hoverClass}`}
        >
          {isDark ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        {/* View website */}
        <a
          href="https://khanhhy-portfolio.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition sm:inline-flex ${
            isDark
              ? "border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
              : "border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <span>View site</span>
          <ExternalLink size={15} />
        </a>

        {/* Account dropdown */}
        {!authReady ? null : isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen((previous) => !previous)}
              aria-expanded={isOpen}
              aria-haspopup="menu"
              className={`flex items-center gap-2 rounded-xl p-1.5 transition sm:gap-3 sm:px-2 ${hoverClass}`}
            >
              {/* User information */}
              <div className="hidden min-w-0 text-left md:block">
                <p className="max-w-36 truncate text-sm font-medium">
                  {initials}
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`hidden transition-transform sm:block ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {isOpen && (
              <div
                role="menu"
                className={`absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-xl border shadow-2xl ${dropdownClass}`}
              >
                {/* User details */}
                <div className={`border-b p-4 ${dividerClass}`}>
                  <div className="flex items-center gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {initials}
                      </p>

                      <p className={`truncate text-xs ${mutedTextClass}`}>
                        {currentUser.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="p-2">
                  <Link
                    to="/profile"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${dropdownTextClass} ${hoverClass}`}
                  >
                    <UserRound size={17} />
                    <span>My Profile</span>
                  </Link>
                </div>

                {/* Logout */}
                <div className={`border-t p-2 ${dividerClass}`}>
                  <LogoutButton onLogout={() => setIsOpen(false)} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
