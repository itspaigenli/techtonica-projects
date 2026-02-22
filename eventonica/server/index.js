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

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
