"use client";
import {
  ADMINLINKS,
  ROLES,
  SPECIALTY_MANAGER_LINKS,
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
import { Flex, ScrollArea } from "@mantine/core";

type Props = {
  children: React.ReactNode;
};

export function DashBoard({ children }: Props) {
  const router = useRouter();

  const { role } = useAuth();

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
        <Flex justify={"space-between"} gap={0}>
          <NavbarNested Links={TEACHERLINKS}>
            <div style={{ width: "100%", zIndex: 2 }}>{children}</div>
          </NavbarNested>
        </Flex>
      );
    case ROLES.STUDENT.role:
      return (
        <Flex justify={"start"} align={"start"} gap={0} sx={{ width: "100%" }}>
          <NavbarNested Links={STUDENTLINKS}></NavbarNested>
          <ScrollArea h={"100vh"} w={"100%"} scrollbarSize={0}>
            <div style={{ width: "100%", zIndex: 2 }}>{children}</div>
          </ScrollArea>
        </Flex>
      );
    case ROLES.SPECIALTY_MANAGER.role:
      return (
        <Flex justify={"start"} align={"start"} gap={0} sx={{ width: "100%" }}>
          <NavbarNested Links={SPECIALTY_MANAGER_LINKS}></NavbarNested>
          <ScrollArea h={"100vh"} w={"100%"} scrollbarSize={0}>
            <div style={{ width: "100%", zIndex: 2 }}>{children}</div>
          </ScrollArea>
        </Flex>
      );
    case ROLES.UNAUTH.role:
      return <>{children}</>;
  }
}

export default DashBoard;
