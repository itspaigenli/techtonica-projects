import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware 
app.use(cors());
app.use(express.json());

// Generic API Route 
app.get("/", (req, res) => {
  res.json({ message: "你好，这是我的 ExpressJS 和 React-Vite 模板" });
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});