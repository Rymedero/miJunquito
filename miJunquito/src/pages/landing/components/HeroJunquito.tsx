import { useState } from "react";
import type { SubmitEvent } from "react";
import heroBg from "../../../assets/junquito-hero.jpg";


export default function HeroJunquito() {
  const [search, setSearch] = useState("");

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      search,
    });

    // Aquí luego puedes navegar o filtrar resultados
    // por ejemplo con react-router
  };

  return (
    <section className="relative overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Paisaje de El Junquito"
          className="h-full w-full object-cover"
        />

        {/* Overlay principal */}
        <div className="absolute inset-0 bg-slate-950/55" />

        {/* Gradientes decorativos */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/45 via-transparent to-emerald-700/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative mx-auto flex min-h-[72vh] max-w-7xl items-center px-4 pb-24 pt-16 sm:min-h-[76vh] sm:px-6 lg:px-8">
        <div className="w-full">
          <div className="mx-auto max-w-4xl text-center">
            {/* Título */}
            <h1 className="hero-title mt-6 flex flex-wrap justify-center gap-x-3 text-4xl font-semibold leading-[1.05] text-white drop-shadow-md sm:gap-x-4 sm:text-5xl md:text-6xl lg:text-7xl">
              <span>Descubre</span>
              <span className="italic text-emerald-300">El Junquito</span>
            </h1>

            {/* Texto */}
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/85 sm:text-lg md:text-xl">
              Descubre restaurantes, posadas, cabañas, terrenos, fresas,
              atracciones y servicios locales en uno de los destinos más
              encantadores de la montaña.
            </p>

            {/* Search box */}
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-10 max-w-4xl rounded-3xl border border-white/40 bg-white/95 p-2 shadow-xl shadow-slate-950/15 backdrop-blur-md sm:rounded-full"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                {/* Input */}
                <div className="flex-1">
                  <label htmlFor="search" className="sr-only">
                    Buscar
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        aria-hidden="true"
                      >
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                      </svg>
                    </span>

                    <input
                      id="search"
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="¿Qué quieres encontrar en El Junquito?"
                      className="h-14 w-full rounded-2xl border-0 bg-transparent pl-16 pr-4 text-[15px] text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0 sm:rounded-full sm:text-base"
                    />
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-2 border-t border-slate-100 pt-2 sm:border-l sm:border-t-0 sm:pl-2 sm:pt-0">
                  <button
                    type="button"
                    className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-emerald-700 sm:flex-none sm:rounded-full"
                  >
                    <svg
                      className="h-5 w-5 text-emerald-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    <span className="whitespace-nowrap">Cerca de mí</span>
                  </button>

                  <button
                    type="submit"
                    className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-md shadow-emerald-700/15 transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:flex-none sm:rounded-full"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-3.5-3.5" />
                    </svg>
                    Buscar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
