-- Insert Mock Modules
INSERT INTO public.modules (title, tag, description, is_active)
VALUES 
  ('The Basics', 'M1', 'Introduction to the fundamentals.', true),
  ('Daily Routines', 'M2', 'Vocabulary for your day-to-day life.', true),
  ('Travel & Business', 'M3', 'Essential phrases for traveling.', true),
  ('Advanced Grammar', 'M4', 'Deep dive into complex grammar.', false);

-- Insert Mock Announcements
INSERT INTO public.announcements (title, content, is_new)
VALUES 
  ('Halloween Special 🎃', 'Join us for a fun vocabulary session this Friday.', true),
  ('Community Challenge', 'Post an audio in Telegram!', false);

-- Insert Mock Schedule (set to dates slightly in the future relative to 2026-05)
INSERT INTO public.schedule (title, start_time, end_time, level)
VALUES 
  ('Conversation Practice', '2026-05-25T19:00:00Z', '2026-05-25T20:00:00Z', 'Beginner'),
  ('Business Phrasal Verbs', '2026-05-28T20:30:00Z', '2026-05-28T21:30:00Z', 'Advanced');
