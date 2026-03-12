import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SightingsForm from "./SightingsForm";

describe("SightingsForm Component", () => {
  it("renders the Add Sighting form", () => {
    // Arrange
    render(<SightingsForm />);

    // Act
    const heading = screen.getByText("Add Sighting");

    // Assert
    expect(heading).toBeDefined();
  });
});
