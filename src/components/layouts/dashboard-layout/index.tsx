"use client";

import { Box, BoxProps, Container } from "@mui/material";
import {
  DashboardProvider,
  useDashboardContext,
} from "@/context/dashboard.context";
import { SideBar } from "./sidebar";
import { NavBar } from "./navbar";

export const DashboardLayoutComponent: React.FC<BoxProps> = ({
  children,
  ...props
}) => {
  const { sidebarWidth } = useDashboardContext();

  return (
    <Box display="flex" flexGrow={1} width="100%" {...props}>
      <SideBar />
      <Box
        width={{ md: `calc(100% - ${sidebarWidth})`, xs: "100%" }}
        display="flex"
        flexDirection="column"
        flexGrow={1}
      >
        <NavBar />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            width: "100%",
            py: 6,
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export const DasboardLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <DashboardProvider>
      <DashboardLayoutComponent>{children}</DashboardLayoutComponent>
    </DashboardProvider>
  );
};
