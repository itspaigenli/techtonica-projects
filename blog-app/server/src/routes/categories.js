import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT id, name, slug
      FROM categories
      ORDER BY name;
    `;

    const result = await pool.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /categories error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
