import React from "react";
import { render, screen } from "@testing-library/react";
import { DasboardLayout } from "..";

// Mocking the context used in DashboardLayoutComponent
jest.mock("@/context/dashboard.context", () => ({
  useDashboardContext: jest.fn().mockReturnValue({
    sidebarWidth: "240px",
  }),
  DashboardProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("DasboardLayout", () => {
  it("wraps DashboardLayoutComponent with DashboardProvider", () => {
    render(
      <DasboardLayout>
        <div>Wrapped Content</div>
      </DasboardLayout>
    );

    // Check if SideBar is present
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();

    // Check if NavBar is present
    expect(screen.getByTestId("navbar")).toBeInTheDocument();

    // Check if children are rendered in the container
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });
});
