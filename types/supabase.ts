export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'student' | 'teacher'
          first_name: string | null
          last_name: string | null
          created_at: string
        }
        Insert: {
          id: string
          role?: 'student' | 'teacher'
          first_name?: string | null
          last_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          role?: 'student' | 'teacher'
          first_name?: string | null
          last_name?: string | null
          created_at?: string
        }
      }
      modules: {
        Row: {
          id: string
          title: string
          tag: string
          description: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          tag: string
          description?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          tag?: string
          description?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          student_id: string
          module_id: string
          completion_percentage: number
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          module_id: string
          completion_percentage?: number
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          module_id?: string
          completion_percentage?: number
          updated_at?: string
        }
      }
      announcements: {
        Row: {
          id: string
          title: string
          content: string
          is_new: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          is_new?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          is_new?: boolean
          created_at?: string
        }
      }
      schedule: {
        Row: {
          id: string
          title: string
          start_time: string
          end_time: string
          level: string
          student_id: string | null
          call_link: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          start_time: string
          end_time: string
          level: string
          student_id?: string | null
          call_link?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          start_time?: string
          end_time?: string
          level?: string
          student_id?: string | null
          call_link?: string | null
          created_at?: string
        }
      }
      assignments: {
        Row: {
          id: string
          title: string
          instructions: string
          due_date: string | null
          module_id: string | null
          teacher_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          instructions: string
          due_date?: string | null
          module_id?: string | null
          teacher_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          instructions?: string
          due_date?: string | null
          module_id?: string | null
          teacher_id?: string | null
          created_at?: string
        }
      }
      submissions: {
        Row: {
          id: string
          assignment_id: string
          student_id: string
          content: string | null
          status: 'pending' | 'graded'
          submitted_at: string
        }
        Insert: {
          id?: string
          assignment_id: string
          student_id: string
          content?: string | null
          status?: 'pending' | 'graded'
          submitted_at?: string
        }
        Update: {
          id?: string
          assignment_id?: string
          student_id?: string
          content?: string | null
          status?: 'pending' | 'graded'
          submitted_at?: string
        }
      }
      grades: {
        Row: {
          id: string
          submission_id: string
          score: number
          feedback: string | null
          teacher_id: string | null
          graded_at: string
        }
        Insert: {
          id?: string
          submission_id: string
          score: number
          feedback?: string | null
          teacher_id?: string | null
          graded_at?: string
        }
        Update: {
          id?: string
          submission_id?: string
          score?: number
          feedback?: string | null
          teacher_id?: string | null
          graded_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string | null
          title: string
          content: string
          type: string | null
          is_read: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          title: string
          content: string
          type?: string | null
          is_read?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          title?: string
          content?: string
          type?: string | null
          is_read?: boolean | null
          created_at?: string | null
        }
      }
      chat_messages: {
        Row: {
          id: string
          sender_id: string | null
          receiver_id: string | null
          content: string
          is_read: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          sender_id?: string | null
          receiver_id?: string | null
          content: string
          is_read?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          sender_id?: string | null
          receiver_id?: string | null
          content?: string
          is_read?: boolean | null
          created_at?: string | null
        }
      }
      lessons: {
        Row: {
          id: string
          module_id: string | null
          title: string
          description: string | null
          video_url: string
          duration: string
          order_index: number
          created_at: string | null
        }
        Insert: {
          id?: string
          module_id?: string | null
          title: string
          description?: string | null
          video_url: string
          duration: string
          order_index?: number
          created_at?: string | null
        }
        Update: {
          id?: string
          module_id?: string | null
          title?: string
          description?: string | null
          video_url?: string
          duration?: string
          order_index?: number
          created_at?: string | null
        }
      }
      lesson_completions: {
        Row: {
          id: string
          student_id: string | null
          lesson_id: string | null
          completed_at: string | null
        }
        Insert: {
          id?: string
          student_id?: string | null
          lesson_id?: string | null
          completed_at?: string | null
        }
        Update: {
          id?: string
          student_id?: string | null
          lesson_id?: string | null
          completed_at?: string | null
        }
      }
    }
  }
}
