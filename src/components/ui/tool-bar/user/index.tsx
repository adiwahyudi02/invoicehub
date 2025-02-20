import React, { useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";

export const UserToolbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box display="flex" alignItems="center" data-testid="user-toolbar">
        <Box textAlign="right" display={{ sm: "block", xs: "none" }} mr={2}>
          <Typography fontWeight="600">John Does</Typography>
          <Typography variant="body2" fontWeight="600" color="text.secondary">
            Verified Member
          </Typography>
        </Box>

        <IconButton onClick={handleClick} sx={{ p: 0 }}>
          <Avatar
            src="/profile.png"
            alt="John Does image profile"
            sx={{ width: 46, height: 46, mr: 1 }}
          />
          <KeyboardArrowDown />
        </IconButton>
      </Box>

      {/* User Menu */}
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
              width: "12rem",
              mt: 1,
            },
          },
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem sx={{ color: "error.main" }} onClick={handleClose}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
