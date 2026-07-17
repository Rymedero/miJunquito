import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchResultItem from "../components/search/SearchResultItem";
import { buscarNegociosYCategorias } from "../services/buscador";
import type { DocumentoBusqueda, ResultadoBusqueda } from "../types/busqueda";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const terminoUrl = searchParams.get("q")?.trim() ?? "";
  const [respuesta, setRespuesta] = useState<{ termino: string; resultados: ResultadoBusqueda[]; error: string | null }>({ termino: "", resultados: [], error: null });

  useEffect(() => {
    if (terminoUrl.length < 2) {
      return;
    }
    let vigente = true;
    buscarNegociosYCategorias(terminoUrl, 50)
      .then((data) => { if (vigente) setRespuesta({ termino: terminoUrl, resultados: data, error: null }); })
      .catch(() => { if (vigente) setRespuesta({ termino: terminoUrl, resultados: [], error: "No se pudieron cargar los resultados." }); });
    return () => { vigente = false; };
  }, [terminoUrl]);

  const loading = terminoUrl.length >= 2 && respuesta.termino !== terminoUrl;
  const resultados = respuesta.termino === terminoUrl ? respuesta.resultados : [];
  const error = respuesta.termino === terminoUrl ? respuesta.error : null;

  const seleccionar = (documento: DocumentoBusqueda) => {
    navigate(documento.tipo === "negocio"
      ? `/negocios/${documento.slug}`
      : `/negocios?categoria=${encodeURIComponent(documento.categoriaSlug)}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">Búsqueda local</span>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Resultados de búsqueda</h1>
        <SearchForm key={terminoUrl} initialValue={terminoUrl} onSearch={(value) => setSearchParams({ q: value })} />

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
          {terminoUrl.length < 2 && <p className="py-10 text-center text-slate-500">Escribe al menos dos caracteres para buscar.</p>}
          {loading && <p className="py-10 text-center text-slate-500">Buscando en El Junquito…</p>}
          {!loading && error && <p role="alert" className="py-10 text-center text-red-600">{error}</p>}
          {!loading && !error && terminoUrl.length >= 2 && resultados.length === 0 && <p className="py-10 text-center text-slate-500">No encontramos resultados para “{terminoUrl}”.</p>}
          {!loading && !error && resultados.length > 0 && (
            <>
              <p className="px-3 pb-3 text-sm font-semibold text-slate-500">{resultados.length} {resultados.length === 1 ? "resultado" : "resultados"} para “{terminoUrl}”</p>
              <div className="grid gap-1 sm:grid-cols-2">
                {resultados.map(({ documento }) => <SearchResultItem key={documento.id} documento={documento} onSelect={seleccionar} />)}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function SearchForm({ initialValue, onSearch }: { initialValue: string; onSearch: (value: string) => void }) {
  const [value, setValue] = useState(initialValue);
  return (
    <form className="mt-6 flex gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm" onSubmit={(event) => { event.preventDefault(); const query = value.trim(); if (query.length >= 2) onSearch(query); }}>
      <label htmlFor="full-search" className="sr-only">Buscar</label>
      <Search className="ml-3 h-5 w-5 self-center text-emerald-700" />
      <input id="full-search" type="search" value={value} onChange={(event) => setValue(event.target.value)} placeholder="Negocios, categorías o ubicaciones" className="min-w-0 flex-1 px-2 text-slate-800 outline-none" />
      <button type="submit" disabled={value.trim().length < 2} className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50">Buscar</button>
    </form>
  );
}
