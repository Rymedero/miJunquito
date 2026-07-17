import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBusinessSearch } from "../../hooks/useBusinessSearch";
import type { DocumentoBusqueda } from "../../types/busqueda";
import SearchDropdown from "./SearchDropdown";

interface BusinessSearchProps {
  onNavigate?: () => void;
}

export default function BusinessSearch({ onNavigate }: BusinessSearchProps) {
  const navigate = useNavigate();
  const contenedorRef = useRef<HTMLDivElement>(null);
  const [indiceActivo, setIndiceActivo] = useState(-1);
  const searchState = useBusinessSearch();
  const {
    termino, setTermino, resultados, categoriasDestacadas, abierto,
    loading, error, abrirBuscador, cerrarBuscador,
  } = searchState;
  const elementos = useMemo(
    () => termino.trim().length >= 2
      ? resultados.map((resultado) => resultado.documento)
      : categoriasDestacadas,
    [categoriasDestacadas, resultados, termino],
  );

  useEffect(() => {
    const cerrarAlHacerClickFuera = (event: MouseEvent) => {
      if (!contenedorRef.current?.contains(event.target as Node)) cerrarBuscador();
    };
    document.addEventListener("mousedown", cerrarAlHacerClickFuera);
    return () => document.removeEventListener("mousedown", cerrarAlHacerClickFuera);
  }, [cerrarBuscador]);

  const seleccionar = (documento: DocumentoBusqueda) => {
    cerrarBuscador();
    onNavigate?.();
    navigate(documento.tipo === "negocio"
      ? `/negocios/${documento.slug}`
      : `/negocios?categoria=${encodeURIComponent(documento.categoriaSlug)}`);
  };

  const enviarBusqueda = () => {
    const consulta = termino.trim();
    if (consulta.length < 2) return;
    cerrarBuscador();
    onNavigate?.();
    navigate(`/buscar?q=${encodeURIComponent(consulta)}`);
  };

  return (
    <div ref={contenedorRef} className="relative w-full">
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          if (indiceActivo >= 0 && elementos[indiceActivo]) seleccionar(elementos[indiceActivo]);
          else enviarBusqueda();
        }}
      >
        <label htmlFor="navbar-business-search" className="sr-only">Buscar negocios y categorías</label>
        <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-emerald-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-600/10">
          <Search className="h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
          <input
            id="navbar-business-search"
            type="search"
            role="combobox"
            aria-expanded={abierto}
            aria-controls="business-search-dropdown"
            aria-autocomplete="list"
            value={termino}
            onFocus={() => { setIndiceActivo(-1); abrirBuscador(); }}
            onChange={(event) => { setIndiceActivo(-1); setTermino(event.target.value); abrirBuscador(); }}
            onKeyDown={(event) => {
              if (event.key === "Escape") cerrarBuscador();
              if (event.key === "ArrowDown") {
                event.preventDefault();
                abrirBuscador();
                setIndiceActivo((actual) => Math.min(actual + 1, elementos.length - 1));
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                setIndiceActivo((actual) => Math.max(actual - 1, 0));
              }
            }}
            placeholder="Buscar en El Junquito"
            className="min-w-0 flex-1 bg-transparent px-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
          {termino && (
            <button type="button" onClick={() => { setIndiceActivo(-1); setTermino(""); }} className="rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700" aria-label="Limpiar búsqueda">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
      {abierto && (
        <div id="business-search-dropdown">
          <SearchDropdown termino={termino} resultados={resultados} categorias={categoriasDestacadas} loading={loading} error={error} indiceActivo={indiceActivo} onSelect={seleccionar} />
        </div>
      )}
    </div>
  );
}
