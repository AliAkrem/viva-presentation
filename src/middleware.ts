import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

// Refresh session 
export async function middleware(req: NextRequest) {

    const res = NextResponse.next();

    const supabase = createMiddlewareClient({ req, res });

    const {
        data: { session },
    } = await supabase.auth.getSession()


    if (session) {
        return res
    }



    const redirectUrl = new URL('/login', req.nextUrl.origin);
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);



}


export const config = {
    matcher: '/students',
};
