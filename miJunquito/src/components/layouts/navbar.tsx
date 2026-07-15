import { useState } from "react";
import logoMiJunquito from "../../assets/logomijunquito.png";

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
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-lg">
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navegación principal"
      >
        {/* Logo a la izquierda */}
        <a
          href="/"
          className="flex items-center"
          aria-label="Ir al inicio"
        >
          <img
            src={logoMiJunquito}
            alt="Mi Junquito"
            className="h-14 w-auto object-contain sm:h-16"
          />
        </a>

        {/* Navegación de escritorio a la derecha */}
        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            >
              {item.name}
            </a>
          ))}

          <a
            href="/login"
            className="ml-2 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700"
          >
            Iniciar sesión
          </a>

          <a
            href="/registrar-negocio"
            className="ml-1 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Publicar negocio
          </a>
        </div>

        {/* Botón del menú móvil a la derecha */}
        <button
          type="button"
          onClick={() => setIsOpen((previousValue) => !previousValue)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Menú móvil */}
      <div
        className={`overflow-hidden border-t bg-white transition-all duration-300 lg:hidden ${
          isOpen
            ? "max-h-[32rem] border-slate-200 opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              {item.name}
            </a>
          ))}

          <div className="mt-3 grid gap-2 border-t border-slate-200 pt-4 sm:grid-cols-2">
            <a
              href="/login"
              onClick={() => setIsOpen(false)}
              className="rounded-xl border border-slate-300 px-5 py-3 text-center font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700"
            >
              Iniciar sesión
            </a>

            <a
              href="/registrar-negocio"
              onClick={() => setIsOpen(false)}
              className="rounded-xl bg-emerald-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-emerald-700"
            >
              Publicar negocio
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
