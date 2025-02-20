import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ToolbarNotification } from ".";

describe("ToolbarNotification", () => {
  it("renders notification button with NotifIcon", () => {
    render(<ToolbarNotification />);
    expect(screen.getByLabelText("Notification")).toBeInTheDocument();
  });

  it("opens the menu when notification button is clicked", async () => {
    render(<ToolbarNotification />);

    // Click the notification button
    const button = screen.getByRole("button", { name: "Notification" });
    fireEvent.click(button);

    // Check if the menu item is visible after clicking
    await waitFor(() => {
      expect(
        screen.getByText("You don't have notifications")
      ).toBeInTheDocument();
    });
  });
});
