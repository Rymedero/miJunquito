import { useEffect, useState } from "react";
import { getCategorias } from "../services/categorias";
import type { Categoria } from "../types";

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    let isMounted = true;

    getCategorias()
      .then((data) => {
        if (isMounted) setCategorias(data);
      })
      .catch(() => {
        if (isMounted) setCategorias([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { categorias };
}
