import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET sightings (joined with nickname and common name)
router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT
        s.id AS sighting_id,
        s.sighting_datetime,
        s.location,

        i.id AS individual_id,
        i.nickname,
        i.scientist_tracking,

        sp.id AS species_id,
        sp.common_name,
        sp.scientific_name,
        sp.estimated_population,
        sp.conservation_status
      FROM sightings s
      JOIN individuals i ON s.individual_id = i.id
      JOIN species sp ON i.species_id = sp.id
      ORDER BY s.sighting_datetime DESC;
    `;

    const result = await pool.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /sightings error:", err);
    res.status(500).json({ error: "Server error fetching sightings." });
  }
});

export default router;
