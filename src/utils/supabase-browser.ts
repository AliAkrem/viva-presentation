import { Database } from '@/lib/database.types';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

const supabase = createPagesBrowserClient<Database>({isSingleton : false});

export default supabase;