import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Publicacion } from "../../../types";
import sampleRum from "../../../assets/demo-products/ron.png";
import sampleWhisky from "../../../assets/demo-products/whisky.png";
import sampleArtisanalLiqueur from "../../../assets/demo-products/licor-artesanal.png";

interface ProductImageCarouselProps {
  products: Publicacion[];
}

const sampleImages = [
  { id: "sample-rum", src: sampleRum, alt: "Botella y copa de ron añejo" },
  { id: "sample-whisky", src: sampleWhisky, alt: "Botella y vaso de whisky" },
  {
    id: "sample-artisanal-liqueur",
    src: sampleArtisanalLiqueur,
    alt: "Botella de licor artesanal",
  },
];

export default function ProductImageCarousel({
  products,
}: ProductImageCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const productImages = products.map((product) => ({
    id: `product-${product.id}`,
    src: product.imagen_url,
    alt: product.titulo,
  }));
  const carouselImages = productImages.length > 0 ? productImages : sampleImages;

  const moveCarousel = (direction: "left" | "right") => {
    carouselRef.current?.scrollBy({
      left: direction === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-6 border-t border-slate-100 pt-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-slate-500">
          Galería de productos
        </h3>

        {carouselImages.length > 1 && (
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => moveCarousel("left")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-emerald-700 hover:text-emerald-800"
              aria-label="Ver imágenes anteriores"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => moveCarousel("right")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-800 text-white transition hover:bg-emerald-900"
              aria-label="Ver imágenes siguientes"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div
        ref={carouselRef}
        className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {carouselImages.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-[4/3] w-[86%] shrink-0 snap-center overflow-hidden rounded-2xl bg-slate-100 sm:w-[calc(50%-0.375rem)] sm:snap-start lg:w-[calc(50%-0.375rem)]"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
