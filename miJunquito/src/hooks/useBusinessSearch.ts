import { useCallback, useEffect, useState } from "react";
import {
  buscarNegociosYCategorias,
  obtenerCategoriasDestacadas,
} from "../services/buscador";
import type { DocumentoBusqueda, ResultadoBusqueda } from "../types/busqueda";

function mensajeDeError(error: unknown) {
  return error instanceof Error && error.message
    ? error.message
    : "No se pudo iniciar el buscador.";
}

export function useBusinessSearch() {
  const [termino, setTermino] = useState("");
  const [respuesta, setRespuesta] = useState<{ termino: string; resultados: ResultadoBusqueda[] }>({ termino: "", resultados: [] });
  const [categoriasDestacadas, setCategoriasDestacadas] = useState<DocumentoBusqueda[]>([]);
  const [abierto, setAbierto] = useState(false);
  const [cargandoCategorias, setCargandoCategorias] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let vigente = true;

    obtenerCategoriasDestacadas()
      .then((categorias) => {
        if (vigente) setCategoriasDestacadas(categorias);
      })
      .catch((requestError: unknown) => {
        if (vigente) setError(mensajeDeError(requestError));
      })
      .finally(() => {
        if (vigente) setCargandoCategorias(false);
      });

    return () => {
      vigente = false;
    };
  }, []);

  useEffect(() => {
    const consulta = termino.trim();
    if (consulta.length < 2) return;

    let vigente = true;

    buscarNegociosYCategorias(consulta)
      .then((coincidencias) => {
        if (vigente) {
          setRespuesta({ termino: consulta, resultados: coincidencias });
          setError(null);
        }
      })
      .catch((requestError: unknown) => {
        if (vigente) setError(mensajeDeError(requestError));
      })

    return () => {
      vigente = false;
    };
  }, [termino]);

  const abrirBuscador = useCallback(() => setAbierto(true), []);
  const cerrarBuscador = useCallback(() => setAbierto(false), []);
  const consulta = termino.trim();
  const resultados = consulta.length >= 2 && respuesta.termino === consulta
    ? respuesta.resultados
    : [];
  const loading = cargandoCategorias || (consulta.length >= 2 && respuesta.termino !== consulta && !error);

  return {
    termino,
    setTermino,
    resultados,
    categoriasDestacadas,
    abierto,
    loading,
    error,
    abrirBuscador,
    cerrarBuscador,
  };
}
