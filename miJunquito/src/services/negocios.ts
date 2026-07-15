import { supabase } from "../lib/supabase";
import type { Negocio } from "../types";

export async function getNegocios(): Promise<Negocio[]> {
  const { data, error } = await supabase
    .from("negocios")
    .select("*")
    .eq("estado", "activo");

  if (error) throw error;

  return data;
}
