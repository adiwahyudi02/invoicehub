"use client";

import { useState } from "react";
import { Badge, Menu, MenuItem, Typography } from "@mui/material";
import { NotifIcon } from "../../icons/notif-icon";
import { IconButtonRounded } from "../../icon-button-rounded";

export const ToolbarNotification: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButtonRounded
        color="inherit"
        aria-label="Notification"
        sx={{ mx: 2 }}
        onClick={handleClick}
      >
        <Badge color="error">
          <NotifIcon />
        </Badge>
      </IconButtonRounded>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              width: "16rem",
              mt: 1,
            },
          },
        }}
      >
        <Typography variant="body2" fontWeight="bold" sx={{ px: 2, py: 1 }}>
          Notifications
        </Typography>
        <MenuItem sx={{ fontSize: "small" }} onClick={handleClose}>
          You don&apos;t have notifications
        </MenuItem>
      </Menu>
    </>
  );
};
