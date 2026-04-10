import express from "express";

const router = express.Router();

// GET /resources (test connection)
router.get("/", (req, res) => {
  res.json([{ message: "GET /resources working" }]);
});

export default router;
