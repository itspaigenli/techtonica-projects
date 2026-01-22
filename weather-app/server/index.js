import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const { LAT, LON, OPENWEATHER_API_KEY } = process.env;

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=imperial&appid=${OPENWEATHER_API_KEY}`;

app.listen(PORT, () => console.log(`Server has started on ${PORT}`));