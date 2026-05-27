-- Teachers can manage user_progress
CREATE POLICY "Teachers can insert user_progress" ON public.user_progress FOR INSERT WITH CHECK (public.is_teacher());
CREATE POLICY "Teachers can update user_progress" ON public.user_progress FOR UPDATE USING (public.is_teacher());
CREATE POLICY "Teachers can delete user_progress" ON public.user_progress FOR DELETE USING (public.is_teacher());

-- Teachers can manage modules
CREATE POLICY "Teachers can insert modules" ON public.modules FOR INSERT WITH CHECK (public.is_teacher());
CREATE POLICY "Teachers can update modules" ON public.modules FOR UPDATE USING (public.is_teacher());
CREATE POLICY "Teachers can delete modules" ON public.modules FOR DELETE USING (public.is_teacher());

-- Teachers can manage schedule
CREATE POLICY "Teachers can insert schedule" ON public.schedule FOR INSERT WITH CHECK (public.is_teacher());
CREATE POLICY "Teachers can update schedule" ON public.schedule FOR UPDATE USING (public.is_teacher());
CREATE POLICY "Teachers can delete schedule" ON public.schedule FOR DELETE USING (public.is_teacher());

-- Teachers can manage lessons
CREATE POLICY "Teachers can insert lessons" ON public.lessons FOR INSERT WITH CHECK (public.is_teacher());
CREATE POLICY "Teachers can update lessons" ON public.lessons FOR UPDATE USING (public.is_teacher());
CREATE POLICY "Teachers can delete lessons" ON public.lessons FOR DELETE USING (public.is_teacher());
