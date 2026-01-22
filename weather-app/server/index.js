import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 5050;
const LAT = process.env.LAT;
const LON = process.env.LON;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// Safety check
if (!LAT || !LON || !OPENWEATHER_API_KEY) {
  throw new Error(
    "Missing LAT, LON, or OPENWEATHER_API_KEY in environment variables"
  );
}

// Route
app.get("/api/weather", async (req, res) => {
  const url =
    `https://api.openweathermap.org/data/2.5/weather` +
    `?lat=${LAT}&lon=${LON}&units=imperial&appid=${OPENWEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weather data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server has started on ${PORT}`);
});
