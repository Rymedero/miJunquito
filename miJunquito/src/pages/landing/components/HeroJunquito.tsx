import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroBg from "../../../assets/junquito-hero.jpg";
import logoMiJunquito from "../../../assets/logomijunquito.png";
import { obtenerLogosNegocios } from "../../../services/buscador";
import type { DocumentoBusqueda } from "../../../types/busqueda";

export default function HeroJunquito() {
  const logos = Array.from({ length: 6 });
  const [negociosConLogo, setNegociosConLogo] = useState<DocumentoBusqueda[]>([]);

  useEffect(() => {
    let vigente = true;
    obtenerLogosNegocios().then((negocios) => {
      if (vigente) setNegociosConLogo(negocios);
    }).catch(() => {
      if (vigente) setNegociosConLogo([]);
    });
    return () => { vigente = false; };
  }, []);

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
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 border-b border-white/15 bg-slate-950/25 py-2 backdrop-blur-md">
        <p className="sr-only">Mi Junquito, guía local</p>
        <div className="hero-logo-marquee overflow-hidden" aria-hidden="true">
          <div className="hero-logo-track flex w-max items-center">
            {[0, 1].map((group) => (
              <div key={group} className="flex shrink-0 items-center gap-14 px-7 sm:gap-20 sm:px-10">
                {logos.map((_, index) => (
                  <img key={index} src={logoMiJunquito} alt="" className="h-8 w-24 shrink-0 object-contain brightness-0 invert opacity-70 sm:h-9 sm:w-28" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {negociosConLogo.length > 0 && (
        <div className="absolute inset-x-0 bottom-3 py-2">
          <p className="sr-only">Negocios locales</p>
          <div className="hero-logo-marquee overflow-hidden">
            <div className="hero-business-logo-track flex w-max items-center" aria-label="Negocios locales">
              {[0, 1].map((group) => (
                <div key={group} className="flex shrink-0 items-center gap-5 px-2.5 sm:gap-7 sm:px-3.5" aria-hidden={group === 1}>
                  {negociosConLogo.map((negocio) => (
                    <Link key={negocio.id} to={`/negocios/${negocio.slug}`} className="group flex h-14 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/80 bg-white p-1.5 shadow-lg shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:h-16 sm:w-28 sm:p-2" tabIndex={group === 1 ? -1 : undefined}>
                      <img src={negocio.logoUrl} alt={group === 0 ? negocio.titulo : ""} className="h-full w-full object-contain opacity-100" />
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
