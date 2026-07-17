import { useEffect, useState } from "react";
import { getNegocios } from "../services/negocios";
import type { NegocioListItem } from "../types";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;

  return "No se pudieron cargar los negocios. Inténtalo nuevamente.";
}

export function useNegocios() {
  const [negocios, setNegocios] = useState<NegocioListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getNegocios()
      .then((data) => {
        if (isMounted) setNegocios(data);
      })
      .catch((requestError: unknown) => {
        if (isMounted) setError(getErrorMessage(requestError));
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { negocios, loading, error };
}
