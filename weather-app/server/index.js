import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
console.log("ENV CHECK:", {
  LAT: process.env.LAT,
  LON: process.env.LON,
  KEY: process.env.OPENWEATHER_API_KEY && "present"
});


const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5050;
const { LAT, LON, OPENWEATHER_API_KEY } = process.env;

if (!LAT || !LON || !OPENWEATHER_API_KEY) {
  throw new Error("Missing LAT, LON, or OPENWEATHER_API_KEY in environment variables");
}

app.get("/api/weather", async (req, res) => {
    console.log("HIT /api/weather");
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=imperial&appid=${OPENWEATHER_API_KEY}`;
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

app.listen(PORT, () => console.log(`Server has started on ${PORT}`));
