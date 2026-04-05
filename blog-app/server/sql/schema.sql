-- Drop tables if they exist (for clean reset)
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS categories;

-- Categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

-- Posts table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  tags TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  discussion_status TEXT DEFAULT 'open',
  publish_date TIMESTAMP,
  feature_image_url TEXT
);