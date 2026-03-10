import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET all species
router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT
        id,
        common_name,
        scientific_name,
        estimated_population,
        conservation_status
      FROM species
      ORDER BY id;
    `;

    const result = await pool.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /species error:", err);
    res.status(500).json({ error: "Server error fetching species." });
  }
});

export default router;
