import type { DocumentoBusqueda } from "../../types/busqueda";
import SearchResultItem from "./SearchResultItem";

interface FeaturedCategoriesProps {
  categorias: DocumentoBusqueda[];
  indiceActivo: number;
  onSelect: (categoria: DocumentoBusqueda) => void;
}

export default function FeaturedCategories({
  categorias,
  indiceActivo,
  onSelect,
}: FeaturedCategoriesProps) {
  if (categorias.length === 0) return null;

  return (
    <div>
      <p className="px-3 pb-2 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-400">
        Categorías destacadas
      </p>
      <div role="listbox" aria-label="Categorías destacadas">
        {categorias.map((categoria, index) => (
          <SearchResultItem
            key={categoria.id}
            documento={categoria}
            activo={index === indiceActivo}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
