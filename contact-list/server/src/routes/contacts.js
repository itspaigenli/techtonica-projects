import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts ORDER BY id;");
    res.json(result.rows);
  } catch (error) {
    console.error("GET /contacts error:", error);
    res.status(500).json({ error: "Failed to fetch contacts." });
  }
});

export default router;
