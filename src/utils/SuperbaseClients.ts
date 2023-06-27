import { Database } from "@/lib/database.types";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export const supabaseBrowserClient = createPagesBrowserClient<Database>();
