'use server'
import { supabase } from "@/utils/superbase-server";




export async function deleteUser(user_id : string ) {
    const { error } = await supabase.from('users').delete().eq('id', user_id);

    return error;
}

