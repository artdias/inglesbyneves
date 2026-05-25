-- Allow any authenticated user to view teacher profiles so they can send them messages
CREATE POLICY "Anyone can view teacher profiles" ON public.profiles FOR SELECT USING (role = 'teacher'::user_role);
