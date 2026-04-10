import express from "express";

const router = express.Router();

// GET /posts (test connection)
router.get("/", (req, res) => {
  res.json([{ message: "GET /posts working" }]);
});

export default router;
