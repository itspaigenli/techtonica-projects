import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET all sightings
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

// POST new sighting
router.post("/", async (req, res) => {
  try {
    const { sighting_datetime, individual_id, location } = req.body;

    if (!sighting_datetime || !individual_id || !location?.trim()) {
      return res.status(400).json({
        error: "sighting_datetime, individual_id, and location are required.",
      });
    }

    const sql = `
      INSERT INTO sightings (sighting_datetime, individual_id, location)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [sighting_datetime, individual_id, location.trim()];
    const result = await pool.query(sql, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /sightings error:", err);
    res.status(500).json({ error: "Server error creating sighting." });
  }
});

export default router;
