import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CreateContact from "./CreateContact";

describe("CreateContact", () => {
  it("renders the form heading", () => {
    // Arrange
    render(<CreateContact />);

    // Act
    const heading = screen.getByText(/create contact/i);

    // Assert
    expect(heading).toBeInTheDocument();
  });
  it("renders the temporal id input", () => {
    // Arrange
    render(<CreateContact />);

    // Act
    const input = screen.getByLabelText(/temporal id/i);

    // Assert
    expect(input).toBeInTheDocument();
  });
});
