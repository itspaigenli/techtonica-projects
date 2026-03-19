import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

// Route imports
import contactsRouter from "./routes/contacts.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health / root route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// API routes
app.use("/contacts", contactsRouter);

// Export app for testing
export default app;

// Start server only if not in test mode
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
