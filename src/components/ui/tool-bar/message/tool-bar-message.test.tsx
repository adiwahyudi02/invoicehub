import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ToolbarMessage } from ".";

describe("ToolbarMessage", () => {
  it("renders badge with ChatIcon", () => {
    render(<ToolbarMessage />);
    expect(screen.getByLabelText("Messages")).toBeInTheDocument();
  });

  it("opens the menu when badge is clicked", async () => {
    render(<ToolbarMessage />);
    const button = screen.getByLabelText("Messages");

    // Click the button to open the menu
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Messages")).toBeInTheDocument();
      expect(screen.getByText("View all")).toBeInTheDocument();
    });
  });

  it("closes the menu when a menu item is clicked", async () => {
    render(<ToolbarMessage />);
    const button = screen.getByLabelText("Messages");

    // Open the menu
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("New invoice received")).toBeInTheDocument();
    });

    // Click on a menu item
    fireEvent.click(screen.getByText("New invoice received"));

    await waitFor(() => {
      expect(
        screen.queryByText("New invoice received")
      ).not.toBeInTheDocument();
    });
  });
});
