-- Allow any authenticated user to view profiles so chat names can load
CREATE POLICY "Anyone can view profiles" ON public.profiles FOR SELECT USING (auth.role() = 'authenticated');
