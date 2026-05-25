-- Run this in your Supabase SQL Editor to insert mock progress for testing
DO $$
DECLARE
  v_user_id UUID;
  v_module_id UUID;
BEGIN
  -- Get the first user (you)
  SELECT id INTO v_user_id FROM auth.users LIMIT 1;
  
  -- Get the first module ("The Basics")
  SELECT id INTO v_module_id FROM public.modules LIMIT 1;

  IF v_user_id IS NOT NULL AND v_module_id IS NOT NULL THEN
    INSERT INTO public.user_progress (student_id, module_id, completion_percentage)
    VALUES (v_user_id, v_module_id, 45)
    ON CONFLICT (student_id, module_id) DO UPDATE SET completion_percentage = 45;
  END IF;
END $$;
