import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserToolbar } from ".";

describe("UserToolbar", () => {
  it("opens the menu when avatar is clicked", async () => {
    render(<UserToolbar />);

    // Click on the IconButton (Avatar)
    const avatarButton = screen.getByRole("button", {
      name: /John Does image profile/i,
    });
    fireEvent.click(avatarButton);

    // Check if menu items are visible
    await waitFor(() => {
      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });
  });

  it("closes the menu when an item is clicked", async () => {
    render(<UserToolbar />);

    // Open the menu
    const avatarButton = screen.getByRole("button", {
      name: /John Does image profile/i,
    });
    fireEvent.click(avatarButton);

    // Click on the Profile item
    const profileItem = await screen.findByText("Profile");
    fireEvent.click(profileItem);

    // Check that the menu is closed
    await waitFor(() => {
      expect(screen.queryByText("Profile")).not.toBeInTheDocument();
      expect(screen.queryByText("Settings")).not.toBeInTheDocument();
      expect(screen.queryByText("Logout")).not.toBeInTheDocument();
    });
  });
});
