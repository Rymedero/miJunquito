import { useRef } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import fallbackBusinessImage from "../../../assets/junquito-hero.jpg";
import { useNegocios } from "../../../hooks/useNegocios";
import type { Negocio } from "../../../types";

export default function Featuredbusinesses() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const { negocios, loading, error } = useNegocios();

  const moveCarousel = (direction: "left" | "right") => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    carousel.scrollBy({
      left: direction === "left" ? -250 : 250,
      behavior: "smooth",
    });
  };

  const getWhatsappUrl = (negocio: Negocio) => {
    const message = encodeURIComponent(
      `Hola, vi ${negocio.nombre} en la guía de El Junquito y quisiera más información.`,
    );
    const phone = negocio.whatsapp?.replace(/\D/g, "");

    return phone ? `https://wa.me/${phone}?text=${message}` : null;
  };

  return (
    <section className="w-full overflow-hidden bg-slate-50 py-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
              Recomendados
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-950 sm:text-3xl">
              Negocios
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Lugares y emprendimientos que debes conocer.
            </p>
          </div>

          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => moveCarousel("left")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-700 hover:text-emerald-700"
              aria-label="Ver negocios anteriores"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => moveCarousel("right")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-800 text-white transition hover:bg-emerald-900"
              aria-label="Ver negocios siguientes"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Carrusel */}
        {loading && (
          <p className="py-8 text-center text-sm text-slate-500">
            Cargando negocios…
          </p>
        )}

        {error && (
          <p role="alert" className="py-8 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && negocios.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-500">
            No hay negocios disponibles en este momento.
          </p>
        )}

        {!loading && !error && negocios.length > 0 && (
          <div
            ref={carouselRef}
            className="
              flex w-full snap-x snap-mandatory gap-3 overflow-x-auto
              scroll-smooth pb-3
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {negocios.map((negocio) => {
              const whatsappUrl = getWhatsappUrl(negocio);

              return (
                <article
                  key={negocio.id}
              className="
                group w-[72vw] max-w-[230px] shrink-0 snap-start
                overflow-hidden rounded-2xl border border-slate-200
                bg-white shadow-sm transition duration-300
                hover:-translate-y-1 hover:shadow-lg
                sm:w-[220px]
                md:w-[225px]
                lg:w-[230px]
              "
            >
              {/* Imagen compacta */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={negocio.portada_url ?? fallbackBusinessImage}
                  alt={negocio.nombre}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />

              </div>

              {/* Información compacta */}
              <div className="p-3.5">
                <h3 className="truncate text-sm font-extrabold text-slate-950">
                  {negocio.nombre}
                </h3>

                <div className="mt-1.5 flex min-w-0 items-center gap-1.5 text-[11px] text-slate-500">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-700" />

                  <span className="truncate">
                    {negocio.direccion ?? "El Junquito"}
                  </span>
                </div>

                <div className="mt-3 flex gap-2">
                  <a
                    href={`/negocios/${negocio.slug}`}
                    className="flex h-9 min-w-0 flex-1 items-center justify-center rounded-lg border border-slate-200 px-2 text-[11px] font-bold text-slate-700 transition hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    Ver perfil
                  </a>

                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#25D366] text-white transition hover:bg-[#1ebe5d]"
                      aria-label={`Contactar a ${negocio.nombre} por WhatsApp`}
                    >
                      <FaWhatsapp className="h-[18px] w-[18px]" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Navegación móvil */}
        <div className="mt-2 flex items-center justify-between sm:hidden">
          <p className="text-xs text-slate-400">
            Desliza para explorar
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => moveCarousel("left")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => moveCarousel("right")}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 text-white"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/negocios"
            className="inline-flex h-10 items-center justify-center rounded-full border border-emerald-800 px-5 text-xs font-bold text-emerald-800 transition hover:bg-emerald-800 hover:text-white"
          >
            Ver todos los negocios
          </a>
        </div>
      </div>
    </section>
  );
}
