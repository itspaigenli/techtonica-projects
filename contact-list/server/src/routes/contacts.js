import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json([{ id: 1, name: "Test Contact" }]);
});

export default router;
