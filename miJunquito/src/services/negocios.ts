import { supabase } from "../lib/supabase";
import type { NegocioListItem, NegocioProfile } from "../types";

export async function getNegocios(): Promise<NegocioListItem[]> {
  const { data, error } = await supabase
    .from("negocios")
    .select("*, categorias(nombre,slug)")
    .eq("estado", "activo");

  if (error) throw error;

  return data;
}

export async function getNegocioBySlug(
  slug: string,
): Promise<NegocioProfile | null> {
  const { data, error } = await supabase
    .from("negocios")
    .select(`
      *,
      categorias(nombre),
      publicaciones(*),
      horarios(*)
    `)
    .eq("slug", slug)
    .eq("estado", "activo")
    .eq("publicaciones.activo", true)
    .order("orden", { referencedTable: "publicaciones", ascending: true })
    .order("dia_semana", { referencedTable: "horarios", ascending: true })
    .maybeSingle();

  if (error) throw error;

  return data;
}
