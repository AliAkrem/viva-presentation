"use client";
import {
  ADMINLINKS,
  ROLES,
  STUDENTLINKS,
  TEACHERLINKS,
  useAuth,
} from "@/components/Auth/AuthProvider";
import React from "react";
import AdminDashBoard from "./adminDashBoard";
import TeacherDashBoard from "./teacherDashBoard";
import StudentDashBoard from "./studentDashBoard";
import { useRouter } from "next/navigation";
import NavbarNested from "@/components/nav";
import { Flex } from "@mantine/core";

type Props = {
  children: React.ReactNode;
};

export function DashBoard({ children }: Props) {
  const router = useRouter();

  const { role, session } = useAuth();

  // if (!session) router.push("/login");


  switch (role[0].role) {
    case ROLES.ADMIN.role:
      return (
        <>
          <Flex justify={"space-between"} gap={0}>
            <NavbarNested Links={ADMINLINKS} />
            <div style={{ width: "100%", zIndex: 2 }}>{children}</div>
          </Flex>
        </>
      );
    case ROLES.TEACHER.role:
      return (
        <NavbarNested Links={TEACHERLINKS}>
          <TeacherDashBoard />
        </NavbarNested>
      );
    case ROLES.STUDENT.role:
      return (
        <NavbarNested Links={STUDENTLINKS}>
          <StudentDashBoard />
        </NavbarNested>
      );
    case ROLES.UNAUTH.role:
      return <>{children}</>;
  }
}

export default DashBoard;
