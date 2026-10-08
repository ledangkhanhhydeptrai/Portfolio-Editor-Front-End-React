import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

/* Đọc giá trị từ form, không cần lưu giá trị nhạy cảm vào state hay gán chuỗi cố định */
const readField = (data: FormData, key: string): string =>
  String(data.get(key) ?? "");

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    loginMutation.mutate(
      {
        email: readField(data, "email"),
        password: readField(data, "password"),
      },
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  };
  const fieldClass =
    "w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-lg font-bold text-white">
              P
            </div>

            <h1 className="text-2xl font-bold text-slate-900">Đăng nhập</h1>

            <p className="mt-2 text-sm text-slate-500">
              Đăng nhập vào Portfolio Editor
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Nhập email"
                autoComplete="email"
                required
                className={fieldClass}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Mật khẩu
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-slate-500 hover:text-slate-900"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Nhập mật khẩu"
                autoComplete="current-password"
                required
                className={fieldClass}
              />
            </div>

            {loginMutation.isError && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.
              </div>
            )}

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loginMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="font-semibold text-slate-900 hover:underline"
            >
              Đăng ký
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Portfolio Editor
        </p>
      </div>
    </main>
  );
};

export default AuthPage;
