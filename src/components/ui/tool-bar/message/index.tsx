"use client";

import React, { useState } from "react";
import { Badge, Menu, MenuItem, Typography } from "@mui/material";
import { IconButtonRounded } from "../../icon-button-rounded";
import { ChatIcon } from "../../icons/chat-icon";

export const ToolbarMessage: React.FC = () => {
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
      <Badge overlap="circular" variant="dot" color="error" sx={{ mr: 4 }}>
        <IconButtonRounded
          color="inherit"
          aria-label="Messages"
          onClick={handleClick}
          data-testid="toolbar-message"
        >
          <ChatIcon />
        </IconButtonRounded>
      </Badge>

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
              width: "15rem",
              mt: 1,
            },
          },
        }}
      >
        <Typography variant="body2" fontWeight="bold" sx={{ px: 2, py: 1 }}>
          Messages
        </Typography>
        <MenuItem sx={{ fontSize: "small" }} onClick={handleClose}>
          New invoice received
        </MenuItem>
        <MenuItem sx={{ fontSize: "small" }} onClick={handleClose}>
          Invoice confirmed
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            textAlign: "center",
            color: "primary.main",
            justifyContent: "center",
            fontSize: "small",
            fontWeight: "bold",
            py: 1,
            mt: 2,
          }}
        >
          View all
        </MenuItem>
      </Menu>
    </>
  );
};
