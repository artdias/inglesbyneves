-- Delete existing modules to avoid duplicates
DELETE FROM public.modules;

-- Insert Module 1
INSERT INTO public.modules (id, title, tag, description, is_active)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Module 1: Travel & Business',
  'Travel',
  'Master English for international airports, hotels, and business small talk.',
  true
);

-- Insert Lessons for Module 1
INSERT INTO public.lessons (id, module_id, title, description, video_url, duration, order_index)
VALUES 
(
  '22222222-2222-2222-2222-222222222221',
  '11111111-1111-1111-1111-111111111111',
  'Introduction to Business Travel',
  'A quick overview of what we will learn in this module.',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ', -- Example external video
  '03:32',
  1
),
(
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  'Navigating Airports',
  'Learn vocabulary to navigate international airports.',
  'https://www.youtube.com/watch?v=aqz-KE-bpKQ', -- Example external video
  '14:20',
  2
),
(
  '22222222-2222-2222-2222-222222222223',
  '11111111-1111-1111-1111-111111111111',
  'Hotel Check-in',
  'What to say when checking into a hotel.',
  'https://www.youtube.com/watch?v=jNQXAC9IVRw', -- Example external video
  '05:15',
  3
);
