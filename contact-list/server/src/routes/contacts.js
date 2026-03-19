import express from "express";
import pool from "../db.js";

const router = express.Router();

// Purpose: Fetch all contacts from the database and send them to the client (http://localhost:3000/contacts)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts ORDER BY id;");
    res.json(result.rows);
  } catch (error) {
    console.error("GET /contacts error:", error);
    res.status(500).json({ error: "Failed to fetch contacts." });
  }
});

// POST NEW -
router.post("/", async (req, res) => {
  try {
    const {
      temporal_id,
      temporal_contact,
      current_timeline,
      origin_timeline,
      mission_notes,
      status,
    } = req.body;

    if (
      !temporal_id ||
      !temporal_contact ||
      current_timeline === undefined ||
      origin_timeline === undefined
    ) {
      return res.status(400).json({
        error: "Required fields are missing.",
      });
    }

    const result = await pool.query(
      `INSERT INTO contacts
       (
         temporal_id,
         temporal_contact,
         current_timeline,
         origin_timeline,
         mission_notes,
         status
       )
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        temporal_id,
        temporal_contact,
        Number(current_timeline),
        Number(origin_timeline),
        mission_notes || null,
        status || null,
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("POST /contacts error:", error);
    res.status(500).json({ error: "Failed to create contact." });
  }
});

export default router;
