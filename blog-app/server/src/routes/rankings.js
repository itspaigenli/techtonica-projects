import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Hardcode for now
    const bashoId = "202401"; // example (Jan 2024)
    const division = "Makuuchi";

    const url = `https://www.sumo-api.com/api/basho/${bashoId}/banzuke/${division}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch rankings from Sumo API");
    }

    const data = await response.json();

    // Return raw data first (we will clean it later)
    res.json(data);
  } catch (err) {
    console.error("GET /rankings error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
