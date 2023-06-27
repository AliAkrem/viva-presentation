export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admins_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      departments: {
        Row: {
          created_at: string | null
          department_name: string
          faculty_id: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          department_name: string
          faculty_id?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          department_name?: string
          faculty_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_faculty_id_fkey"
            columns: ["faculty_id"]
            referencedRelation: "faculty"
            referencedColumns: ["id"]
          }
        ]
      }
      faculty: {
        Row: {
          created_at: string | null
          faculty_name: string
          id: string
        }
        Insert: {
          created_at?: string | null
          faculty_name: string
          id?: string
        }
        Update: {
          created_at?: string | null
          faculty_name?: string
          id?: string
        }
        Relationships: []
      }
      grade: {
        Row: {
          created_at: string | null
          id: string
          position: string
          position_abbriviated: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          position: string
          position_abbriviated: string
        }
        Update: {
          created_at?: string | null
          id?: string
          position?: string
          position_abbriviated?: string
        }
        Relationships: []
      }
      reasearch_foci: {
        Row: {
          created_at: string | null
          id: string
          theme_of_research: string
        }
        Insert: {
          created_at?: string | null
          id: string
          theme_of_research: string
        }
        Update: {
          created_at?: string | null
          id?: string
          theme_of_research?: string
        }
        Relationships: []
      }
      registration: {
        Row: {
          created_at: string | null
          mgc: number | null
          ms1: number | null
          ms2: number | null
          observation: string | null
          specialty_id: string
          student_id: string
        }
        Insert: {
          created_at?: string | null
          mgc?: number | null
          ms1?: number | null
          ms2?: number | null
          observation?: string | null
          specialty_id: string
          student_id: string
        }
        Update: {
          created_at?: string | null
          mgc?: number | null
          ms1?: number | null
          ms2?: number | null
          observation?: string | null
          specialty_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "registration_specialty_id_fkey"
            columns: ["specialty_id"]
            referencedRelation: "specialty"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registration_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      roles: {
        Row: {
          id: string
          role: string
        }
        Insert: {
          id?: string
          role?: string
        }
        Update: {
          id?: string
          role?: string
        }
        Relationships: []
      }
      specialty: {
        Row: {
          created_at: string
          department_id: string
          has_commission: boolean
          has_presentation: boolean
          id: string
          specilty_name: string
          topic_based: boolean
        }
        Insert: {
          created_at?: string
          department_id: string
          has_commission?: boolean
          has_presentation?: boolean
          id?: string
          specilty_name: string
          topic_based?: boolean
        }
        Update: {
          created_at?: string
          department_id?: string
          has_commission?: boolean
          has_presentation?: boolean
          id?: string
          specilty_name?: string
          topic_based?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "specialty_department_id_fkey"
            columns: ["department_id"]
            referencedRelation: "departments"
            referencedColumns: ["id"]
          }
        ]
      }
      specialty_managers: {
        Row: {
          specialty_id: string
          teacher_id: string
        }
        Insert: {
          specialty_id: string
          teacher_id: string
        }
        Update: {
          specialty_id?: string
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "specialty_managers_specialty_id_fkey"
            columns: ["specialty_id"]
            referencedRelation: "specialty"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "specialty_managers_teacher_id_fkey"
            columns: ["teacher_id"]
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          }
        ]
      }
      students: {
        Row: {
          id: string
          student_code: string
        }
        Insert: {
          id: string
          student_code: string
        }
        Update: {
          id?: string
          student_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      teacher_reasearch_foci: {
        Row: {
          created_at: string | null
          foci_id: string
          teacher_id: string
        }
        Insert: {
          created_at?: string | null
          foci_id: string
          teacher_id: string
        }
        Update: {
          created_at?: string | null
          foci_id?: string
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_reasearch_foci_foci_id_fkey"
            columns: ["foci_id"]
            referencedRelation: "reasearch_foci"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_reasearch_foci_teacher_id_fkey"
            columns: ["teacher_id"]
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          }
        ]
      }
      teachers: {
        Row: {
          grade_id: string | null
          id: string
          personal_email: string | null
        }
        Insert: {
          grade_id?: string | null
          id: string
          personal_email?: string | null
        }
        Update: {
          grade_id?: string | null
          id?: string
          personal_email?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teachers_grade_id_fkey"
            columns: ["grade_id"]
            referencedRelation: "grade"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teachers_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_role: {
        Row: {
          created_at: string | null
          role_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          role_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_role_role_id_fkey"
            columns: ["role_id"]
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_role_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          first_name: string
          id: string
          last_name: string
          updated_at: string | null
          user_email: string
        }
        Insert: {
          created_at?: string
          first_name: string
          id: string
          last_name: string
          updated_at?: string | null
          user_email: string
        }
        Update: {
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          updated_at?: string | null
          user_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      year_scholar: {
        Row: {
          created_at: string | null
          id: string
          start: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          start: number
        }
        Update: {
          created_at?: string | null
          id?: string
          start?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role_access: {
        Args: {
          user_id: string
          role_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
