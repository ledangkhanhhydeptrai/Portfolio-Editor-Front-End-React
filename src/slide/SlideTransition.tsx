import React from "react";

import { Slide, SlideProps, useMediaQuery } from "@mui/material";

interface SlideTransitionsProps extends Omit<
  SlideProps,
  "direction" | "children"
> {
  children: React.ReactElement;
}

/*
 * Hiệu ứng trượt vào từ bên phải cho Snackbar / Notification.
 * - Vào: chậm dần cuối (ease-out mạnh) cho cảm giác mượt, mềm
 * - Ra: nhanh hơn để thông báo biến mất gọn
 * - Tôn trọng người dùng bật "giảm chuyển động" của hệ điều hành
 */
const SlideTransitions = React.forwardRef<unknown, SlideTransitionsProps>(
  function SlideTransitions({ children, ...props }, ref) {
    const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

    return (
      <Slide
        ref={ref}
        easing={{
          enter: "cubic-bezier(0.22, 1, 0.36, 1)",
          exit: "cubic-bezier(0.4, 0, 1, 1)"
        }}
        timeout={
          reduceMotion ? { enter: 0, exit: 0 } : { enter: 380, exit: 220 }
        }
        {...props}
        direction="left"
      >
        {children}
      </Slide>
    );
  }
);

export default SlideTransitions;
