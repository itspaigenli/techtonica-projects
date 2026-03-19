CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  temporal_id TEXT NOT NULL,
  temporal_contact TEXT NOT NULL,
  current_timeline INTEGER NOT NULL,
  origin_timeline INTEGER NOT NULL,
  mission_notes TEXT,
  status TEXT
);