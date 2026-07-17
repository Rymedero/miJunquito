import { useEffect, useState } from "react";
import { getNegocioBySlug } from "../services/negocios";
import type { NegocioProfile } from "../types";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;

  return "No se pudo cargar el perfil del negocio. Inténtalo nuevamente.";
}

export function useNegocioProfile(slug: string | undefined) {
  const [negocio, setNegocio] = useState<NegocioProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resolvedSlug, setResolvedSlug] = useState<string | undefined>();

  useEffect(() => {
    let isMounted = true;

    if (!slug) {
      return () => {
        isMounted = false;
      };
    }

    getNegocioBySlug(slug)
      .then((data) => {
        if (isMounted) {
          setNegocio(data);
          setError(null);
        }
      })
      .catch((requestError: unknown) => {
        if (isMounted) {
          setNegocio(null);
          setError(getErrorMessage(requestError));
        }
      })
      .finally(() => {
        if (isMounted) setResolvedSlug(slug);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const loading = Boolean(slug) && resolvedSlug !== slug;

  return { negocio, loading, error };
}
