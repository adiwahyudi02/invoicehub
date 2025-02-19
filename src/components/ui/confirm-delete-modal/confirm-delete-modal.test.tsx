import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import ConfirmDeleteModal from ".";

const mockOnClose = jest.fn();
const mockOnDelete = jest.fn();

const defaultProps = {
  open: true,
  onClose: mockOnClose,
  onDelete: mockOnDelete,
};

describe("ConfirmDeleteModal Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal with default title and description", async () => {
    render(<ConfirmDeleteModal {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText("Confirm Deletion")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Are you sure you want to delete this item? This action cannot be undone."
        )
      ).toBeInTheDocument();
    });
  });

  it("renders custom title and description when provided", async () => {
    render(
      <ConfirmDeleteModal
        {...defaultProps}
        title="Delete User"
        description="Are you sure you want to delete this user?"
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Delete User")).toBeInTheDocument();
      expect(
        screen.getByText("Are you sure you want to delete this user?")
      ).toBeInTheDocument();
    });
  });

  it("calls onClose when the cancel button is clicked", async () => {
    render(<ConfirmDeleteModal {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText("Cancel"));
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete when the delete button is clicked", async () => {
    render(<ConfirmDeleteModal {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText("Delete")).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText("Delete"));
    });

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it("does not render when open is false", async () => {
    render(<ConfirmDeleteModal {...defaultProps} open={false} />);

    await waitFor(() => {
      expect(screen.queryByText("Confirm Deletion")).not.toBeInTheDocument();
    });
  });
});
