import React from "react";
import { Link } from "react-router-dom";

/* ====== THÔNG TIN PORTFOLIO ====== */
const PROFILE = {
  name: "Nguyễn Văn A",
  shortName: "A",
  role: "Chức danh của bạn",
  intro: "Một câu ngắn nói về công việc và điều bạn làm tốt nhất.",
  available: true,

  skills: ["Kỹ năng 1", "Kỹ năng 2", "Kỹ năng 3"],

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
    {
      title: "Dự án thứ ba",
      category: "Thể loại",
      color: "#0ea5c6",
      image: ""
    }
  ],

  links: [
    {
      label: "Instagram",
      href: "https://instagram.com/your-username"
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/your-username"
    },
    {
      label: "Email",
      href: "mailto:you@example.com"
    }
  ]
};

/* ====== ANIMATION ====== */

const css = `
@keyframes lp-drift {
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(48px, -36px, 0) scale(1.12);
  }
}

@keyframes lp-rise {
  from {
    opacity: 0;
    transform: translateY(28px) scale(.97);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes lp-marquee {
  to {
    transform: translateX(-50%);
  }
}

.lp-drift {
  animation: lp-drift 16s ease-in-out infinite;
}

.lp-rise {
  animation: lp-rise .9s cubic-bezier(.2,.8,.2,1) both;
}

.lp-marquee {
  animation: lp-marquee 26s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .lp-drift,
  .lp-rise,
  .lp-marquee {
    animation: none;
  }
}
`;

/* ====== STYLE ====== */

const heading = "font-['Bricolage_Grotesque',sans-serif]";

const tileLayout = ["col-span-4 row-span-2", "col-span-2", "col-span-2"];

/* ====== ICON ====== */

const ArrowIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

/* ====== HELPER ====== */

const initials = (name: string): string => {
  const words = name.trim().split(/\s+/);

  if (words.length === 0) {
    return "";
  }

  return (
    words[0][0] + (words.length > 1 ? words[words.length - 1][0] : "")
  ).toUpperCase();
};

/* ====== PROJECT BENTO ====== */

const WorkBento: React.FC = () => {
  return (
    <div className="grid h-64 grid-cols-6 grid-rows-2 gap-3 sm:h-80 lg:h-auto lg:min-h-0 lg:flex-1">
      {PROFILE.projects.slice(0, 3).map((project, index) => (
        <figure
          key={`${project.title}-${index}`}
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
};

/* ====== PAGE ====== */

const LoginPage: React.FC = () => {
  const marqueeBase = Array.from({ length: 4 }, () => PROFILE.skills).flat();

  const marqueeItems = [...marqueeBase, ...marqueeBase];

  return (
    <main className="relative grid min-h-screen overflow-hidden bg-[#070b1f] font-['Figtree',system-ui,sans-serif] text-white lg:h-screen lg:min-h-[640px] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <style>{css}</style>

      {/* ===== BACKGROUND ===== */}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="lp-drift absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#4f5df0]/45 blur-[120px]" />

        <div className="lp-drift absolute -right-32 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[#a855f7]/35 blur-[120px] [animation-delay:-6s]" />

        <div className="lp-drift absolute -bottom-48 left-1/3 h-[30rem] w-[30rem] rounded-full bg-[#06b6d4]/25 blur-[120px] [animation-delay:-11s]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      {/* ===== LEFT: PORTFOLIO ===== */}

      <aside className="relative flex min-h-0 min-w-0 flex-col justify-between gap-8 px-6 py-8 sm:px-12 lg:gap-5 lg:px-16 lg:py-10">
        {/* Header */}

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

        {/* Introduction */}

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

        {/* Projects + Skills */}

        <div className="flex min-h-0 flex-1 flex-col gap-4 lg:min-h-[180px]">
          <WorkBento />

          <div className="w-full min-w-0 max-w-full shrink-0 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <ul className="lp-marquee flex w-max gap-2.5" aria-label="Kỹ năng">
              {marqueeItems.map((skill, index) => (
                <li
                  key={`${skill}-${index}`}
                  className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social links */}

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

      {/* ===== RIGHT: NAVIGATION ===== */}

      <section className="relative flex min-w-0 flex-col overflow-hidden border-t border-white/10 bg-[#0b1030]/60 px-6 py-8 backdrop-blur-xl sm:px-12 lg:border-l lg:border-t-0 lg:px-16 lg:py-10">
        {/* Mouse glow */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(129,140,248,0.12),transparent_55%)]"
        />

        {/* Top */}

        <div className="relative flex h-12 items-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 pl-3 pr-4 text-sm text-white/80">
            <ShieldIcon />
            Portfolio
          </span>
        </div>

        {/* Center */}

        <div className="relative flex flex-1 items-center justify-center py-6">
          <div className="w-full max-w-[580px]">
            <h2
              className={`${heading} text-[clamp(2.5rem,6.5vh,3.75rem)] font-bold leading-[1.12] tracking-[-0.02em]`}
            >
              Chào mừng bạn
            </h2>

            <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-white/60">
              Khám phá portfolio, các dự án và những kỹ năng mà tôi đang phát
              triển.
            </p>

            <Link
              to="/"
              className="mt-8 flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#5b6cff] text-[17px] font-semibold tracking-[0.01em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_14px_32px_-10px_rgba(91,108,255,0.95)] transition hover:-translate-y-0.5 hover:bg-[#6d7dff] active:translate-y-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#a5b4fc]/60"
            >
              Xem portfolio
              <ArrowIcon />
            </Link>

            <p className="mt-5 flex items-center justify-center gap-2 text-sm text-white/45">
              <ShieldIcon />
              Trang giới thiệu cá nhân
            </p>
          </div>
        </div>

        {/* Bottom */}

        <div className="relative flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link
            to="/"
            className="text-white/65 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white"
          >
            Trang chủ
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
