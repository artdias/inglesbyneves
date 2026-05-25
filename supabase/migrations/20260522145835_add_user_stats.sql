ALTER TABLE public.profiles
  ADD COLUMN active_streak INTEGER DEFAULT 0,
  ADD COLUMN total_hours INTEGER DEFAULT 0,
  ADD COLUMN vocab_learned INTEGER DEFAULT 0,
  ADD COLUMN plan_type TEXT DEFAULT 'Premium Plan';
