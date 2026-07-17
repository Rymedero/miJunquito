import type { DocumentoBusqueda, ResultadoBusqueda } from "../../types/busqueda";
import FeaturedCategories from "./FeaturedCategories";
import SearchResultItem from "./SearchResultItem";

interface SearchDropdownProps {
  termino: string;
  resultados: ResultadoBusqueda[];
  categorias: DocumentoBusqueda[];
  loading: boolean;
  error: string | null;
  indiceActivo: number;
  onSelect: (documento: DocumentoBusqueda) => void;
}

export default function SearchDropdown({
  termino,
  resultados,
  categorias,
  loading,
  error,
  indiceActivo,
  onSelect,
}: SearchDropdownProps) {
  const buscando = termino.trim().length >= 2;

  return (
    <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 max-h-[26rem] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/15">
      {loading && <p className="px-4 py-6 text-center text-sm text-slate-500">Preparando resultados…</p>}
      {!loading && error && <p role="alert" className="px-4 py-6 text-center text-sm text-red-600">{error}</p>}
      {!loading && !error && !buscando && (
        <FeaturedCategories categorias={categorias} indiceActivo={indiceActivo} onSelect={onSelect} />
      )}
      {!loading && !error && buscando && resultados.length === 0 && (
        <p className="px-4 py-7 text-center text-sm text-slate-500">No encontramos coincidencias para “{termino.trim()}”.</p>
      )}
      {!loading && !error && buscando && resultados.length > 0 && (
        <div role="listbox" aria-label="Resultados de búsqueda">
          {resultados.map(({ documento }, index) => (
            <SearchResultItem key={documento.id} documento={documento} activo={index === indiceActivo} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}
