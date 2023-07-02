import StudentTable from "@/(composition)/Tables/table";
import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type student = Database["public"]["Tables"]["students"]["Row"];

export type Student = {
  student_id: Database["public"]["Tables"]["users"]["Row"]["id"];
  first_name: Database["public"]["Tables"]["users"]["Row"]["first_name"];
  last_name: Database["public"]["Tables"]["users"]["Row"]["last_name"];
  email: Database["public"]["Tables"]["users"]["Row"]["user_email"];
  code: Database["public"]["Tables"]["students"]["Row"]["student_code"];
};

export default async function StudentsTablePage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: students, error } = await supabase
    .from("students")
    .select(" student_code ,users( id , first_name, last_name, user_email) ")
    .limit(1, { foreignTable: "users" })
    .returns<
      {
        users: {
          id: string;
          first_name: string;
          last_name: string;
          user_email: string;
        };
        student_code: string;
      }[]
    >();

  let studentTable: Student[] = [];

  if (students) {
    studentTable = students?.map((student) => {
      return {
        student_id: student.users.id,
        first_name: student.users.first_name,
        last_name: student.users.last_name,
        email: student.users.user_email,
        code: student?.student_code,
      };
    });
  }

  return (
    <>
      <StudentTable students={studentTable} />
    </>
  );
}
