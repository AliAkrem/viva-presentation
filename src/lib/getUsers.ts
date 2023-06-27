import { supabase } from "@/utils/SuperbaseClients";

export default async function getUsers() {



    let { data: users, error } = await supabase
        .from('faculty')
        .select('*')

    if (error) {
        return undefined;
    }

    return users;


}
