import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Route imports
import exampleRouter from "./routes/example.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health / root route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// API routes
app.use("/example", exampleRouter);

// Export app for testing
export default app;

// Start server only if not in test mode
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
