import DisplayUsers from "@/(composition)/usersTable";
import { supabase } from "@/utils/superbase-server";
import React from "react";

export type User = {
  user_id: string;
  first_name: string;
  last_name: string;
  user_email: string;
  created_at: string;
  role: string;
};

export default async function UsersAccountsPage() {
  const { data, error } = await supabase
    .from("users")
    .select("id, first_name , last_name , user_email ,created_at,  roles(role)")
    .limit(1, { foreignTable: "roles" })
    ;
  let usersRows: User[] = [];
  if (data) {
    usersRows = data.map((row) => {
      const date = new Date(row.created_at);
      const created_at_formatted = date.toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      return {
        user_id: row.id,
        first_name: row.first_name,
        last_name: row.last_name,
        user_email: row.user_email,
        created_at: created_at_formatted,
        role: row.roles[0].role,
      };
    });
  }

  console.log(usersRows)

  return <div><DisplayUsers users={usersRows} /> </div>;
}
