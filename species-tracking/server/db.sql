-- =========================
-- FaunaDex Database Schema
-- =========================

-- Drop tables if they exist (safe reset order)
DROP TABLE IF EXISTS sightings;
DROP TABLE IF EXISTS individuals;
DROP TABLE IF EXISTS species;

-- =========================
-- Species Table
-- =========================

CREATE TABLE species (
    id SERIAL PRIMARY KEY,
    common_name VARCHAR(100) NOT NULL,
    scientific_name VARCHAR(150) NOT NULL,
    estimated_population INTEGER,
    conservation_status VARCHAR(5) NOT NULL
);

-- =========================
-- Individuals Table
-- =========================

CREATE TABLE individuals (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(100) NOT NULL,
    scientist_tracking VARCHAR(150) NOT NULL,
    species_id INTEGER NOT NULL,
    wikipedia_url TEXT,
    photo_url TEXT,
    CONSTRAINT fk_species
        FOREIGN KEY (species_id)
        REFERENCES species(id)
        ON DELETE CASCADE
);

-- =========================
-- Sightings Table
-- =========================

CREATE TABLE sightings (
    id SERIAL PRIMARY KEY,
    sighting_datetime TIMESTAMP NOT NULL,
    individual_id INTEGER NOT NULL,
    location TEXT NOT NULL,
    CONSTRAINT fk_individual
        FOREIGN KEY (individual_id)
        REFERENCES individuals(id)
        ON DELETE CASCADE
);

-- =========================
-- Seed Data for FaunaDex
-- =========================

-- -------------------------
-- Species
-- -------------------------

INSERT INTO species (common_name, scientific_name, estimated_population, conservation_status)
VALUES
('Tiger', 'Panthera tigris', 3900, 'EN'),
('Polar Bear', 'Ursus maritimus', 26000, 'VU'),
('Black Rhino', 'Diceros bicornis', 5600, 'CR');


-- -------------------------
-- Individuals
-- -------------------------

INSERT INTO individuals (nickname, scientist_tracking, species_id, wikipedia_url, photo_url)
VALUES
('Stripe', 'Dr. Nguyen', 1, 'https://en.wikipedia.org/wiki/Tiger', 'https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg'),
('Ember', 'Dr. Patel', 1, 'https://en.wikipedia.org/wiki/Tiger', 'https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg'),
('Snowball', 'Dr. Kim', 2, 'https://en.wikipedia.org/wiki/Polar_bear', 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Polar_Bear_-_Alaska.jpg'),
('Frost', 'Dr. Alvarez', 2, 'https://en.wikipedia.org/wiki/Polar_bear', 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Polar_Bear_-_Alaska.jpg'),
('Midnight', 'Dr. Okoye', 3, 'https://en.wikipedia.org/wiki/Black_rhinoceros', 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Diceros_bicornis_-_Etosha_2014.jpg'),
('Onyx', 'Dr. Chen', 3, 'https://en.wikipedia.org/wiki/Black_rhinoceros', 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Diceros_bicornis_-_Etosha_2014.jpg');


-- -------------------------
-- Sightings
-- -------------------------

INSERT INTO sightings (sighting_datetime, individual_id, location)
VALUES
('2025-01-10 09:30:00', 1, 'Sundarbans Reserve'),
('2025-02-14 14:15:00', 3, 'Arctic Circle - 72.5N'),
('2025-03-02 08:00:00', 5, 'Kruger National Park'),
('2025-03-15 17:45:00', 2, 'Western Ghats'),
('2025-03-20 11:20:00', 4, 'Hudson Bay');