import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNegocios } from "../../hooks/useNegocios";
import { useCategorias } from "../../hooks/useCategorias";
import BusinessFilters from "./components/BusinessFilters";
import BusinessResultCard from "./components/BusinessResultCard";
import ResultsHeader from "./components/ResultsHeader";
import { buscarNegociosConFiltros } from "../../services/buscador";
import type { DocumentoBusqueda } from "../../types/busqueda";

function Allbusinesses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { negocios, loading, error } = useNegocios();
  const { categorias } = useCategorias();
  const search = searchParams.get("q") ?? "";
  const categoriesKey = searchParams.getAll("categoria").join("\u0000");
  const locationsKey = searchParams.getAll("ubicacion").join("\u0000");
  const selectedCategories = categoriesKey ? categoriesKey.split("\u0000") : [];
  const selectedLocations = locationsKey ? locationsKey.split("\u0000") : [];
  const firmaFiltros = JSON.stringify({ search: search.trim(), categoriesKey, locationsKey });
  const [respuestaFiltros, setRespuestaFiltros] = useState<{
    firma: string;
    documentos: DocumentoBusqueda[];
    error: string | null;
  }>({ firma: "", documentos: [], error: null });

  useEffect(() => {
    let vigente = true;
    buscarNegociosConFiltros({
      termino: search,
      categorias: categoriesKey ? categoriesKey.split("\u0000") : [],
      ubicaciones: locationsKey ? locationsKey.split("\u0000") : [],
    })
      .then((documentos) => {
        if (vigente) setRespuestaFiltros({ firma: firmaFiltros, documentos, error: null });
      })
      .catch(() => {
        if (vigente) setRespuestaFiltros({ firma: firmaFiltros, documentos: [], error: "No se pudieron aplicar los filtros." });
      });
    return () => { vigente = false; };
  }, [categoriesKey, firmaFiltros, locationsKey, search]);

  const idsFiltrados = useMemo(
    () => new Set(respuestaFiltros.documentos.map((documento) => Number(documento.id.replace("negocio-", "")))),
    [respuestaFiltros.documentos],
  );

  const negociosVisibles = useMemo(
    () => negocios.filter((negocio) => idsFiltrados.has(negocio.id)),
    [idsFiltrados, negocios],
  );

  const categoriaActiva = selectedCategories.length === 1
    ? categorias.find((categoria) => categoria.slug === selectedCategories[0]) ?? null
    : null;

  const categories = useMemo(
    () =>
      categorias.map((categoria) => ({ nombre: categoria.nombre, slug: categoria.slug })),
    [categorias],
  );

  const locations = useMemo(
    () =>
      [...new Set(negocios.map((negocio) => negocio.direccion).filter(Boolean))]
        .filter((location): location is string => Boolean(location))
        .sort((a, b) => a.localeCompare(b, "es")),
    [negocios],
  );

  const actualizarParametros = (clave: "q" | "categoria" | "ubicacion", valores: string[]) => {
    const siguientes = new URLSearchParams(searchParams);
    siguientes.delete(clave);
    valores.filter(Boolean).forEach((valor) => siguientes.append(clave, valor));
    setSearchParams(siguientes, { replace: true });
  };

  const filtrosLoading = respuestaFiltros.firma !== firmaFiltros;
  const filtrosError = respuestaFiltros.firma === firmaFiltros ? respuestaFiltros.error : null;

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
            Guía local
          </span>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            {categoriaActiva ? categoriaActiva.nombre : "Explora los negocios de El Junquito"}
          </h1>
          {categoriaActiva && (
            <Link to="/negocios" className="mt-3 inline-flex text-sm font-bold text-emerald-700 underline underline-offset-4">
              Ver todas las categorías
            </Link>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[310px_minmax(0,1fr)]">
          <BusinessFilters
            categories={categories}
            locations={locations}
            search={search}
            selectedCategories={selectedCategories}
            selectedLocations={selectedLocations}
            onSearchChange={(value) => actualizarParametros("q", value ? [value] : [])}
            onCategoriesChange={(values) => actualizarParametros("categoria", values)}
            onLocationsChange={(values) => actualizarParametros("ubicacion", values)}
            onReset={() => setSearchParams({}, { replace: true })}
          />

          <section className="min-w-0">
            <ResultsHeader count={negociosVisibles.length} />

            {(loading || filtrosLoading) && (
              <div className="mt-6 grid gap-6 md:grid-cols-2" aria-label="Cargando negocios">
                {[0, 1, 2, 3].map((item) => (
                  <div key={item} className="animate-pulse overflow-hidden rounded-3xl bg-white shadow-sm">
                    <div className="h-56 bg-slate-200 sm:h-64" />
                    <div className="space-y-4 p-6">
                      <div className="h-4 w-2/3 rounded bg-slate-200" />
                      <div className="h-8 w-4/5 rounded bg-slate-200" />
                      <div className="h-20 rounded bg-slate-200" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && !filtrosLoading && (error || filtrosError) && (
              <p role="alert" className="mt-6 rounded-2xl border border-red-200 bg-white p-8 text-center text-red-600">
                {error || filtrosError}
              </p>
            )}

            {!loading && !filtrosLoading && !error && !filtrosError && negociosVisibles.length === 0 && (
              <p className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
                No hay negocios disponibles en este momento.
              </p>
            )}

            {!loading && !filtrosLoading && !error && !filtrosError && negociosVisibles.length > 0 && (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {negociosVisibles.map((negocio) => (
                  <BusinessResultCard key={negocio.id} negocio={negocio} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Allbusinesses;
