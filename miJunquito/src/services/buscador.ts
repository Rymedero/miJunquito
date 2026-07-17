import { supabase } from "../lib/supabase";
import {
  buscarEnIndice,
  cargarDocumentosBusqueda,
  filtrarIndicePorCategoria,
  filtrarNegociosEnIndice,
  type FiltrosIndiceNegocios,
} from "../lib/orama";
import type { DocumentoBusqueda } from "../types/busqueda";

type NegocioPublico = {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string | null;
  direccion: string | null;
  portada_url: string | null;
  logo_url: string | null;
  destacado: boolean | null;
  categorias: { nombre: string; slug: string } | null;
};

type CategoriaPublica = {
  id: number;
  nombre: string;
  slug: string;
  icono: string | null;
  orden: number | null;
};

let inicializacion: Promise<DocumentoBusqueda[]> | null = null;
let documentos: DocumentoBusqueda[] = [];

function documentoDeNegocio(negocio: NegocioPublico): DocumentoBusqueda {
  return {
    id: `negocio-${negocio.id}`,
    tipo: "negocio",
    titulo: negocio.nombre,
    descripcion: negocio.descripcion ?? "",
    slug: negocio.slug,
    categoriaNombre: negocio.categorias?.nombre ?? "",
    categoriaSlug: negocio.categorias?.slug ?? "",
    ubicacion: negocio.direccion ?? "",
    imagenUrl: negocio.portada_url ?? negocio.logo_url ?? "",
    logoUrl: negocio.logo_url ?? "",
    destacado: negocio.destacado ?? false,
    orden: 0,
  };
}

function documentoDeCategoria(categoria: CategoriaPublica): DocumentoBusqueda {
  return {
    id: `categoria-${categoria.id}`,
    tipo: "categoria",
    titulo: categoria.nombre,
    descripcion: `Negocios de la categoría ${categoria.nombre}`,
    slug: categoria.slug,
    categoriaNombre: categoria.nombre,
    categoriaSlug: categoria.slug,
    ubicacion: "",
    imagenUrl: categoria.icono ?? "",
    logoUrl: "",
    destacado: categoria.orden !== null,
    orden: categoria.orden ?? Number.MAX_SAFE_INTEGER,
  };
}

export function inicializarBuscador(): Promise<DocumentoBusqueda[]> {
  if (inicializacion) return inicializacion;

  inicializacion = (async () => {
    const [negociosResponse, categoriasResponse] = await Promise.all([
      supabase
        .from("negocios")
        .select("id,nombre,slug,descripcion,direccion,portada_url,logo_url,destacado,categorias(nombre,slug)")
        .eq("estado", "activo"),
      supabase
        .from("categorias")
        .select("id,nombre,slug,icono,orden")
        .order("orden", { ascending: true })
        .order("nombre", { ascending: true }),
    ]);

    if (negociosResponse.error) throw negociosResponse.error;
    if (categoriasResponse.error) throw categoriasResponse.error;

    documentos = [
      ...(negociosResponse.data as NegocioPublico[]).map(documentoDeNegocio),
      ...(categoriasResponse.data as CategoriaPublica[]).map(documentoDeCategoria),
    ];
    await cargarDocumentosBusqueda(documentos);
    return documentos;
  })().catch((error: unknown) => {
    inicializacion = null;
    throw error;
  });

  return inicializacion;
}

export async function buscarNegociosYCategorias(termino: string, limite = 10) {
  await inicializarBuscador();
  return buscarEnIndice(termino, limite);
}

export async function obtenerCategoriasDestacadas(limite = 6) {
  await inicializarBuscador();
  return documentos
    .filter((documento) => documento.tipo === "categoria" && documento.destacado)
    .sort((a, b) => a.orden - b.orden || a.titulo.localeCompare(b.titulo, "es"))
    .slice(0, limite);
}

export async function buscarPorCategoria(categoriaSlug: string) {
  await inicializarBuscador();
  return filtrarIndicePorCategoria(categoriaSlug);
}

export async function buscarNegociosConFiltros(filtros: FiltrosIndiceNegocios) {
  await inicializarBuscador();
  return filtrarNegociosEnIndice(filtros);
}

export async function obtenerLogosNegocios(limite = 8) {
  await inicializarBuscador();
  return documentos
    .filter((documento) => documento.tipo === "negocio" && documento.logoUrl)
    .sort((a, b) => Number(b.destacado) - Number(a.destacado) || a.titulo.localeCompare(b.titulo, "es"))
    .slice(0, limite);
}
