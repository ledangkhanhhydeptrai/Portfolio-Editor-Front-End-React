import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

/* ====== SỬA THÔNG TIN CỦA BẠN Ở ĐÂY ====== */
const PROFILE = {
  name: "Nguyễn Văn A",
  shortName: "A", // dùng trong câu "Xin chào, tôi là ..."
  role: "Chức danh của bạn",
  intro: "Một câu ngắn nói về công việc và điều bạn làm tốt nhất.",
  available: true, // false thì ẩn nhãn "Đang nhận dự án mới"
  skills: ["Kỹ năng 1", "Kỹ năng 2", "Kỹ năng 3"],
  // Tối đa 3 dự án. Thêm `image` (link ảnh hoặc ảnh import) để thay màu nền.
  projects: [
    {
      title: "Dự án nổi bật",
      category: "Thể loại",
      color: "#5b6cff",
      image: ""
    },
    {
      title: "Dự án thứ hai",
      category: "Thể loại",
      color: "#a855f7",
      image: ""
    },
    { title: "Dự án thứ ba", category: "Thể loại", color: "#0ea5c6", image: "" }
  ],
  links: [
    { label: "Instagram", href: "https://instagram.com/your-username" },
    { label: "LinkedIn", href: "https://linkedin.com/in/your-username" },
    { label: "Email", href: "mailto:you@example.com" }
  ]
};
/* ========================================= */

/* Trang "Quên mật khẩu". Để trống "" thì ẩn link. Ví dụ: "/auth/forgot-password" */
const FORGOT_PASSWORD_PATH = "" as string;

const REMEMBER_KEY = "portfolio:remembered-email";
const readRemembered = (): string => {
  try {
    return localStorage.getItem(REMEMBER_KEY) ?? "";
  } catch {
    return "";
  }
};

/* Keyframes tự chứa, không cần sửa tailwind.config */
const css = `
@keyframes lp-spin { to { transform: rotate(360deg); } }
@keyframes lp-drift { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(48px,-36px,0) scale(1.12); } }
@keyframes lp-rise { from { opacity: 0; transform: translateY(28px) scale(.97); } to { opacity: 1; transform: none; } }
@keyframes lp-marquee { to { transform: translateX(-50%); } }
.lp-spin { animation: lp-spin 7s linear infinite; }
.lp-drift { animation: lp-drift 16s ease-in-out infinite; }
.lp-rise { animation: lp-rise .9s cubic-bezier(.2,.8,.2,1) both; }
.lp-marquee { animation: lp-marquee 26s linear infinite; }
@media (prefers-reduced-motion: reduce) {
  .lp-spin, .lp-drift, .lp-rise, .lp-marquee { animation: none; }
}
`;

const heading = "font-['Bricolage_Grotesque',sans-serif]";

const inputClass =
  "peer h-[clamp(3.5rem,7.2vh,4rem)] w-full rounded-2xl border border-white/10 bg-white/5 pb-1 pl-14 pr-5 pt-6 text-[17px] font-medium text-white " +
  "placeholder-transparent transition hover:border-white/20 focus:border-[#7c8bff] focus:bg-white/[0.08] " +
  "focus:outline-none focus:ring-4 focus:ring-[#5b6cff]/25 " +
  "[&:-webkit-autofill]:[-webkit-text-fill-color:#fff] " +
  "[&:-webkit-autofill]:[transition:background-color_600000s_0s,color_600000s_0s]";

const labelClass =
  "pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 text-[17px] font-medium text-white/50 transition-all duration-200 " +
  "peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[13px] peer-focus:text-[#a5b4fc] " +
  "peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[13px] " +
  "peer-[:-webkit-autofill]:top-3 peer-[:-webkit-autofill]:translate-y-0 peer-[:-webkit-autofill]:text-[13px]";

const iconClass =
  "pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-white/40 transition-colors peer-focus:text-[#a5b4fc]";

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true
};

const MailIcon = () => (
  <svg className={iconClass} {...svgProps}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

const LockIcon = () => (
  <svg className={iconClass} {...svgProps}>
    <rect x="4" y="10" width="16" height="10" rx="3" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

const EyeIcon = ({ off }: { off: boolean }) => (
  <svg className="h-6 w-6" {...svgProps}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="M4 4l16 16" />}
  </svg>
);

const ShieldIcon = () => (
  <svg className="h-5 w-5" {...svgProps}>
    <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-4 w-4" {...svgProps} strokeWidth={2.4}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

const Spinner = () => (
  <svg
    className="h-5 w-5 animate-spin"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeOpacity="0.3"
      strokeWidth="3"
    />
    <path
      d="M21 12a9 9 0 0 0-9-9"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

/* Ô nhập với nhãn nổi (floating label) */
const Field: React.FC<{
  id: string;
  label: string;
  type: string;
  autoComplete: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  trailing?: React.ReactNode;
  onKeyEvent?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlurField?: () => void;
  className?: string;
}> = ({
  id,
  label,
  type,
  autoComplete,
  value,
  onChange,
  icon,
  trailing,
  onKeyEvent,
  onBlurField,
  className = inputClass
}) => (
  <div className="relative">
    <input
      id={id}
      type={type}
      autoComplete={autoComplete}
      placeholder=" "
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={onKeyEvent}
      onKeyUp={onKeyEvent}
      onBlur={onBlurField}
      required
      className={`${className} ${trailing ? "pr-16" : ""}`}
    />

    <label htmlFor={id} className={labelClass}>
      {label}
    </label>

    {icon}
    {trailing}
  </div>
);

/* Khung trưng bày tác phẩm kiểu bento */
const tileLayout = ["col-span-4 row-span-2", "col-span-2", "col-span-2"];

const WorkBento: React.FC = () => (
  <div className="grid h-64 grid-cols-6 grid-rows-2 gap-3 sm:h-80 lg:h-auto lg:min-h-0 lg:flex-1">
    {PROFILE.projects.slice(0, 3).map((project, index) => (
      <figure
        key={project.title + index}
        className={`lp-rise relative m-0 overflow-hidden rounded-3xl border border-white/10 ${tileLayout[index]}`}
        style={{
          backgroundColor: project.color,
          animationDelay: `${300 + index * 140}ms`
        }}
      >
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.35),transparent_55%)]" />
        <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/15 bg-black/25 px-3.5 py-2.5 backdrop-blur-md">
          <p className="truncate text-sm font-semibold text-white">
            {project.title}
          </p>
          <p className="truncate text-xs text-white/70">{project.category}</p>
        </figcaption>
      </figure>
    ))}
  </div>
);

const initials = (name: string) => {
  const words = name.trim().split(/\s+/);
  return (
    words[0][0] + (words.length > 1 ? words[words.length - 1][0] : "")
  ).toUpperCase();
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const passwordInputClass = `${inputClass} text-xl tracking-[0.22em]`;
  const [email, setEmail] = React.useState<string>(readRemembered);
  const [password, setPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [remember, setRemember] = React.useState<boolean>(
    () => readRemembered() !== ""
  );
  const [capsOn, setCapsOn] = React.useState<boolean>(false);

  const emailValid = /^\S+@\S+\.\S+$/.test(email);

  const loginMutation = useLogin();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          try {
            if (remember) {
              localStorage.setItem(REMEMBER_KEY, email);
            } else {
              localStorage.removeItem(REMEMBER_KEY);
            }
          } catch {
            /* bỏ qua nếu trình duyệt chặn localStorage */
          }
          navigate("/");
        }
      }
    );
  };

  /* Vệt sáng đi theo chuột trong thẻ form */
  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
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

  const marqueeBase = Array.from({ length: 4 }, () => PROFILE.skills).flat();
  const marqueeItems = [...marqueeBase, ...marqueeBase];

  return (
    <main className="relative grid min-h-screen overflow-hidden lg:h-screen lg:min-h-[640px] bg-[#070b1f] font-['Figtree',system-ui,sans-serif] text-white grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <style>{css}</style>

      {/* Nền aurora */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="lp-drift absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#4f5df0]/45 blur-[120px]" />
        <div className="lp-drift absolute -right-32 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[#a855f7]/35 blur-[120px] [animation-delay:-6s]" />
        <div className="lp-drift absolute -bottom-48 left-1/3 h-[30rem] w-[30rem] rounded-full bg-[#06b6d4]/25 blur-[120px] [animation-delay:-11s]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      {/* ===== Bên trái: giới thiệu bản thân ===== */}
      <aside className="relative flex min-h-0 min-w-0 flex-col justify-between gap-8 px-6 py-8 sm:px-12 lg:gap-5 lg:px-16 lg:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`${heading} grid h-12 w-12 place-items-center rounded-2xl bg-white text-base font-bold text-[#070b1f]`}
            >
              {initials(PROFILE.name)}
            </span>
            <div className="leading-tight">
              <p className="font-semibold">{PROFILE.name}</p>
              <p className="text-sm text-white/55">{PROFILE.role}</p>
            </div>
          </div>

          {PROFILE.available && (
            <span className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ade80]" />
              </span>
              Đang nhận dự án mới
            </span>
          )}
        </div>

        <div>
          <h1
            className={`${heading} text-5xl font-bold leading-[1] tracking-[-0.03em] sm:text-7xl lg:text-[clamp(3rem,9vh,6rem)]`}
          >
            Xin chào,
            <br />
            tôi là {PROFILE.shortName}.
          </h1>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-white/65 lg:mt-4">
            {PROFILE.intro}
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4 lg:min-h-[180px]">
          <WorkBento />

          <div className="w-full min-w-0 max-w-full shrink-0 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <ul className="lp-marquee flex w-max gap-2.5" aria-label="Kỹ năng">
              {marqueeItems.map((skill, index) => (
                <li
                  key={skill + index}
                  className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {PROFILE.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="text-white/65 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* ===== Bên phải: bảng đăng nhập (phủ kín cả cột) ===== */}
      <section
        onMouseMove={handleMouseMove}
        className="group relative flex min-w-0 flex-col overflow-hidden border-t border-white/10 bg-[#0b1030]/60 px-6 py-8 backdrop-blur-xl sm:px-12 lg:border-l lg:border-t-0 lg:px-16 lg:py-10"
      >
        {/* Vệt sáng theo chuột */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(520px circle at var(--x, 50%) var(--y, 30%), rgba(129,140,248,0.14), transparent 60%)"
          }}
        />

        {/* Hàng trên: ngang với hàng tên bên trái */}
        <div className="relative flex h-12 items-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 pl-3 pr-4 text-sm text-white/80">
            <ShieldIcon />
            Khu vực quản trị
          </span>
        </div>

        {/* Giữa: form */}
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
              <Field
                id="email"
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
              <Field
                id="password"
                label="Mật khẩu"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={setPassword}
                onKeyEvent={(event) =>
                  setCapsOn(event.getModifierState("CapsLock"))
                }
                onBlurField={() => setCapsOn(false)}
                icon={<LockIcon />}
                className={passwordInputClass}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    aria-pressed={showPassword}
                    className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-xl text-white/50 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7c8bff]"
                  >
                    <EyeIcon off={showPassword} />
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

            {/* Nhớ email + Quên mật khẩu */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <label className="flex cursor-pointer select-none items-center gap-3 text-[15px] text-white/70 transition hover:text-white">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  className="peer sr-only"
                />
                <span className="grid h-5 w-5 place-items-center rounded-md border border-white/20 bg-white/5 text-transparent transition peer-checked:border-[#5b6cff] peer-checked:bg-[#5b6cff] peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-[#5b6cff]/30">
                  <CheckIcon />
                </span>
                Nhớ email
              </label>

              {FORGOT_PASSWORD_PATH && (
                <Link
                  to={FORGOT_PASSWORD_PATH}
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
                {loginMutation.error.message}
              </p>
            )}

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="mt-[clamp(1.25rem,3vh,2rem)] flex h-[clamp(3.5rem,7.2vh,4rem)] w-full items-center justify-center gap-3 rounded-2xl bg-[#5b6cff] text-[17px] font-semibold tracking-[0.01em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_14px_32px_-10px_rgba(91,108,255,0.95)] transition
                hover:-translate-y-0.5 hover:bg-[#6d7dff] active:translate-y-0 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0
                focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#a5b4fc]/60"
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

        {/* Hàng dưới: ngang với hàng link bên trái */}
        <div className="relative flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link
            to="/"
            className="text-white/65 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white"
          >
            Xem portfolio
          </Link>
          <span className="text-white/40">
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
