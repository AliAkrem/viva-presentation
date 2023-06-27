import { supabaseBrowserClient } from "@/utils/SuperbaseClients";

export default async function getUsers() {



    let { data: users, error } = await supabaseBrowserClient
        .from('faculty')
        .select('*')

    if (error) {
        return undefined;
    }

    return users;


}
