import { LogOut, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLogout } from "../../hooks/useLogout";


interface LogoutButtonProps {
  onLogout: () => void;
  className?: string;
}

export default function LogoutButton({
  onLogout,
  className = ""
}: LogoutButtonProps) {
  const navigate = useNavigate();
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

  return (
    <div>
      <button
        type="button"
        onClick={handleLogout}
        disabled={isPending}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      >
        {isPending ? (
          <Loader2 size={17} className="animate-spin" />
        ) : (
          <LogOut size={17} />
        )}

        <span>{isPending ? "Đang đăng xuất..." : "Đăng xuất"}</span>
      </button>

      {isError && (
        <p className="px-3 pt-2 text-xs text-red-500">
          Đăng xuất thất bại. Vui lòng thử lại.
        </p>
      )}
    </div>
  );
}
