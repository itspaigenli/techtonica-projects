import { describe, it, expect } from "vitest";

describe("Sightings API", () => {
  it("GET /sightings returns data", async () => {
    // Arrange
    const url = "http://localhost:3000/sightings";

    // Act
    const response = await fetch(url);
    const data = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });
});
