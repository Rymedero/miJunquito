import { create, insertMultiple, search } from "@orama/orama";
import type { DocumentoBusqueda, ResultadoBusqueda } from "../types/busqueda";

const schema = {
  id: "string",
  tipo: "enum",
  titulo: "string",
  descripcion: "string",
  slug: "string",
  categoriaNombre: "string",
  categoriaSlug: "string",
  ubicacion: "string",
  imagenUrl: "string",
  logoUrl: "string",
  destacado: "boolean",
  orden: "number",
} as const;

const indice = create({ schema, language: "spanish" });
let documentosInsertados = false;

export async function cargarDocumentosBusqueda(documentos: DocumentoBusqueda[]) {
  if (documentosInsertados) return;
  if (documentos.length > 0) await insertMultiple(indice, documentos);
  documentosInsertados = true;
}

export async function buscarEnIndice(
  termino: string,
  limite = 10,
): Promise<ResultadoBusqueda[]> {
  const resultado = await search(indice, {
    term: termino.trim(),
    properties: ["titulo", "descripcion", "categoriaNombre", "ubicacion"],
    boost: { titulo: 3, categoriaNombre: 2, descripcion: 1, ubicacion: 1 },
    limit: limite,
  });

  return resultado.hits.map((hit) => ({
    documento: hit.document as DocumentoBusqueda,
    puntuacion: hit.score,
  }));
}

export async function filtrarIndicePorCategoria(categoriaSlug: string) {
  const resultado = await search(indice, {
    term: "",
    where: { tipo: { eq: "negocio" }, categoriaSlug },
    limit: 100,
  });

  return resultado.hits.map((hit) => hit.document as DocumentoBusqueda);
}

export interface FiltrosIndiceNegocios {
  termino?: string;
  categorias?: string[];
  ubicaciones?: string[];
}

export async function filtrarNegociosEnIndice({
  termino = "",
  categorias = [],
  ubicaciones = [],
}: FiltrosIndiceNegocios) {
  const consulta = termino.trim().length >= 2 ? termino.trim() : "";
  const resultado = await search(indice, {
    term: consulta,
    properties: ["titulo", "descripcion", "categoriaNombre", "ubicacion"],
    boost: { titulo: 3, categoriaNombre: 2, descripcion: 1, ubicacion: 1 },
    where: { tipo: { eq: "negocio" } },
    limit: 500,
  });

  return resultado.hits
    .map((hit) => hit.document as DocumentoBusqueda)
    .filter((documento) =>
      (categorias.length === 0 || categorias.includes(documento.categoriaSlug)) &&
      (ubicaciones.length === 0 || ubicaciones.includes(documento.ubicacion)),
    );
}
