import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import fallbackBusinessImage from "../../../assets/junquito-hero.jpg";
import type { NegocioListItem } from "../../../types";

interface BusinessResultCardProps {
  negocio: NegocioListItem;
}

function getWhatsappUrl(negocio: NegocioListItem) {
  const phone = negocio.whatsapp?.replace(/\D/g, "");
  if (!phone) return null;

  const message = encodeURIComponent(
    `Hola, vi ${negocio.nombre} en la guía de El Junquito y quisiera más información.`,
  );

  return `https://wa.me/${phone}?text=${message}`;
}

export default function BusinessResultCard({ negocio }: BusinessResultCardProps) {
  const whatsappUrl = getWhatsappUrl(negocio);

  return (
    <article className="group flex min-h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden sm:h-64">
        <img
          src={negocio.portada_url ?? fallbackBusinessImage}
          alt={negocio.nombre}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />
        {negocio.categorias && (
          <span className="absolute left-5 top-5 rounded-full bg-emerald-800 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm">
            {negocio.categorias.nombre}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {negocio.direccion && (
          <div className="flex items-start gap-2 text-sm font-medium text-slate-500">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
            <span className="line-clamp-1">{negocio.direccion}</span>
          </div>
        )}

        <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950">
          {negocio.nombre}
        </h2>

        <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
          {negocio.descripcion ??
            "Conoce este negocio local y descubre lo que ofrece en El Junquito."}
        </p>

        <div className="mt-auto flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">
          <Link
            to={`/negocios/${negocio.slug}`}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-emerald-800 px-4 text-sm font-extrabold text-emerald-800 transition hover:bg-emerald-800 hover:text-white"
          >
            Ver perfil
          </Link>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-extrabold text-white transition hover:bg-[#1ebe5d]"
            >
              <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
              Contactar
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
