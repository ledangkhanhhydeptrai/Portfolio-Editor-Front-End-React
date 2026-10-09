import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ExternalLink,
  LogOut,
  Menu,
  Settings,
  UserRound
} from "lucide-react";

interface HeaderProps {
  /** Opens the sidebar drawer on mobile. Optional. */
  onMenuClick?: () => void;
}

// Keep in sync with the routes in Sidebar.
const pageMeta: Record<string, { section: string; title: string }> = {
  "/video": { section: "Content", title: "Videos" },
  "/videos": { section: "Content", title: "Videos" },
  "/social-links": { section: "Content", title: "Social links" },
  "/work-styles": { section: "Portfolio", title: "Work styles" },
  "/directions": { section: "Portfolio", title: "Directions" },
  "/skills": { section: "Portfolio", title: "Skills" },
  "/projects": { section: "Portfolio", title: "Projects" },
  "/experiences": { section: "Portfolio", title: "Experience" },
  "/educations": { section: "Portfolio", title: "Education" },
  "/profile": { section: "Portfolio", title: "Profile" },
  "/curriculum": { section: "Portfolio", title: "CV" },
  "/settings": { section: "Account", title: "Settings" }
};

// TODO: replace with the signed-in user from your auth store.
const currentUser = {
  name: "Admin User",
  email: "admin@example.com",
  role: "Administrator"
};

const initials = currentUser.name
  .split(" ")
  .map((part) => part[0])
  .slice(0, 2)
  .join("")
  .toUpperCase();

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const matchedPath = Object.keys(pageMeta).find(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
  const page = matchedPath
    ? pageMeta[matchedPath]
    : { section: "Admin", title: "Dashboard" };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = () => {
    // TODO: Call the logout API if the backend supports it.
    // Clear credentials according to the project's auth mechanism.
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-slate-950 px-4 sm:px-6 lg:px-8">
      {/* Left: menu button + breadcrumb */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="-ml-1 rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 items-center gap-2 text-sm"
        >
          <span className="hidden text-slate-400 sm:inline">
            {page.section}
          </span>
          <span className="hidden text-slate-600 sm:inline" aria-hidden="true">
            /
          </span>
          <h1 className="truncate font-semibold text-white">{page.title}</h1>
        </nav>
      </div>

      {/* Right: view site + user menu */}
      <div className="flex items-center gap-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:inline-flex"
        >
          View site
          <ExternalLink size={14} />
        </a>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-haspopup="menu"
            className="flex items-center gap-2.5 rounded-lg py-1.5 pl-1.5 pr-2.5 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white"
            >
              {initials}
            </span>

            <span className="hidden text-left leading-tight md:block">
              <span className="block text-sm font-medium text-white">
                {currentUser.name}
              </span>
              <span className="block text-xs text-slate-400">
                {currentUser.role}
              </span>
            </span>

            <ChevronDown
              size={16}
              className={`text-slate-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg"
            >
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="truncate text-sm font-medium text-slate-900">
                  {currentUser.name}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {currentUser.email}
                </p>
              </div>

              <div className="py-1">
                <Link
                  to="/profile"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <UserRound size={17} className="text-slate-400" />
                  Profile
                </Link>

                <Link
                  to="/settings"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <Settings size={17} className="text-slate-400" />
                  Settings
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
