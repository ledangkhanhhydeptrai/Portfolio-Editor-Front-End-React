import React, { useEffect, useState } from "react";

import { Alert, AlertTitle, Box, IconButton, Snackbar } from "@mui/material";
import { keyframes } from "@mui/system";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import SlideTransitions from "../../slide/SlideTransition";

type Severity = "success" | "error" | "info" | "warning";

interface NotificationProps {
  open: boolean;
  message: string;
  severity: Severity;
  onClose: () => void;
  autoHideDuration?: number;
  /** Ghi đè tiêu đề mặc định theo severity */
  title?: string;
}
export interface Notifications {
  open: boolean;
  message: string;
  severity: Severity;
}

const ICONS: Record<Severity, React.ReactNode> = {
  success: <CheckCircle2 size={19} strokeWidth={2.2} />,
  error: <XCircle size={19} strokeWidth={2.2} />,
  warning: <AlertTriangle size={19} strokeWidth={2.2} />,
  info: <Info size={19} strokeWidth={2.2} />
};

const ACCENTS: Record<Severity, string> = {
  success: "#5CC8A1",
  error: "#F0847C",
  warning: "#F2B544",
  info: "#8FA2FF"
};

const TITLES: Record<Severity, string> = {
  success: "Thành công",
  error: "Có lỗi xảy ra",
  warning: "Lưu ý",
  info: "Thông báo"
};

// Thanh tiến trình tự khai báo, không phụ thuộc CSS global
const shrink = keyframes`
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
`;

const Notification: React.FC<NotificationProps> = ({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 4000,
  title
}) => {
  const accent = ACCENTS[severity];

  /*
   * MUI Snackbar: khi rê chuột vào thì tạm dừng, rời chuột thì đếm lại
   * từ resumeHideDuration (mặc định = autoHideDuration / 2).
   * Thanh tiến trình được đồng bộ theo cùng quy tắc đó để không bị lệch.
   */
  const resumeHideDuration = Math.round(autoHideDuration / 2);
  const [resumed, setResumed] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (open) {
      setResumed(false);
      setCycle(0);
    }
  }, [open]);

  const handleMouseLeave = () => {
    setResumed(true);
    setCycle((c) => c + 1);
  };

  const handleClose = (
    _event: Event | React.SyntheticEvent | null,
    reason: "timeout" | "clickaway" | "escapeKeyDown"
  ) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      resumeHideDuration={resumeHideDuration}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      slots={{
        transition: SlideTransitions
      }}
      sx={{
        top: { xs: 12, sm: 24 },
        right: { xs: 12, sm: 24 },
        left: { xs: 12, sm: "auto" }
      }}
    >
      <Alert
        severity={severity}
        icon={ICONS[severity]}
        onMouseLeave={handleMouseLeave}
        action={
          <IconButton
            size="small"
            aria-label="Đóng thông báo"
            onClick={() => onClose()}
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              color: "rgba(255,255,255,0.42)",
              transition: "color .2s, background-color .2s",
              "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.1)" },
              "&.Mui-focusVisible": { outline: `2px solid ${accent}` }
            }}
          >
            <X size={15} strokeWidth={2.2} />
          </IconButton>
        }
        sx={{
          position: "relative",
          overflow: "hidden",
          alignItems: "flex-start",

          width: "100%",
          minWidth: { xs: 0, sm: 360 },
          maxWidth: 400,

          p: "14px 14px 17px 14px",

          borderRadius: "18px",
          border: "1px solid rgba(255,255,255,0.08)",

          // Kính mờ tối: nhìn rõ nội dung phía sau nhưng vẫn dễ đọc
          bgcolor: "rgba(15,22,24,0.88)",
          backdropFilter: "blur(18px) saturate(140%)",
          WebkitBackdropFilter: "blur(18px) saturate(140%)",
          color: "#E9EFEC",

          boxShadow:
            "0 0 0 1px rgba(0,0,0,0.35), 0 22px 48px -14px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.06)",

          "& .MuiAlert-icon": {
            p: 0,
            m: 0,
            mr: 1.5,
            width: 36,
            height: 36,
            flexShrink: 0,

            alignItems: "center",
            justifyContent: "center",

            borderRadius: "12px",

            color: accent,
            bgcolor: `${accent}1F`,
            boxShadow: `inset 0 0 0 1px ${accent}33`
          },

          "& .MuiAlert-message": {
            flex: 1,
            minWidth: 0,
            p: 0,
            pt: "1px",

            fontSize: 13.5,
            lineHeight: 1.55,
            wordBreak: "break-word",

            color: "rgba(233,239,236,0.72)"
          },

          "& .MuiAlertTitle-root": {
            m: 0,
            mb: 0.25,

            fontSize: 14.5,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.4,

            color: "#F7F9F8"
          },

          "& .MuiAlert-action": {
            p: 0,
            m: 0,
            ml: 1.5,
            mr: -0.25,
            alignSelf: "flex-start"
          },

          "&:hover .notification-progress": {
            animationPlayState: "paused"
          }
        }}
      >
        <AlertTitle>{title ?? TITLES[severity]}</AlertTitle>

        {message}

        {/* Rãnh + thanh thời gian còn lại */}
        <Box
          component="span"
          aria-hidden
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 3,
            bgcolor: "rgba(255,255,255,0.06)",

            "@media (prefers-reduced-motion: reduce)": {
              display: "none"
            }
          }}
        >
          <Box
            key={cycle}
            component="span"
            className="notification-progress"
            sx={{
              display: "block",
              height: "100%",

              bgcolor: accent,
              borderRadius: "0 3px 3px 0",

              transformOrigin: "left",
              animation: `${shrink} ${
                resumed ? resumeHideDuration : autoHideDuration
              }ms linear forwards`
            }}
          />
        </Box>
      </Alert>
    </Snackbar>
  );
};

export default Notification;
