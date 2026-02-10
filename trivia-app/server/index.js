import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 5000;

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
app.get('/api/game', async (req, res) => {
    try {
        const url = 'https://opentdb.com/api.php?amount=20&category=17';
        const response = await fetch(url);
        const data = await response.json();
        res.json(data); 
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch questions" });
    }
});

app.listen(PORT, () => console.log(`Hola! Server running on Port http://localhost:${PORT}`));