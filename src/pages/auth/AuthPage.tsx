import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import loginStyles from "./components/loginStyles";
import WorkBento from "./components/WorkBento";
import LoginField from "./components/LoginField";
import { CheckIcon, EyeIcon, LockIcon, MailIcon, ShieldIcon, Spinner } from "./components/LoginIcons";

const RECOVERY_PATH = "";

const REMEMBER_COOKIE_NAME = "portfolio_remembered_email";
const REMEMBER_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

const getRememberedEmail = (): string => {
  if (typeof document === "undefined") {
    return "";
  }

  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const separatorIndex = cookie.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = cookie.substring(0, separatorIndex);
    const value = cookie.substring(separatorIndex + 1);

    if (key === REMEMBER_COOKIE_NAME) {
      try {
        return decodeURIComponent(value);
      } catch {
        return "";
      }
    }
  }

  return "";
};

const saveRememberedEmail = (email: string): void => {
  if (typeof document === "undefined") {
    return;
  }

  const encodedEmail = encodeURIComponent(email);

  document.cookie =
    `${REMEMBER_COOKIE_NAME}=${encodedEmail}; ` +
    `Max-Age=${REMEMBER_COOKIE_MAX_AGE}; ` +
    "Path=/; " +
    "SameSite=Lax";
};

const removeRememberedEmail = (): void => {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie =
    `${REMEMBER_COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`;
};

const heading = "font-['Bricolage_Grotesque',sans-serif]";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const [email, setEmail] = React.useState<string>("");
  const [revealed, setRevealed] = React.useState<boolean>(false);
  const [remember, setRemember] = React.useState<boolean>(false);
  const [capsOn, setCapsOn] = React.useState<boolean>(false);

  React.useEffect(() => {
    const rememberedEmail = getRememberedEmail();

    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRemember(true);
    }
  }, []);

  const emailValid = /^\S+@\S+\.\S+$/.test(email);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const passwordValue = String(data.get("password") || "");

    loginMutation.mutate(
      {
        email: email.trim(),
        password: passwordValue
      },
      {
        onSuccess: () => {
          if (remember) {
            saveRememberedEmail(email.trim());
          } else {
            removeRememberedEmail();
          }

          navigate("/");
        }
      }
    );
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>): void => {
    const rect = event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty(
      "--x",
      `${event.clientX - rect.left}px`
    );

    event.currentTarget.style.setProperty(
      "--y",
      `${event.clientY - rect.top}px`
    );
  };

  return (
    <main className="relative grid min-h-screen overflow-hidden bg-[#070b1f] font-['Figtree',system-ui,sans-serif] text-white lg:h-screen lg:min-h-[640px] grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <style>{loginStyles}</style>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="lp-drift absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#4f5df0]/45 blur-[120px]" />

        <div className="lp-drift absolute -right-32 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[#a855f7]/35 blur-[120px] [animation-delay:-6s]" />

        <div className="lp-drift absolute -bottom-48 left-1/3 h-[30rem] w-[30rem] rounded-full bg-[#06b6d4]/25 blur-[120px] [animation-delay:-11s]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      <aside className="relative flex min-h-0 min-w-0 flex-col justify-between gap-8 px-6 py-8 sm:px-12 lg:gap-5 lg:px-16 lg:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`${heading} grid h-12 w-12 place-items-center rounded-2xl bg-white text-base font-bold text-[#070b1f]`}
            >
              P
            </span>

            <div className="leading-tight">
              <p className="font-semibold">Portfolio Editor</p>

              <p className="text-sm text-white/55">Creative workspace</p>
            </div>
          </div>

          <span className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ade80]" />
            </span>
            Workspace active
          </span>
        </div>

        <div>
          <h1
            className={`${heading} text-5xl font-bold leading-[1] tracking-[-0.03em] sm:text-7xl lg:text-[clamp(3rem,9vh,6rem)]`}
          >
            Build.
            <br />
            Create.
            <br />
            <span className="text-white/50">Publish.</span>
          </h1>

          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-white/65 lg:mt-4">
            Quản lý portfolio, dự án, kỹ năng và nội dung của bạn trong một
            workspace duy nhất.
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4 lg:min-h-[180px]">
          <WorkBento />

          <div className="w-full min-w-0 max-w-full shrink-0 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <ul
              className="lp-marquee flex w-max gap-2.5"
              aria-label="Workspace features"
            >
              <li className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80">
                Projects
              </li>

              <li className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80">
                Skills
              </li>

              <li className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80">
                Experience
              </li>

              <li className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80">
                CV
              </li>

              <li className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80">
                Videos
              </li>

              <li className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80">
                Projects
              </li>

              <li className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80">
                Skills
              </li>

              <li className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80">
                Experience
              </li>

              <li className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80">
                CV
              </li>

              <li className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80">
                Videos
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link
            to="/"
            className="text-white/65 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white"
          >
            Home
          </Link>

          <Link
            to="/"
            className="text-white/65 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white"
          >
            Portfolio
          </Link>
        </div>
      </aside>

      <section
        onMouseMove={handleMouseMove}
        className="group relative flex min-w-0 flex-col overflow-hidden border-t border-white/10 bg-[#0b1030]/60 px-6 py-8 backdrop-blur-xl sm:px-12 lg:border-l lg:border-t-0 lg:px-16 lg:py-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(520px circle at var(--x, 50%) var(--y, 30%), rgba(129,140,248,0.14), transparent 60%)"
          }}
        />

        <div className="relative flex h-12 items-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 pl-3 pr-4 text-sm text-white/80">
            <ShieldIcon />
            Khu vực quản trị
          </span>
        </div>

        <div className="relative flex flex-1 items-center justify-center py-6">
          <form
            onSubmit={handleLogin}
            noValidate
            className="w-full max-w-[580px]"
          >
            <h2
              className={`${heading} text-[clamp(2.5rem,6.5vh,3.75rem)] font-bold leading-[1.12] tracking-[-0.02em]`}
            >
              Đăng nhập
            </h2>

            <p className="mt-3 text-[clamp(1rem,2.1vh,1.25rem)] leading-relaxed text-white/60">
              Quản lý dự án và nội dung portfolio của bạn.
            </p>

            <div className="mt-[clamp(1.5rem,4.5vh,2.75rem)] space-y-[clamp(0.75rem,1.8vh,1.25rem)]">
              <LoginField
                id="email"
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={setEmail}
                icon={<MailIcon />}
                trailing={
                  emailValid ? (
                    <span
                      aria-hidden="true"
                      className="absolute right-4 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-[#4ade80]/15 text-[#4ade80]"
                    >
                      <CheckIcon />
                    </span>
                  ) : undefined
                }
              />

              <LoginField
                id="password"
                name="password"
                label="Mật khẩu"
                type={revealed ? "text" : "password"}
                autoComplete="current-password"
                className={revealed ? "" : "!text-xl !tracking-[0.22em]"}
                onKeyEvent={(event) => {
                  setCapsOn(event.getModifierState("CapsLock"));
                }}
                onBlurField={() => {
                  setCapsOn(false);
                }}
                icon={<LockIcon />}
                trailing={
                  <button
                    type="button"
                    onClick={() => {
                      setRevealed((value) => !value);
                    }}
                    aria-label={revealed ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    aria-pressed={revealed}
                    className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-xl text-white/50 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7c8bff]"
                  >
                    <EyeIcon off={revealed} />
                  </button>
                }
              />

              {capsOn && (
                <p
                  className="flex items-center gap-2 text-sm text-amber-300"
                  role="status"
                >
                  <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-amber-300 text-[10px] font-bold text-[#2a1a00]">
                    !
                  </span>
                  Caps Lock đang bật
                </p>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <label className="flex cursor-pointer select-none items-center gap-3 text-[15px] text-white/70 transition hover:text-white">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => {
                    setRemember(event.target.checked);
                  }}
                  className="peer sr-only"
                />
                <span className="grid h-5 w-5 place-items-center rounded-md border border-white/20 bg-white/5 text-transparent transition peer-checked:border-[#5b6cff] peer-checked:bg-[#5b6cff] peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-[#5b6cff]/30">
                  <CheckIcon />
                </span>
                Nhớ email
              </label>

              {RECOVERY_PATH && (
                <Link
                  to={RECOVERY_PATH}
                  className="text-[15px] text-[#a5b4fc] underline-offset-4 transition hover:text-white hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              )}
            </div>

            {loginMutation.isError && (
              <p
                role="alert"
                className="mt-5 flex items-start gap-2.5 rounded-2xl border border-red-400/25 bg-red-500/10 px-5 py-4 text-base text-red-200"
              >
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-red-400 text-[10px] font-bold text-[#2a0a07]">
                  !
                </span>
                Đăng nhập thất bại. Vui lòng kiểm tra thông tin và thử lại.
              </p>
            )}

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="mt-[clamp(1.25rem,3vh,2rem)] flex h-[clamp(3.5rem,7.2vh,4rem)] w-full items-center justify-center gap-3 rounded-2xl bg-[#5b6cff] text-[17px] font-semibold tracking-[0.01em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_14px_32px_-10px_rgba(91,108,255,0.95)] transition hover:-translate-y-0.5 hover:bg-[#6d7dff] active:translate-y-0 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#a5b4fc]/60"
            >
              {loginMutation.isPending && <Spinner />}

              {loginMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>

            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-white/45">
              <span className="[&>svg]:h-4 [&>svg]:w-4">
                <ShieldIcon />
              </span>
              Chỉ dành cho chủ sở hữu portfolio
            </p>
          </form>
        </div>

        <div className="relative flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link
            to="/"
            className="text-white/65 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white"
          >
            Xem portfolio
          </Link>

          <span className="text-white/40">Portfolio Editor</span>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
