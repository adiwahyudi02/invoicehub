"use client";
import { AppBar, Toolbar } from "@mui/material";
import { NavbarToolbar } from "./navbar-toolbar";

export const NavBar: React.FC = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: "divider",
        py: 1,
      }}
    >
      <Toolbar>
        <NavbarToolbar />
      </Toolbar>
    </AppBar>
  );
};
