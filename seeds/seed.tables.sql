BEGIN;

TRUNCATE
  "word",
  "language",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'admin',
    'Dunder Mifflin Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'Japanese', 1);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  (1, 1, 'あ', 'a', 2),
  (2, 1, 'い', 'i', 3),
  (3, 1, 'う', 'u', 4),
  (4, 1, 'え', 'e', 5),
  (5, 1, 'お', 'o', 6),
  (6, 1, 'か', 'ka', 7),
  (7, 1, 'き', 'ki', 8),
  (8, 1, 'く', 'ku', 9),
  (9, 1, 'け','ke', 10),
  (10, 1, 'こ', 'ko', 11),
  (11, 1, 'さ', 'sa', 12),
  (12, 1, 'し', 'shi', 13),
  (13, 1, 'す', 'su', 14),
  (14, 1, 'せ', 'se', 15),
  (15, 1, 'そ', 'so', 16),
  (16, 1, 'た', 'ta', 17),
  (17, 1, 'ち', 'chi', 18),
  (18, 1, 'つ', 'tsu', 19),
  (19, 1, 'て', 'te', 20),
  (20, 1, 'と', 'to', 21),
  (21, 1, 'な', 'na', 22),
  (22, 1, 'に', 'ni', 23),
  (23, 1, 'ぬ', 'nu', 24),
  (24, 1, 'ね', 'ne', 25),
  (25, 1, 'の', 'no', null);
  --stopped at 10 alphabeta characters, we can add the remaining letters later
  -- also need to update the languageWords in /src/user/user-service.js

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
