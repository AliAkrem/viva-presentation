import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");
//   else {
//     const {data : userData } = await  supabase.from("users").select("first_name , last_name").eq("id", session.user.id).single();
//   }

  return (
    <>
      <nav>admin navbar</nav>
      {children}
    </>
  );
}
