-- Insert categories
INSERT INTO categories (name, slug) VALUES
('Wrestler Profiles', 'wrestler-profiles'),
('Match Breakdowns', 'match-breakdowns'),
('Sumo for Beginners', 'sumo-for-beginners'),
('History of Sumo', 'history-of-sumo');

-- Insert posts
INSERT INTO posts (
  title,
  content,
  category_id,
  tags,
  status,
  discussion_status,
  publish_date,
  feature_image_url
)
VALUES
(
  'First Tournament Recap',
  'Summary of the latest sumo tournament.',
  1,
  'sumo,tournament',
  'published',
  'open',
  NOW(),
  NULL
),
(
  'Top Wrestlers to Watch',
  'A breakdown of rising stars in sumo.',
  2,
  'wrestlers,ranking',
  'draft',
  'open',
  NULL,
  NULL
),
(
  'Training Like a Rikishi',
  'An overview of daily training routines.',
  3,
  'training,fitness',
  'published',
  'open',
  NOW(),
  NULL
);