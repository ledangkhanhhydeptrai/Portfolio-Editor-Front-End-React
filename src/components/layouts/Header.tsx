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
import Avatar from "../ui/Avatar";

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated, user, authReady } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

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
    email: user && user.email ? user.email : "",
    avatarUrl: user && user.avatarUrl ? user.avatarUrl : ""
  };

  const initials = currentUser.name
    .trim()
    .split(/\s+/)
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

  useEffect(() => {
    setAvatarError(false);
  }, [currentUser.avatarUrl]);

  const headerClass = isDark
    ? "border-white/10 bg-slate-950/80 text-white"
    : "border-slate-200 bg-white/80 text-slate-900";

  const mutedTextClass = isDark ? "text-slate-400" : "text-slate-500";

  const hoverClass = isDark
    ? "hover:bg-white/10 hover:text-white"
    : "hover:bg-slate-100 hover:text-slate-900";

  const dropdownClass = isDark
    ? "border-white/10 bg-slate-900"
    : "border-slate-200 bg-white";

  const dropdownTextClass = isDark ? "text-slate-200" : "text-slate-700";

  const dividerClass = isDark ? "border-white/10" : "border-slate-200";

  const renderAvatar = (sizeClass: string) => {
    if (currentUser.avatarUrl && !avatarError) {
      return (
        <img
          src={currentUser.avatarUrl}
          alt={`${currentUser.name} avatar`}
          className={`${sizeClass} shrink-0 rounded-full border border-slate-200/20 object-cover`}
          onError={() => setAvatarError(true)}
        />
      );
    }

    return (
      <div
        aria-label={`${currentUser.name} avatar`}
        className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white`}
      >
        {initials}
      </div>
    );
  };

  return (
    <header
      className={`sticky top-0 z-30 flex min-h-20 items-center justify-between gap-4 overflow-visible border-b px-4 py-2 backdrop-blur-md transition-colors sm:px-6 lg:px-8 ${headerClass}`}
    >
      {/* Decorative glow + gradient bottom line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-purple-500/5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-indigo-500/60 via-purple-500/30 to-transparent"
      />

      {/* Left: Menu (mobile) and page information */}
      <div className="relative flex min-w-0 items-center gap-3 sm:gap-4">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open sidebar"
            className={`shrink-0 rounded-lg p-2 transition lg:hidden ${hoverClass}`}
          >
            <Menu size={21} />
          </button>
        )}

        {/* Accent bar */}
        <span
          aria-hidden="true"
          className="hidden h-12 w-1 shrink-0 rounded-full bg-gradient-to-b from-indigo-400 to-purple-500 sm:block"
        />

        <div className="min-w-0">
          {/* Breadcrumb */}
          <div
            className={`flex items-center gap-2 text-xs leading-4 ${mutedTextClass}`}
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
          <h1 className="truncate text-xl font-bold leading-7 tracking-tight sm:text-2xl sm:leading-8">
            {currentPage.title}
          </h1>

          <p
            className={`hidden truncate text-xs leading-4 sm:block ${mutedTextClass}`}
          >
            {currentPage.description}
          </p>
        </div>
      </div>

      {/* Right: Theme, website link and account */}
      <div className="relative flex shrink-0 items-center gap-2 sm:gap-3">
        {/* Toggle theme */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          title={isDark ? "Light mode" : "Dark mode"}
          className={`rounded-xl p-2.5 transition ${hoverClass}`}
        >
          {isDark ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        {/* View website */}
        <a
          href="https://khanhhy-portfolio.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition sm:inline-flex ${
            isDark
              ? "border-white/10 bg-white/5 text-slate-200 hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:text-white"
              : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
          }`}
        >
          <span>View site</span>
          <ExternalLink size={15} />
        </a>

        {/* Divider */}
        <span
          aria-hidden="true"
          className={`hidden h-8 w-px sm:block ${
            isDark ? "bg-white/10" : "bg-slate-200"
          }`}
        />

        {/* Account dropdown */}
        {!authReady ? null : isAuthenticated && user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen((previous) => !previous)}
              aria-expanded={isOpen}
              aria-haspopup="menu"
              aria-label="Open account menu"
              className={`flex items-center gap-2 rounded-2xl p-1.5 transition sm:gap-3 sm:pr-3 ${hoverClass}`}
            >
              {/* Header avatar and user name */}
              <span className="rounded-full p-0.5 ring-2 ring-indigo-500/40">
                <Avatar
                  name={currentUser.name}
                  src={currentUser.avatarUrl}
                  size={40}
                />
              </span>

              <div className="hidden min-w-0 text-left md:block">
                <p className="max-w-36 truncate text-sm font-semibold">
                  {currentUser.name}
                </p>
                <p className={`max-w-36 truncate text-xs ${mutedTextClass}`}>
                  {currentUser.email}
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
                className={`absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border shadow-2xl ${dropdownClass}`}
              >
                {/* User details */}
                <div
                  className={`border-b bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-4 ${dividerClass}`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {renderAvatar("h-11 w-11")}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {currentUser.name}
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
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
