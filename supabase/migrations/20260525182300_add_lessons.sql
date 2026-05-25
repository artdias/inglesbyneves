-- Create Lessons Table
CREATE TABLE public.lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  duration TEXT NOT NULL, -- e.g., "12:45"
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Lesson Completions Table
CREATE TABLE public.lesson_completions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, lesson_id)
);

-- Enable RLS
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_completions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view lessons" ON public.lessons FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Teachers can manage lessons" ON public.lessons FOR ALL USING (public.is_teacher());

CREATE POLICY "Students view own completions" ON public.lesson_completions FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Students manage own completions" ON public.lesson_completions FOR ALL USING (student_id = auth.uid());
CREATE POLICY "Teachers view all completions" ON public.lesson_completions FOR SELECT USING (public.is_teacher());
