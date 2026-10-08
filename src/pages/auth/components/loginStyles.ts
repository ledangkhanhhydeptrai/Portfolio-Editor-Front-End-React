const loginStyles = `
@keyframes lp-spin {
  to {
    transform: rotate(360deg);
  }
}

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

.lp-spin {
  animation: lp-spin 7s linear infinite;
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
  .lp-spin,
  .lp-drift,
  .lp-rise,
  .lp-marquee {
    animation: none;
  }
}
`;

export default loginStyles;
