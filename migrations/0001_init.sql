CREATE TABLE IF NOT EXISTS runs (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  date_label TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS journal_articles (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  dek TEXT NOT NULL,
  date_label TEXT NOT NULL,
  read_time TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS gallery_items (
  id TEXT PRIMARY KEY NOT NULL,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  caption TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS doc_links (
  id TEXT PRIMARY KEY NOT NULL,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

INSERT OR IGNORE INTO runs (id, title, location, date_label, note, created_at, updated_at) VALUES
  ('silent-city', 'Silent City — 12k', 'North embankment', 'Sat 24 — 05:15', 'No music. Headlamps optional.', 1700000000, 1700000000),
  ('tempo-clinic', 'Tempo Clinic — small circle', 'Industrial district loop', 'Wed 28 — 19:30', 'Bring layers. Wind is honest.', 1700000001, 1700000001),
  ('long-slow-distance', 'Long slow distance', 'River trail out-and-back', 'Sun 02 — 06:00', 'Conversational pace only.', 1700000002, 1700000002);

INSERT OR IGNORE INTO journal_articles (id, title, dek, date_label, read_time, created_at, updated_at) VALUES
  ('silence-between-intervals', 'Notes on silence between intervals', 'What we do not say at the water fountain is part of the training.', 'Field Log 014', '6 min', 1700000000, 1700000000),
  ('pacing-as-patience', 'Pacing as patience', 'The collective learns restraint before it learns speed.', 'Field Log 011', '4 min', 1700000001, 1700000001),
  ('night-routes', 'Night routes, documented poorly on purpose', 'Some miles are not for sharing. They are for remembering.', 'Field Log 009', '5 min', 1700000002, 1700000002);

INSERT OR IGNORE INTO gallery_items (id, src, alt, caption, sort_order, created_at) VALUES
  ('river-crossing', 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80', 'Runners crossing a bridge in early fog', '05:12 — river crossing', 0, 1700000000),
  ('warmth-before-cold', 'https://images.unsplash.com/photo-1552674605-5d2178b85608?auto=format&fit=crop&w=1200&q=80', 'Athlete stretching calves on city curb', 'warmth before the cold set', 1, 1700000001),
  ('track-lanes', 'https://images.unsplash.com/photo-1517649763962-0c62306601b7?auto=format&fit=crop&w=1200&q=80', 'Track lanes at dusk', 'lines are suggestions', 2, 1700000002);

INSERT OR IGNORE INTO doc_links (id, label, href, description, sort_order, created_at, updated_at) VALUES
  ('hub', 'Documentation hub', '/docs', 'All project guides in one place.', 0, 1700000000, 1700000000),
  ('architecture', 'Architecture', '/docs/architecture', 'Layers, folders, and data flow.', 1, 1700000000, 1700000000),
  ('contributing', 'Contributing', '/docs/contributing', 'Setup, conventions, and PR checklist.', 2, 1700000000, 1700000000),
  ('content', 'Content guide', '/docs/content', 'JSON schemas and publish workflow.', 3, 1700000000, 1700000000);
