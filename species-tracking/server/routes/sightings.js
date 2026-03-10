import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET sightings (with optional date filter)
router.get("/", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let sql = `
      SELECT
        s.id AS sighting_id,
        s.sighting_datetime,
        s.location,
        i.nickname,
        sp.common_name
      FROM sightings s
      JOIN individuals i ON s.individual_id = i.id
      JOIN species sp ON i.species_id = sp.id
    `;

    const values = [];
    const conditions = [];

    if (startDate) {
      values.push(startDate);
      conditions.push(`s.sighting_datetime >= $${values.length}`);
    }

    if (endDate) {
      values.push(endDate);
      conditions.push(`s.sighting_datetime <= $${values.length}`);
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(" AND ")}`;
    }

    sql += ` ORDER BY s.sighting_datetime DESC`;

    const result = await pool.query(sql, values);
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
