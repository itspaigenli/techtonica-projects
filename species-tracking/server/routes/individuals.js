import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET all individuals with species info and sighting stats
router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT
        i.id,
        i.nickname,
        i.scientist_tracking,
        i.species_id,
        sp.common_name,
        sp.scientific_name,
        COUNT(s.id) AS sighting_count,
        MIN(s.sighting_datetime) AS first_sighting,
        MAX(s.sighting_datetime) AS most_recent_sighting
      FROM individuals i
      JOIN species sp ON i.species_id = sp.id
      LEFT JOIN sightings s ON i.id = s.individual_id
      GROUP BY
        i.id,
        i.nickname,
        i.scientist_tracking,
        i.species_id,
        sp.common_name,
        sp.scientific_name
      ORDER BY i.id;
    `;

    const result = await pool.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /individuals error:", err);
    res.status(500).json({ error: "Server error fetching individuals." });
  }
});

export default router;
