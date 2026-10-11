import { Alert, Snackbar } from "@mui/material";
import type { Notifications } from "../../../../components/ui/Notification";

interface SocialLinkNotificationProps {
  notification: Notifications;
  onClose: () => void;
}

export function SocialLinkNotification({
  notification,
  onClose
}: SocialLinkNotificationProps) {
  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={notification.severity}
        variant="filled"
        sx={{
          width: "100%",
          borderRadius: "12px",
          fontSize: "14px"
        }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
}
