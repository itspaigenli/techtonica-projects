//create Express App

import express from 'express'
const app = express();
app.use(express.json());

//related to postgreSQL connection
import dotenv from 'dotenv';
import { pool } from './postgresdb.js';

dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running. Try GET /novels");
});

// Middleware to parse JSON requests
app.use(express.json());

//define PORT
const PORT = process.env.PORT || 601;

//GET all novels
app.get("/novels", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM graphicnovels;"
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//GET one novel
app.get("/novels/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;

    const result = await pool.query(
      "SELECT * FROM graphicnovels WHERE isbn = $1::bigint;",
      [isbn]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Novel not found" });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//POST new novel
app.post("/novels", async (req, res) => {
  try {
    const isbn = req.body.isbn;
    const title = req.body.title;
    const author = req.body.author;
    const illustrator = req.body.illustrator;
    const format = req.body.format;

    const result = await pool.query(
      "INSERT INTO graphicnovels (isbn, title, author, illustrator, format) VALUES ($1::bigint, $2, $3, $4, $5) RETURNING *;",
      [isbn, title, author, illustrator, format]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//PUT (update) a novel by isbn
app.put("/novels/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const title = req.body.title;
    const author = req.body.author;
    const illustrator = req.body.illustrator;
    const format = req.body.format;

    const result = await pool.query(
      "UPDATE graphicnovels SET title = $1, author = $2, illustrator = $3, format = $4 WHERE isbn = $5::bigint RETURNING *;",
      [title, author, illustrator, format, isbn]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Novel not found" });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//DELETE novel by isbn
app.delete("/novels/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;

    const result = await pool.query(
      "DELETE FROM graphicnovels WHERE isbn = $1::bigint RETURNING *;",
      [isbn]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Novel not found" });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//start server
app.listen(PORT, () => console.log(`Server has started on ${PORT}`))

