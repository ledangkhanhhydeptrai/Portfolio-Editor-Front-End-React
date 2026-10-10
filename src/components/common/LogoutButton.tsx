import { LogOut, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useLogout } from "../../hooks/useLogout";

interface LogoutButtonProps {
  onLogout: () => void;
  /** Chỉ hiện icon (dùng khi sidebar thu gọn) */
  collapsed?: boolean;
  className?: string;
}

export default function LogoutButton({
  onLogout,
  collapsed = false,
  className = ""
}: LogoutButtonProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { setIsAuthenticated } = useAuth();
  const { mutate: logout, isPending, isError, reset } = useLogout();

  const handleLogout = () => {
    reset();

    logout(undefined, {
      onSuccess: () => {
        setIsAuthenticated(false);
        onLogout();
        navigate("/login", { replace: true });
      }
    });
  };

  const label = isPending ? "Đang đăng xuất..." : "Đăng xuất";

  return (
    <div>
      <button
        type="button"
        onClick={handleLogout}
        disabled={isPending}
        title={collapsed ? "Đăng xuất" : undefined}
        aria-label="Đăng xuất"
        className={`group flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:cursor-not-allowed disabled:opacity-60 ${
          collapsed ? "justify-center" : "gap-3"
        } ${
          isDark
            ? "text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
            : "text-rose-600 hover:bg-rose-50 hover:text-rose-700"
        } ${className}`}
      >
        {isPending ? (
          <Loader2 size={17} className="shrink-0 animate-spin" />
        ) : (
          <LogOut
            size={17}
            className="shrink-0 transition-transform group-hover:translate-x-0.5"
          />
        )}

        {!collapsed && <span>{label}</span>}
      </button>

      {isError && (
        <p
          role="alert"
          className={`px-3 pt-2 text-xs ${
            isDark ? "text-rose-400" : "text-rose-600"
          }`}
        >
          Đăng xuất thất bại. Vui lòng thử lại.
        </p>
      )}
    </div>
  );
}
