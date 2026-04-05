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

// POST
router.post("/", async (req, res) => {
  try {
    const {
      title,
      content,
      category_id,
      tags,
      status,
      discussion_status,
      feature_image_url,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const publish_date = status === "published" ? new Date() : null;

    const sql = `
      INSERT INTO posts (
        title,
        content,
        category_id,
        tags,
        status,
        discussion_status,
        publish_date,
        feature_image_url
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const values = [
      title,
      content,
      category_id,
      tags,
      status || "draft",
      discussion_status || "open",
      publish_date,
      feature_image_url,
    ];

    const result = await pool.query(sql, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /posts error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
