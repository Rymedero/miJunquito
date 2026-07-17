import { useState } from "react";
import { ChevronDown, SlidersHorizontal, Search, X } from "lucide-react";

interface BusinessFiltersProps {
  categories: Array<{ nombre: string; slug: string }>;
  locations: string[];
  search: string;
  selectedCategories: string[];
  selectedLocations: string[];
  onSearchChange: (value: string) => void;
  onCategoriesChange: (values: string[]) => void;
  onLocationsChange: (values: string[]) => void;
  onReset: () => void;
}

export default function BusinessFilters({
  categories,
  locations,
  search,
  selectedCategories,
  selectedLocations,
  onSearchChange,
  onCategoriesChange,
  onLocationsChange,
  onReset,
}: BusinessFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: (values: string[]) => void,
  ) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  };

  const filterContent = (
    <>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-slate-950">Filtros</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-bold text-slate-500 underline underline-offset-4 transition hover:text-emerald-800"
        >
          Restablecer
        </button>
      </div>

      <label className="mt-7 flex h-12 items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/10">
        <Search className="h-5 w-5 shrink-0 text-slate-500" aria-hidden="true" />
        <span className="sr-only">Buscar por palabra</span>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por palabra..."
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />
      </label>

      <fieldset className="mt-8">
        <legend className="text-base font-extrabold text-slate-900">Categoría</legend>
        <div className="mt-4 space-y-3">
          {categories.length > 0 ? (
            categories.map((category) => (
              <label key={category.slug} className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.slug)}
                  onChange={() =>
                    toggleSelection(category.slug, selectedCategories, onCategoriesChange)
                  }
                  className="h-5 w-5 rounded border-slate-300 text-emerald-800 focus:ring-emerald-700"
                />
                <span>{category.nombre}</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-slate-400">No hay categorías disponibles.</p>
          )}
        </div>
      </fieldset>

      <fieldset className="mt-8 border-t border-slate-200 pt-7">
        <legend className="px-0 text-base font-extrabold text-slate-900">
          Ubicación
        </legend>
        <div className="mt-4 max-h-52 space-y-3 overflow-y-auto pr-2">
          {locations.length > 0 ? (
            locations.map((location) => (
              <label key={location} className="flex cursor-pointer items-start gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(location)}
                  onChange={() =>
                    toggleSelection(location, selectedLocations, onLocationsChange)
                  }
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 text-emerald-800 focus:ring-emerald-700"
                />
                <span>{location}</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-slate-400">No hay ubicaciones disponibles.</p>
          )}
        </div>
      </fieldset>
    </>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="mobile-business-filters"
        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 font-extrabold text-slate-900 shadow-sm lg:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-emerald-800" />
          Filtros
        </span>
        {isOpen ? <X className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>

      {isOpen && (
        <aside
          id="mobile-business-filters"
          className="mt-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:hidden"
        >
          {filterContent}
        </aside>
      )}

      <aside className="sticky top-24 hidden self-start rounded-3xl border border-slate-100 bg-white p-7 shadow-lg shadow-slate-900/5 lg:block">
        {filterContent}
      </aside>
    </>
  );
}
