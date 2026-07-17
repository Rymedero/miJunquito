import { MapPinned, Navigation } from "lucide-react";

interface HowToGetThereProps {
  address: string | null;
  latitude: number | null;
  longitude: number | null;
}

export default function HowToGetThere({
  address,
  latitude,
  longitude,
}: HowToGetThereProps) {
  const mapsUrl =
    latitude !== null && longitude !== null
      ? `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
      : address
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
        : null;

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-900/5 sm:p-8">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
        <MapPinned className="h-7 w-7 text-emerald-800" aria-hidden="true" />
        <h2 className="text-xl font-black text-emerald-900 sm:text-2xl">
          Cómo llegar
        </h2>
      </div>

      {address ? (
        <p className="mt-6 leading-7 text-slate-600">{address}</p>
      ) : (
        <p className="mt-6 text-sm text-slate-500">
          La dirección todavía no está disponible.
        </p>
      )}

      {mapsUrl && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-emerald-800 px-4 py-2.5 text-sm font-extrabold text-emerald-800 transition hover:bg-emerald-800 hover:text-white"
        >
          <Navigation className="h-4 w-4" aria-hidden="true" />
          Abrir en Google Maps
        </a>
      )}
    </section>
  );
}
