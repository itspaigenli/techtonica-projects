# Weather App

A full-stack weather application built with React, Express, and OpenWeatherMap API.

## Features
- Search by City name.
- Displays current temperature, humidity, wind speed, and weather conditions.
- Responsive design for mobile and desktop.
- Dynamic weather icons based on conditions.

## Visuals
![Project Screenshot](https://via.placeholder.com/600x400?text=Insert+Your+Screenshot+Here)
*(Tip: Replace this with a real screenshot or a GIF of your app in action)*

## Setup Instructions

### Prerequisites
- [OpenWeatherMap API Key](https://openweathermap.org/api)

### 1. Backend Setup
1. Navigate to `/server`.
2. Run `npm install`.
3. Create a `.env` file and add:
   ```env
   PORT=5050
   OPENWEATHER_API_KEY=your_api_key_here
   LAT=37.4636
   LON=-122.4286