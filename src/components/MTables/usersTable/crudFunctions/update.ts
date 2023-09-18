'use server'

import { supabase } from "@/utils/superbase-server"

type Props = {
    user_id: string;
    first_name: string;
    last_name: string;
    user_email: string;
    role: 'student' | 'teacher' | 'admin' | 'specialty_manager';
}
export default async function updateUser({ user_id, first_name, last_name, user_email, role }: Props) {


    const { error: error1 } = await supabase.from('users').update({ first_name, last_name, user_email }).eq('id', user_id)

    const { data: currentRole } = await supabase.from('users').select('role (role)')
        .eq('id', user_id)
        .limit(1, { foreignTable: 'roles' })
        .single()


    if (currentRole && role !== currentRole?.role[0].role) {  // update with new role
        // get new role assigned id
        const { data: role_id, error: error3 } = await supabase.from('roles').select('role_id').eq('role', role).single()
        if (error3)
            return error3;
        const { error: error2 } = await supabase.from('user_role').update({ role_id: role_id?.role_id }).eq('user_id', user_id)

        if (error2)
            return error2
    }

    return error1;



}

