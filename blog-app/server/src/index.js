import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postsRouter from "./routes/posts.js";
import categoriesRouter from "./routes/categories.js";
import rankingsRouter from "./routes/rankings.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
  }),
);

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Connect posts route
app.use("/posts", postsRouter);
app.use("/categories", categoriesRouter);
app.use("/rankings", rankingsRouter);

export default app;

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
