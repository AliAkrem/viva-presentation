import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import DashBoard from "@/(composition)/dashBoard/page";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if (session) {

  //   redirect("/admin");
    
  // }

  return <main><DashBoard /></main> 
  ;
}
