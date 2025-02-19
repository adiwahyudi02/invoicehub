import React from "react";
import { render, screen } from "@testing-library/react";
import { Title } from ".";

describe("Title Component", () => {
  it("renders the Title component with provided text", () => {
    render(<Title>Test Title</Title>);

    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toBeInTheDocument();
  });

  it("applies the default typography styles", () => {
    render(<Title>Styled Title</Title>);

    const titleElement = screen.getByText("Styled Title");

    expect(titleElement).toHaveStyle({
      fontSize: "1.625rem",
      fontWeight: "700",
    });
  });
});
