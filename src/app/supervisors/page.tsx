import SupervisorsTable from "@/(composition)/supervisorsTable/table";
import { supabase } from "@/utils/superbase-server";
import React from "react";
export type Supervisors = {
  id: string;
  first_name: string;
  last_name: string;
  n_assigned_team: number;
  position_abbreviated: string;
};

export default async function SupervisorsPage() {
  const { data, error } = await supabase
    .from("supervisors_view")
    .select("*")
    .returns<
      {
        first_name: string;
        last_name: string;
        n_assigned_team: number;
        specialty_name: string;
        start: number;
        position_abbreviated: string;
        id: string;
      }[]
    >();
  console.log(data);

  return (
    <>
      
      {data && <SupervisorsTable supervisors={data} />}
    </>
  );
}
