import React, { ReactNode, useEffect } from "react";
import {
  Alert as MuiAlert,
  AlertProps as MuiAlertProps,
  Fade,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

export type AlertProps = {
  show: boolean;
  title: ReactNode;
  description: ReactNode;
  onClose: () => void;
} & Omit<MuiAlertProps, "children" | "icon" | "onClose">;

const ICONS = {
  success: <CheckBoxIcon fontSize="large" />,
  info: <InfoOutlinedIcon fontSize="large" />,
  error: <ErrorOutlineIcon fontSize="large" />,
  warning: <ReportProblemOutlinedIcon fontSize="large" />,
};

export const Alert: React.FC<AlertProps> = ({
  title,
  description,
  severity = "success",
  show = false,
  onClose,
  ...props
}) => {
  const autoHideTimeout = 5000; // 5s

  const icon = ICONS[severity];

  // Automatically hide the alert after the timeout
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (show) {
      timer = setTimeout(() => {
        onClose();
      }, autoHideTimeout);
    }

    // Clean up timer
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [show, onClose]);

  return (
    <Fade in={show}>
      <MuiAlert
        icon={icon}
        severity={severity}
        sx={{
          borderLeft: "0.5rem solid",
          borderLeftColor: `${severity}.main`,
          paddingBlock: 2,
        }}
        {...props}
      >
        <Typography fontWeight={700} mb={1}>
          {title}
        </Typography>
        <Typography color="text.secondary">{description}</Typography>
      </MuiAlert>
    </Fade>
  );
};
