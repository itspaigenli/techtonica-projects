import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SightingsForm from "./SightingsForm";

describe("SightingsForm Component", () => {
  it("renders the Add Sighting form", () => {
    // Arrange
    render(<SightingsForm onSightingAdded={() => {}} refreshKey={0} />);

    // Act
    const elements = screen.getAllByText("Add Sighting");

    // Assert
    expect(elements[0]).toBeDefined();
  });
});
