export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      categorias: {
        Row: {
          icono: string | null
          id: number
          nombre: string
          orden: number | null
          slug: string
        }
        Insert: {
          icono?: string | null
          id?: number
          nombre: string
          orden?: number | null
          slug: string
        }
        Update: {
          icono?: string | null
          id?: number
          nombre?: string
          orden?: number | null
          slug?: string
        }
        Relationships: []
      }
      comentarios: {
        Row: {
          autor_nombre: string | null
          calificacion: number | null
          estado: string | null
          fecha: string | null
          id: number
          negocio_id: number | null
          texto: string | null
        }
        Insert: {
          autor_nombre?: string | null
          calificacion?: number | null
          estado?: string | null
          fecha?: string | null
          id?: number
          negocio_id?: number | null
          texto?: string | null
        }
        Update: {
          autor_nombre?: string | null
          calificacion?: number | null
          estado?: string | null
          fecha?: string | null
          id?: number
          negocio_id?: number | null
          texto?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comentarios_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
        ]
      }
      horarios: {
        Row: {
          dia_semana: number
          hora_apertura: string | null
          hora_cierre: string | null
          id: number
          negocio_id: number | null
        }
        Insert: {
          dia_semana: number
          hora_apertura?: string | null
          hora_cierre?: string | null
          id?: number
          negocio_id?: number | null
        }
        Update: {
          dia_semana?: number
          hora_apertura?: string | null
          hora_cierre?: string | null
          id?: number
          negocio_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "horarios_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
        ]
      }
      negocios: {
        Row: {
          catalogo_url: string | null
          categoria_id: number | null
          descripcion: string | null
          destacado: boolean | null
          direccion: string | null
          estado: string | null
          fecha_registro: string | null
          id: number
          instagram_url: string | null
          latitud: number | null
          logo_url: string | null
          longitud: number | null
          nombre: string
          plan_id: number | null
          portada_url: string | null
          slug: string
          whatsapp: string | null
        }
        Insert: {
          catalogo_url?: string | null
          categoria_id?: number | null
          descripcion?: string | null
          destacado?: boolean | null
          direccion?: string | null
          estado?: string | null
          fecha_registro?: string | null
          id?: number
          instagram_url?: string | null
          latitud?: number | null
          logo_url?: string | null
          longitud?: number | null
          nombre: string
          plan_id?: number | null
          portada_url?: string | null
          slug: string
          whatsapp?: string | null
        }
        Update: {
          catalogo_url?: string | null
          categoria_id?: number | null
          descripcion?: string | null
          destacado?: boolean | null
          direccion?: string | null
          estado?: string | null
          fecha_registro?: string | null
          id?: number
          instagram_url?: string | null
          latitud?: number | null
          logo_url?: string | null
          longitud?: number | null
          nombre?: string
          plan_id?: number | null
          portada_url?: string | null
          slug?: string
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "negocios_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "negocios_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "planes"
            referencedColumns: ["id"]
          },
        ]
      }
      planes: {
        Row: {
          id: number
          incluye_estadisticas: boolean | null
          incluye_posicion_destacada: boolean | null
          max_publicaciones: number | null
          nombre: string
          precio_mensual: number | null
        }
        Insert: {
          id?: number
          incluye_estadisticas?: boolean | null
          incluye_posicion_destacada?: boolean | null
          max_publicaciones?: number | null
          nombre: string
          precio_mensual?: number | null
        }
        Update: {
          id?: number
          incluye_estadisticas?: boolean | null
          incluye_posicion_destacada?: boolean | null
          max_publicaciones?: number | null
          nombre?: string
          precio_mensual?: number | null
        }
        Relationships: []
      }
      publicaciones: {
        Row: {
          activo: boolean | null
          descripcion: string | null
          id: number
          imagen_url: string
          negocio_id: number | null
          orden: number | null
          precio: number | null
          titulo: string
        }
        Insert: {
          activo?: boolean | null
          descripcion?: string | null
          id?: number
          imagen_url: string
          negocio_id?: number | null
          orden?: number | null
          precio?: number | null
          titulo: string
        }
        Update: {
          activo?: boolean | null
          descripcion?: string | null
          id?: number
          imagen_url?: string
          negocio_id?: number | null
          orden?: number | null
          precio?: number | null
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "publicaciones_negocio_id_fkey"
            columns: ["negocio_id"]
            isOneToOne: false
            referencedRelation: "negocios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
