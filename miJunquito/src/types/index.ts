
import type { Database } from './database'

export type Negocio = Database['public']['Tables']['negocios']['Row']
export type NegocioInsert = Database['public']['Tables']['negocios']['Insert']
export type Categoria = Database['public']['Tables']['categorias']['Row']
export type Plan = Database['public']['Tables']['planes']['Row']
export type Publicacion = Database['public']['Tables']['publicaciones']['Row']
export type Horario = Database['public']['Tables']['horarios']['Row']
export type Comentario = Database['public']['Tables']['comentarios']['Row']

export type NegocioListItem = Negocio & {
  categorias: Pick<Categoria, 'nombre' | 'slug'> | null
}

export type NegocioProfile = Negocio & {
  categorias: Pick<Categoria, 'nombre'> | null
  publicaciones: Publicacion[]
  horarios: Horario[]
}
