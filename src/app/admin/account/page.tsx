import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export default async function AccountPage() {
  //   const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.from("users").select() ; 

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
