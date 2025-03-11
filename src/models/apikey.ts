import { Apikey } from "@/types/apikey";
import { getSupabaseClient } from "@/models/db";

export enum ApikeyStatus {
  Created = "created",
  Deleted = "deleted",
}

export async function insertApikey(apikey: Apikey) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("apikeys").insert(apikey);

  if (error) throw error;

  return data;
}

export async function getUserApikeys(
  user_uuid: string,
  page: number = 1,
  limit: number = 50
): Promise<Apikey[] | undefined> {
  const offset = (page - 1) * limit;

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("apikeys")
    .select("*")
    .eq("user_uuid", user_uuid)
    .neq("status", ApikeyStatus.Deleted)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return undefined;
  }

  return data;
}

export async function getUserUuidByApiKey(
  apiKey: string
): Promise<string | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("apikeys")
    .select("user_uuid")
    .eq("api_key", apiKey)
    .eq("status", ApikeyStatus.Created)
    .limit(1)
    .single();

  if (error) {
    return undefined;
  }

  return data?.user_uuid;
}
