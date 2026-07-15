import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Grid2X2,
  UtensilsCrossed,
  Trees,
  KeyRound,
  House,
  BriefcaseBusiness,
} from "lucide-react";

type CategoryItem = {
  id: string;
  name: string;
  icon: LucideIcon;
};

const categories: CategoryItem[] = [
  {
    id: "todo",
    name: "Ver todo",
    icon: Grid2X2,
  },
  {
    id: "comer-beber",
    name: "Comer y beber",
    icon: UtensilsCrossed,
  },
  {
    id: "turismo",
    name: "Paseos y turismo",
    icon: Trees,
  },
  {
    id: "alquileres",
    name: "Alquileres de fin de semana",
    icon: KeyRound,
  },
  {
    id: "propiedades",
    name: "Propiedades en venta",
    icon: House,
  },
  {
    id: "servicios",
    name: "Servicios locales",
    icon: BriefcaseBusiness,
  },
];

export default function Category() {
  const [activeCategory, setActiveCategory] = useState("todo");

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    console.log("Categoría seleccionada:", categoryId);
  };

  return (
    <section className="w-full overflow-hidden border-b border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div
          className="
            grid w-full min-w-0 grid-cols-1 gap-2.5
            sm:grid-cols-2
            md:grid-cols-3
            xl:flex xl:flex-wrap xl:justify-center
          "
          aria-label="Categorías principales"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryChange(category.id)}
                aria-pressed={isActive}
                className={`
                  flex min-w-0 items-center justify-center gap-2
                  rounded-full border px-3.5 py-2.5
                  text-xs font-semibold transition-all duration-200
                  sm:px-4 sm:text-sm
                  xl:w-auto xl:px-5
                  ${
                    isActive
                      ? "border-emerald-800 bg-emerald-800 text-white shadow-md shadow-emerald-900/10"
                      : "border-slate-200 bg-slate-50 text-slate-800 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white hover:shadow-md hover:shadow-emerald-900/10"
                  }
                `}
              >
                <Icon
                  className="h-4 w-4 shrink-0"
                  strokeWidth={isActive ? 2.5 : 2}
                  aria-hidden="true"
                />

                <span className="min-w-0 text-center leading-4">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
