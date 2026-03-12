# FaunaDex

FaunaDex is a full-stack PERN application used to track endangered animal sightings. Scientists can record individual animals, log sightings, and review observation history for research purposes.

This project was built as part of the **Techtonica Full-Stack Software Engineering curriculum** to practice building a full-stack application using **PostgreSQL, Express, React, and Node.js**.

---

# Features

## Species Tracking

The application stores endangered animal species including:

- common name
- scientific name
- estimated population
- conservation status

Species are displayed in a compact list for quick reference.

---

## Individual Animal Tracking

Scientists track specific animals within a species.

Each individual record includes:

- nickname
- species
- assigned scientist
- optional Wikipedia link
- optional photo

Individuals appear in a compact expandable accordion view.

When expanded, additional data appears:

- sighting count
- first sighting
- most recent sighting
- link to detailed profile

---

## Sightings Tracking

Scientists can record sightings of tracked animals.

Each sighting includes:

- individual animal
- location
- date and time

Sightings are displayed in a list showing:

- individual nickname
- species
- location
- timestamp

Users can also delete sightings.

---

## Date Range Filtering

Users can filter sightings by date range.

Example use case:

> Show all sightings between March 1 and March 10.

The filter uses a React interface and backend query parameters.

---

## Individual Detail View

Each individual animal has a detail view containing:

- photo
- species information
- scientist tracking the animal
- first and most recent sightings
- Wikipedia reference link

---

# CRUD Operations

### Create

- add individual
- add sighting

### Read

- list species
- list individuals
- list sightings
- view individual details

### Delete

- delete individuals
- delete sightings

---

# Tech Stack

## Frontend

- React
- Vite
- CSS

## Backend

- Node.js
- Express

## Database

- PostgreSQL

## Other Tools

- pg
- dotenv

---

# Database Structure

The database contains three core tables.

## Species

| Column               | Type         |
| -------------------- | ------------ |
| id                   | integer (PK) |
| common_name          | text         |
| scientific_name      | text         |
| estimated_population | integer      |
| conservation_status  | text         |
| created_at           | timestamp    |

---

## Individuals

| Column             | Type         |
| ------------------ | ------------ |
| id                 | integer (PK) |
| nickname           | text         |
| scientist_tracking | text         |
| species_id         | integer (FK) |
| wikipedia_url      | text         |
| photo_url          | text         |
| created_at         | timestamp    |

---

## Sightings

| Column            | Type         |
| ----------------- | ------------ |
| id                | integer (PK) |
| sighting_datetime | timestamp    |
| individual_id     | integer (FK) |
| location          | text         |
| created_at        | timestamp    |

---

# Running the Project Locally

## 1. Clone the repository

````bash
git clone <your-repo-url>
cd species-tracking

## 2. Install dependencies

```bash
cd server
npm install

## 3. Setup PostgreSQL

```bash
createdb speciestrackingdb
psql speciestrackingdb < db.sql

## 4. Configure environmental variables

```bash
DATABASE_URL=postgres://localhost:5432/speciestrackingdb
PORT=3000

## 5. Start the backend server

```bash
cd server
npm run dev
(http://localhost:3000)

## 6. Start the frontend

```bash
cd client
npm run dev
(http://localhost:5173)

---

# Testing

Testing includes unit tests for React components and
API testing for the sightings endpoints

---

# Author

Paige Li
Techtonica Software Engineering Bootcamp

---

# Screenshots

## Dashboard Overview

The main dashboard shows the forms for adding sightings and individuals, the species reference panel, and the lists of sightings and tracked animals.

![FaunaDex Dashboard](screenshots/dashboard.png)

---

## Adding a Sighting

Users can record a new sighting by selecting an individual animal, specifying a location, and choosing the date and time.

![Add Sighting](screenshots/add-sighting.png)

---

## Individuals Accordion

Tracked animals appear in an expandable list. Clicking an individual reveals additional information including sighting statistics.

![Individuals Accordion](screenshots/individuals.png)

---

## Individual Detail Modal

Each individual animal has a detailed view with photo, species information, and links to additional references such as Wikipedia.

![Individual Detail](screenshots/individual-detail.png)

---

## Date Range Filtering

Sightings can be filtered by date range to review observations within a specific time period.

![Date Filter](screenshots/date-filter.png)
````
