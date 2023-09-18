import Recover from "@/(composition)/recoverForm";
import { supabase } from "@/utils/superbase-server";
import { redirect } from "next/navigation";
import React from "react";

export default async function RecoverPage() {
  const { data: session, error } = await supabase.auth.getSession();

  // if (session && !error) redirect("/"); // session and not send a recover message

  // if (session) redirect("/change-password"); // session and send a recover message



  return (
    <>
      <Recover />
    </>
  );
}
