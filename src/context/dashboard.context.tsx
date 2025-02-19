"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface DashboardContextType {
  sidebarWidth: string;
  isSidebarOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarWidth = "250px";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });

  // Toggle the sidebar open/close state
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <DashboardContext.Provider
      value={{
        isSidebarOpen,
        sidebarWidth,
        isMobile,
        toggleSidebar,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to access the dashboard context
export const useDashboardContext = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }
  return context;
};
