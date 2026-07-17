export type TipoDocumentoBusqueda = "negocio" | "categoria";

export interface DocumentoBusqueda {
  id: string;
  tipo: TipoDocumentoBusqueda;
  titulo: string;
  descripcion: string;
  slug: string;
  categoriaNombre: string;
  categoriaSlug: string;
  ubicacion: string;
  imagenUrl: string;
  logoUrl: string;
  destacado: boolean;
  orden: number;
}

export interface ResultadoBusqueda {
  documento: DocumentoBusqueda;
  puntuacion: number;
}
