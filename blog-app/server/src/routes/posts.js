import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET /posts
router.get("/", async (req, res) => {
  try {
    const sql = `
        SELECT
    p.id,
    p.title,
    p.content,
    p.category_id,
    p.status,
    p.publish_date,
    p.feature_image_url,
    c.name AS category_name
  FROM posts p
  LEFT JOIN categories c ON p.category_id = c.id
  ORDER BY p.publish_date DESC NULLS LAST, p.id DESC;
`;

    const result = await pool.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /posts error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /posts
router.post("/", async (req, res) => {
  try {
    const { title, content, category_id, status, feature_image_url } = req.body;

    if (!title || !content || !category_id) {
      return res
        .status(400)
        .json({ error: "Title, content, and category are required" });
    }

    const publish_date = status === "published" ? new Date() : null;

    const sql = `
      INSERT INTO posts (
        title,
        content,
        category_id,
        status,
        publish_date,
        feature_image_url
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      title,
      content,
      category_id,
      status || "draft",
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

// PUT /posts/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category_id, status, feature_image_url } = req.body;

    if (!title || !content || !category_id) {
      return res
        .status(400)
        .json({ error: "Title, content, and category are required" });
    }

    const publish_date = status === "published" ? new Date() : null;

    const sql = `
      UPDATE posts
      SET
        title = $1,
        content = $2,
        category_id = $3,
        status = $4,
        publish_date = $5,
        feature_image_url = $6
      WHERE id = $7
      RETURNING *;
    `;

    const values = [
      title,
      content,
      category_id,
      status || "draft",
      publish_date,
      feature_image_url,
      id,
    ];

    const result = await pool.query(sql, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /posts/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /posts/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `
      DELETE FROM posts
      WHERE id = $1
      RETURNING *;
    `;

    const result = await pool.query(sql, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully", post: result.rows[0] });
  } catch (err) {
    console.error("DELETE /posts/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
