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
    const { field1, field2 } = req.body;

    const result = await pool.query(
      `INSERT INTO table_name (field1, field2)
      VALUES ($1, $2)
      RETURNING *`,
      [field1, field2],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("POST /table_name error:", error);
    res.status(500).json({ error: "Server error creating record." });
  }
});

export default router;
