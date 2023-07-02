import { Database } from '@/lib/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
// import supabase from './supabase-browser';

// This needs to export a function, as the headers and cookies are not populated with values until the Server Component is requesting data.
export  const  supabase = 
    createServerComponentClient<Database>({
        cookies,
    });