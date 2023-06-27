import LoginForm from "@/(composition)/loginForm/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { session }, error
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }


  return <LoginForm />;
}
