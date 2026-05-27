ALTER TABLE public.schedule ADD COLUMN student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE;
ALTER TABLE public.schedule ADD COLUMN call_link TEXT;
