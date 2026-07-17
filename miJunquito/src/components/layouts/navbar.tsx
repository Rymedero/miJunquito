import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logoMiJunquito from "../../assets/logomijunquito.png";
import BusinessSearch from "../search/BusinessSearch";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Negocios", href: "/negocios" },
  { name: "Servicios", href: "/servicios" },
  { name: "Inmuebles", href: "/inmuebles" },
  { name: "Eventos", href: "/eventos" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-lg">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
        <div className="flex h-20 items-center gap-4">
          <Link to="/" className="flex shrink-0 items-center" aria-label="Ir al inicio">
            <img src={logoMiJunquito} alt="Mi Junquito" className="h-14 w-auto object-contain sm:h-16" />
          </Link>

          <div className="hidden min-w-0 max-w-sm flex-1 md:block lg:max-w-xs xl:max-w-sm">
            <BusinessSearch />
          </div>

          <div className="ml-auto hidden items-center gap-0.5 lg:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => `rounded-xl px-2.5 py-2.5 text-sm font-medium transition-colors xl:px-3 ${
                  isActive ? "bg-emerald-50 text-emerald-800" : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                {item.name}
              </NavLink>
            ))}
            <Link to="/login" className="ml-1 rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700 xl:px-4">
              Iniciar sesión
            </Link>
            <Link to="/registrar-negocio" className="ml-1 hidden rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 xl:inline-flex">
              Publicar negocio
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((previousValue) => !previousValue)}
            className="ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 lg:hidden"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18 18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        <div className="pb-3 md:hidden">
          <BusinessSearch onNavigate={() => setIsOpen(false)} />
        </div>
      </nav>

      <div className={`overflow-hidden border-t bg-white transition-all duration-300 lg:hidden ${isOpen ? "max-h-[32rem] border-slate-200 opacity-100" : "max-h-0 border-transparent opacity-0"}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
          {navigation.map((item) => (
            <NavLink key={item.name} to={item.href} onClick={() => setIsOpen(false)} className="rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700">
              {item.name}
            </NavLink>
          ))}
          <div className="mt-3 grid gap-2 border-t border-slate-200 pt-4 sm:grid-cols-2">
            <Link to="/login" onClick={() => setIsOpen(false)} className="rounded-xl border border-slate-300 px-5 py-3 text-center font-semibold text-slate-700">Iniciar sesión</Link>
            <Link to="/registrar-negocio" onClick={() => setIsOpen(false)} className="rounded-xl bg-emerald-600 px-5 py-3 text-center font-semibold text-white">Publicar negocio</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
