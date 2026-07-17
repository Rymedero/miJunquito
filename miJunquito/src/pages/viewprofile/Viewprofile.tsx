import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useNegocioProfile } from "../../hooks/useNegocioProfile";
import ProfileCover from "./components/ProfileCover";
import ProfileDetails from "./components/ProfileDetails";
import FeaturedProducts from "./components/FeaturedProducts";
import BusinessHours from "./components/BusinessHours";
import HowToGetThere from "./components/HowToGetThere";

function Viewprofile() {
  const { slug } = useParams<{ slug: string }>();
  const { negocio, loading, error } = useNegocioProfile(slug);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-800 transition hover:-translate-x-1 hover:text-emerald-950 sm:text-base"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          Volver a la guía
        </Link>

        {loading && (
          <div
            className="grid animate-pulse gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)] lg:gap-12"
            aria-label="Cargando perfil del negocio"
          >
            <div className="h-[240px] rounded-3xl bg-slate-200 sm:h-[340px] lg:h-[440px]" />
            <div className="space-y-5 py-8">
              <div className="h-4 w-28 rounded bg-slate-200" />
              <div className="h-14 w-4/5 rounded bg-slate-200" />
              <div className="h-5 w-2/3 rounded bg-slate-200" />
              <div className="h-32 rounded bg-slate-200" />
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-white px-6 py-16 text-center shadow-sm">
            <h1 className="text-2xl font-black text-slate-950">
              No pudimos cargar este perfil
            </h1>
            <p role="alert" className="mt-3 text-slate-600">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && !negocio && (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <h1 className="text-2xl font-black text-slate-950">
              Negocio no encontrado
            </h1>
            <p className="mt-3 text-slate-600">
              Este perfil no existe o ya no se encuentra disponible.
            </p>
          </div>
        )}

        {!loading && !error && negocio && (
          <>
            <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)] lg:gap-12">
              <ProfileCover
                imageUrl={negocio.portada_url}
                businessName={negocio.nombre}
              />
              <ProfileDetails negocio={negocio} />
            </div>

            <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
              <FeaturedProducts products={negocio.publicaciones} />
              <div className="grid gap-6">
                <BusinessHours hours={negocio.horarios} />
                <HowToGetThere
                  address={negocio.direccion}
                  latitude={negocio.latitud}
                  longitude={negocio.longitud}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Viewprofile;
