import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//API Route
app.get("/api/events", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, event_date, event_time, title, is_favorite FROM events ORDER BY event_date ASC, event_time ASC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load events." });
  }
});

// CREATE
app.post("/api/events", async (req, res) => {
  const { event_date, event_time, title, is_favorite = false } = req.body;

  if (!event_date || !event_time || !title) {
    return res
      .status(400)
      .json({ error: "event_date, event_time, and title are required." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO events (event_date, event_time, title, is_favorite)
       VALUES ($1, $2, $3, $4)
       RETURNING id, event_date, event_time, title, is_favorite`,
      [event_date, event_time, title, is_favorite],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create event." });
  }
});

// UPDATE
app.put("/api/events/:id", async (req, res) => {
  const { id } = req.params;
  const { event_date, event_time, title, is_favorite = false } = req.body;

  if (!event_date || !event_time || !title) {
    return res
      .status(400)
      .json({ error: "event_date, event_time, and title are required." });
  }

  try {
    const result = await pool.query(
      `UPDATE events
       SET event_date = $1,
           event_time = $2,
           title = $3,
           is_favorite = $4
       WHERE id = $5
       RETURNING id, event_date, event_time, title, is_favorite`,
      [event_date, event_time, title, is_favorite, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Event not found." });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update event." });
  }
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
