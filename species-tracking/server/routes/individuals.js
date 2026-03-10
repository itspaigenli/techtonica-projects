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
        i.wikipedia_url,
        i.photo_url,
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
        i.wikipedia_url,
        i.photo_url,
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

// GET one individual by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `
      SELECT
        i.id,
        i.nickname,
        i.scientist_tracking,
        i.species_id,
        i.wikipedia_url,
        i.photo_url,
        sp.common_name,
        sp.scientific_name,
        COUNT(s.id) AS sighting_count,
        MIN(s.sighting_datetime) AS first_sighting,
        MAX(s.sighting_datetime) AS most_recent_sighting
      FROM individuals i
      JOIN species sp ON i.species_id = sp.id
      LEFT JOIN sightings s ON i.id = s.individual_id
      WHERE i.id = $1
      GROUP BY
        i.id,
        i.nickname,
        i.scientist_tracking,
        i.species_id,
        i.wikipedia_url,
        i.photo_url,
        sp.common_name,
        sp.scientific_name;
    `;

    const result = await pool.query(sql, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Individual not found." });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET /individuals/:id error:", err);
    res.status(500).json({ error: "Server error fetching individual." });
  }
});

// POST new individual
router.post("/", async (req, res) => {
  try {
    const {
      nickname,
      scientist_tracking,
      species_id,
      wikipedia_url,
      photo_url,
    } = req.body;

    if (!nickname || !scientist_tracking || !species_id) {
      return res.status(400).json({
        error: "nickname, scientist_tracking, and species_id are required.",
      });
    }

    const sql = `
      INSERT INTO individuals (
        nickname,
        scientist_tracking,
        species_id,
        wikipedia_url,
        photo_url
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [
      nickname.trim(),
      scientist_tracking.trim(),
      species_id,
      wikipedia_url || null,
      photo_url || null,
    ];

    const result = await pool.query(sql, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /individuals error:", err);
    res.status(500).json({ error: "Server error creating individual." });
  }
});

export default router;
