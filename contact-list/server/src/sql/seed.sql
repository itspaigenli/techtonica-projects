INSERT INTO contacts
(temporal_id, temporal_contact, current_timeline, origin_timeline, mission_notes, status)
VALUES
('Agent A1', 'alpha@chronoregistry.io', 2025, 1999, 'Tracking anomaly in Sector 7', 'Active'),
('Agent B2', 'beta@chronoregistry.io', 1984, 2025, 'Displaced during timeline merge', 'Missing'),
('Agent C3', 'gamma@chronoregistry.io', 3021, 2500, NULL, 'Under Observation'),
('Agent D4', 'delta@chronoregistry.io', 1600, 1400, 'Medieval insertion mission', 'Archived'),
('Agent E5', 'epsilon@chronoregistry.io', 2100, 2025, NULL, NULL);

/* status is a drop-down: Active, Missing, Under Observation, Archived, Unknown */