import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CreateContact from "./CreateContact";

describe("CreateContact", () => {
  it("renders the form heading", () => {
    // Arrange
    render(<CreateContact />);

    // Act
    const heading = screen.getByRole("heading", { name: /create contact/i });

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
  it("renders the temporal contact input", () => {
    // Arrange
    render(<CreateContact />);

    // Act
    const input = screen.getByLabelText(/temporal contact/i);

    // Assert
    expect(input).toBeInTheDocument();
  });
  it("renders the current timeline input", () => {
    // Arrange
    render(<CreateContact />);

    // Act
    const input = screen.getByLabelText(/current timeline/i);

    // Assert
    expect(input).toBeInTheDocument();
  });
  it("renders the origin timeline input", () => {
    // Arrange
    render(<CreateContact />);

    // Act
    const input = screen.getByLabelText(/origin timeline/i);

    // Assert
    expect(input).toBeInTheDocument();
  });
  it("renders the mission notes textarea", () => {
    // Arrange
    render(<CreateContact />);

    // Act
    const textarea = screen.getByLabelText(/mission notes/i);

    // Assert
    expect(textarea).toBeInTheDocument();
  });
  it("renders the status dropdown", () => {
    // Arrange
    render(<CreateContact />);

    // Act
    const select = screen.getByLabelText(/status/i);

    // Assert
    expect(select).toBeInTheDocument();
  });
  it("renders the create contact button", () => {
    // Arrange
    render(<CreateContact />);

    // Act
    const button = screen.getByRole("button", { name: /create contact/i });

    // Assert
    expect(button).toBeInTheDocument();
  });
});
