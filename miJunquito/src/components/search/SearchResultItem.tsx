import { Building2, FolderSearch, MapPin } from "lucide-react";
import type { DocumentoBusqueda } from "../../types/busqueda";

interface SearchResultItemProps {
  documento: DocumentoBusqueda;
  activo?: boolean;
  onSelect: (documento: DocumentoBusqueda) => void;
}

export default function SearchResultItem({
  documento,
  activo = false,
  onSelect,
}: SearchResultItemProps) {
  const esNegocio = documento.tipo === "negocio";
  const Icon = esNegocio ? Building2 : FolderSearch;

  return (
    <button
      type="button"
      role="option"
      aria-selected={activo}
      onClick={() => onSelect(documento)}
      className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition ${
        activo ? "bg-emerald-50" : "hover:bg-slate-50"
      }`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-extrabold text-slate-900">
          {documento.titulo}
        </span>
        <span className="mt-0.5 flex items-center gap-1 truncate text-xs text-slate-500">
          {esNegocio && documento.ubicacion && <MapPin className="h-3.5 w-3.5 shrink-0" />}
          {esNegocio
            ? documento.ubicacion || documento.categoriaNombre || "Negocio local"
            : "Ver negocios de esta categoría"}
        </span>
      </span>
      <span className="mt-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
        {esNegocio ? "Negocio" : "Categoría"}
      </span>
    </button>
  );
}
