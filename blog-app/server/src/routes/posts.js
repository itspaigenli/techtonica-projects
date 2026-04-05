import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET /posts (actual data)
router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT
        p.id,
        p.title,
        p.content,
        p.status,
        p.publish_date,
        p.feature_image_url,
        c.name AS category_name
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id;
    `;

    const result = await pool.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /posts error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* GET /posts (test connection)
router.get("/", (req, res) => {
  res.json([{ message: "GET /posts working" }]);
}); */

export default router;
