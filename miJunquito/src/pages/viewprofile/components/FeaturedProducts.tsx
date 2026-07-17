import { ListChecks } from "lucide-react";
import type { Publicacion } from "../../../types";
import ProductImageCarousel from "./ProductImageCarousel";

interface FeaturedProductsProps {
  products: Publicacion[];
}

function formatPrice(price: number | null) {
  if (price === null) return null;

  return new Intl.NumberFormat("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="h-full rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-900/5 sm:p-8">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
        <ListChecks className="h-7 w-7 text-emerald-800" aria-hidden="true" />
        <h2 className="text-xl font-black text-emerald-900 sm:text-2xl">
          Lo más vendido / Destacado
        </h2>
      </div>

      {products.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {products.map((product) => {
            const price = formatPrice(product.precio);

            return (
              <article
                key={product.id}
                className="flex items-start justify-between gap-5 py-5 first:pt-6"
              >
                <div className="min-w-0">
                  <h3 className="font-extrabold text-slate-900 sm:text-lg">
                    {product.titulo}
                  </h3>
                  {product.descripcion && (
                    <p className="mt-1 leading-6 text-slate-500">
                      {product.descripcion}
                    </p>
                  )}
                </div>
                {price && (
                  <span className="shrink-0 font-black text-emerald-800 sm:text-lg">
                    {price}
                  </span>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <p className="py-8 text-sm text-slate-500">
          Este negocio todavía no ha publicado productos destacados.
        </p>
      )}

      <ProductImageCarousel products={products} />
    </section>
  );
}
