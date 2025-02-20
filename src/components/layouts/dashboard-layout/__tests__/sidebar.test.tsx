import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { useDashboardContext } from "@/context/dashboard.context";
import { navigationItems } from "@/constants/navigations.constans";
import { SideBar } from "../sidebar";

// Mocking dependencies
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/context/dashboard.context", () => ({
  useDashboardContext: jest.fn(),
}));

describe("SideBar", () => {
  beforeEach(() => {
    (useDashboardContext as jest.Mock).mockReturnValue({
      sidebarWidth: 240,
      isMobile: false,
      isSidebarOpen: true,
      toggleSidebar: jest.fn(),
    });

    (usePathname as jest.Mock).mockReturnValue("/");
  });

  it("renders the logo and title", () => {
    render(<SideBar />);
    expect(screen.getByAltText("logo invoicehub")).toBeInTheDocument();
    expect(screen.getByText("InvoiceHub")).toBeInTheDocument();
  });

  it("renders the navigation items", () => {
    render(<SideBar />);
    navigationItems.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("toggles sidebar on menu item click in mobile view", () => {
    const toggleSidebar = jest.fn();
    (useDashboardContext as jest.Mock).mockReturnValue({
      sidebarWidth: 240,
      isMobile: true,
      isSidebarOpen: true,
      toggleSidebar,
    });

    render(<SideBar />);
    const firstNavItem = screen.getByText(navigationItems[0].label);
    fireEvent.click(firstNavItem);
    expect(toggleSidebar).toHaveBeenCalled();
  });

  it("closes the sidebar when close button is clicked in mobile view", () => {
    const toggleSidebar = jest.fn();
    (useDashboardContext as jest.Mock).mockReturnValue({
      sidebarWidth: 240,
      isMobile: true,
      isSidebarOpen: true,
      toggleSidebar,
    });

    render(<SideBar />);
    const closeButton = screen.getByTestId("close-sidebar");
    fireEvent.click(closeButton);
    expect(toggleSidebar).toHaveBeenCalled();
  });
});
