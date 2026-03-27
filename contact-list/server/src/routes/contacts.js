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

// POST NEW
router.post("/", async (req, res) => {
  try {
    const {
      temporal_id,
      temporal_contact,
      current_timeline,
      origin_timeline,
      mission_notes,
      status,
      temporal_id_picture,
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
     status,
     temporal_id_picture
   )
   VALUES ($1, $2, $3, $4, $5, $6, $7)
   RETURNING *`,
      [
        temporal_id,
        temporal_contact,
        Number(current_timeline),
        Number(origin_timeline),
        mission_notes || null,
        status || null,
        temporal_id_picture || null,
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("POST /contacts error:", error);
    res.status(500).json({ error: "Failed to create contact." });
  }
});

// UPDATE EXISTING
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      temporal_id,
      temporal_contact,
      current_timeline,
      origin_timeline,
      mission_notes,
      status,
      temporal_id_picture,
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
      `UPDATE contacts
   SET
     temporal_id = $1,
     temporal_contact = $2,
     current_timeline = $3,
     origin_timeline = $4,
     mission_notes = $5,
     status = $6,
     temporal_id_picture = $7
   WHERE id = $8
   RETURNING *`,
      [
        temporal_id,
        temporal_contact,
        Number(current_timeline),
        Number(origin_timeline),
        mission_notes || null,
        status || null,
        temporal_id_picture || null,
        id,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Contact not found." });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("PUT /contacts/:id error:", error);
    res.status(500).json({ error: "Failed to update contact." });
  }
});

// DELETE -
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM contacts WHERE id = $1 RETURNING *;",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Contact not found." });
    }

    res.json({ message: "Contact deleted.", contact: result.rows[0] });
  } catch (error) {
    console.error("DELETE /contacts/:id error:", error);
    res.status(500).json({ error: "Failed to delete contact." });
  }
});

export default router;
