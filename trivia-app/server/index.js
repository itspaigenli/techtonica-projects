import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3001;

// Configuring cors middleware
app.use(cors());


// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// //creates an endpoint for the route `/`
app.get("/", (req, res) => {
    res.json("Hello Techtonica Server for a Game");
  });

// Make the GET request for the GAME Api for grabbing all the questions 
app.get("/api/game", async (req, res) => {
  try {
    const amount = req.query.amount || "10";      // default 10
    const category = req.query.category || "";   // default: any
    const difficulty = req.query.difficulty || "";
    const type = req.query.type || "";

    const params = new URLSearchParams();
    params.set("amount", String(amount));

    if (category) params.set("category", String(category));
    if (difficulty) params.set("difficulty", String(difficulty));
    if (type) params.set("type", String(type));

    const url = `https://opentdb.com/api.php?${params.toString()}`;

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});



app.listen(PORT, () => console.log(`Hola! Server running on Port http://localhost:${PORT}`));