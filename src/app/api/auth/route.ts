import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

export async function GET(request: NextRequest) {

    const supabase = createRouteHandlerClient({ cookies })


    const { data: { session }, error } = await supabase.auth.getSession()


    if (error) {
        redirect('/');
    } else {

        if (session) {


            const { data: role, error } = await supabase
                .from('user_role')
                .select('roles (role)')
                .eq('user_id', session?.user.id)
                .single();
            if (error) {
                redirect('/');
            }

            console.log({ role, error })

        }
    }

    const requestUrl = new URL(request.url)

    return NextResponse.redirect(`${requestUrl.origin}/api/`)

}

