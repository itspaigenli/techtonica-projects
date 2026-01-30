# Weather App

A full-stack weather application built with React, Express, and OpenWeatherMap API.

## Features
- Search by City name.
- Displays current temperature, humidity, wind speed, and weather conditions.
- Responsive design for mobile and desktop.
- Dynamic weather icons based on conditions.

## Visuals
[Project Screenshot](./public/weatherapp.png)

## Frontend Setup Instructions
- Open a new terminal and navigate to the client directory
- Install dependencies: npm install
- Start the frontend: npm run dev
- Open browser to http://localhost:5173

### Prerequisites
- [OpenWeatherMap API Key](https://openweathermap.org/api)
- Node.js, Express, Nodemon, React+Vite, CORS, Dotenv

### 1. Backend Setup
1. Navigate to `/server`.
2. Run `npm install`.
3. Create a `.env` file and add:
   ```env
   PORT=5050
   OPENWEATHER_API_KEY=your_api_key_here
   LAT=37.4636
   LON=-122.4286