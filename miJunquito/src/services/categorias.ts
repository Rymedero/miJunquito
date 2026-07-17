import { supabase } from "../lib/supabase";
import type { Categoria } from "../types";

export async function getCategorias(): Promise<Categoria[]> {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .order("orden", { ascending: true })
    .order("nombre", { ascending: true });

  if (error) throw error;

  return data;
}
