import { ExternalLink, MapPin } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import type { Negocio, NegocioProfile } from "../../../types";

interface ProfileDetailsProps {
  negocio: NegocioProfile;
}

function getWhatsappUrl(negocio: Negocio) {
  const phone = negocio.whatsapp?.replace(/\D/g, "");

  if (!phone) return null;

  const message = encodeURIComponent(
    `Hola, vi ${negocio.nombre} en la guía de El Junquito y quisiera más información.`,
  );

  return `https://wa.me/${phone}?text=${message}`;
}

function getExternalUrl(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export default function ProfileDetails({ negocio }: ProfileDetailsProps) {
  const whatsappUrl = getWhatsappUrl(negocio);
  const instagramUrl = negocio.instagram_url
    ? getExternalUrl(negocio.instagram_url)
    : null;

  return (
    <section className="flex h-full flex-col justify-center py-2 lg:py-8">
      {(negocio.categorias || negocio.logo_url) && (
        <div className="flex items-center gap-3">
          {negocio.categorias && (
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
              {negocio.categorias.nombre}
            </span>
          )}

          {negocio.logo_url && (
            <img
              src={negocio.logo_url}
              alt={`Logo de ${negocio.nombre}`}
              className="h-12 w-12 rounded-xl border border-slate-200 bg-white object-contain p-1 shadow-sm sm:h-14 sm:w-14"
            />
          )}
        </div>
      )}

      <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
        {negocio.nombre}
      </h1>

      {negocio.direccion && (
        <div className="mt-5 flex items-start gap-2 text-sm font-medium text-slate-600 sm:text-base">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
          <span>{negocio.direccion}</span>
        </div>
      )}

      <p className="mt-7 text-base leading-8 text-slate-600 sm:text-lg">
        {negocio.descripcion ??
          "Conoce este negocio local y descubre lo que tiene para ofrecerte en El Junquito."}
      </p>

      {(whatsappUrl || instagramUrl) && (
        <div className="mt-8 flex flex-col gap-3 sm:max-w-md">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 text-base font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#1ebe5d] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
            >
              <FaWhatsapp className="h-6 w-6" aria-hidden="true" />
              Contactar por WhatsApp
            </a>
          )}

          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 via-pink-600 to-purple-700 px-6 text-base font-extrabold text-white transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              <FaInstagram className="h-6 w-6" aria-hidden="true" />
              Seguir en Instagram
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </section>
  );
}
