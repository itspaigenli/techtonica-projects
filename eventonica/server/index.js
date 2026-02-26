import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "你好，这是我的 ExpressJS 和 React-Vite 模板" });
});

// GET all events
app.get("/events", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, event_date, event_time, title, is_favorite
       FROM events
       ORDER BY event_date, event_time`,
    );
    res.json(rows);
  } catch (err) {
    console.error("GET /events error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET one event by id
app.get("/events/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const { rows } = await pool.query(
      `SELECT id, event_date, event_time, title, is_favorite
       FROM events
       WHERE id = $1`,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("GET /events/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// CREATE event
app.post("/events", async (req, res) => {
  const { event_date, event_time, title, is_favorite = false } = req.body;

  if (!event_date || !event_time || !title) {
    return res
      .status(400)
      .json({ error: "event_date, event_time, and title are required" });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO events (event_date, event_time, title, is_favorite)
       VALUES ($1, $2, $3, $4)
       RETURNING id, event_date, event_time, title, is_favorite`,
      [event_date, event_time, title, Boolean(is_favorite)],
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("POST /events error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE event
app.put("/events/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { event_date, event_time, title, is_favorite } = req.body;

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  if (
    !event_date ||
    !event_time ||
    !title ||
    typeof is_favorite === "undefined"
  ) {
    return res.status(400).json({
      error: "event_date, event_time, title, and is_favorite are required",
    });
  }

  try {
    const { rows } = await pool.query(
      `UPDATE events
       SET event_date = $1,
           event_time = $2,
           title = $3,
           is_favorite = $4
       WHERE id = $5
       RETURNING id, event_date, event_time, title, is_favorite`,
      [event_date, event_time, title, Boolean(is_favorite), id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("PUT /events/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE event
app.delete("/events/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const { rows } = await pool.query(
      `DELETE FROM events
       WHERE id = $1
       RETURNING id, event_date, event_time, title, is_favorite`,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("DELETE /events/:id error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
