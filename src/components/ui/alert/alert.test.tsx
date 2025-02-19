import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { Alert, AlertProps } from ".";

jest.useFakeTimers();

const mockOnClose = jest.fn();

const defaultProps: AlertProps = {
  show: true,
  title: "Success!",
  description: "This is a success message.",
  severity: "success",
  onClose: mockOnClose,
};

describe("Alert Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the alert with the correct title and description", async () => {
    render(<Alert {...defaultProps} />);

    expect(await screen.findByText("Success!")).toBeInTheDocument();
    expect(
      await screen.findByText("This is a success message.")
    ).toBeInTheDocument();
  });

  it("renders the correct icon based on severity", async () => {
    render(<Alert {...defaultProps} severity="error" />);

    expect(await screen.findByTestId("ErrorOutlineIcon")).toBeInTheDocument();
  });

  it("calls onClose when the auto-hide timeout expires", async () => {
    render(<Alert {...defaultProps} />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it("does not render when show is false", async () => {
    render(<Alert {...defaultProps} show={false} />);

    const alertElement = screen.getByRole("alert", { hidden: true });

    expect(alertElement).toHaveStyle("opacity: 0; visibility: hidden;");
  });

  it("does not call onClose before the timeout", () => {
    render(<Alert {...defaultProps} />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
