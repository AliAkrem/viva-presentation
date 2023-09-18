"use client";
import { ROLES, useAuth } from "@/components/Auth/AuthProvider";
import React from "react";
import AdminProfile from "./adminProfile";
import { UserInfoAction } from "@/components/profileUserInfo";
import { Flex, Group, SimpleGrid, createStyles } from "@mantine/core";

import StudentProfile from "./studentProfile";

const useStyles = createStyles((theme) => ({
  profile: {
    width : '100%',
    display: "flex",
    alignItems: "start",
    justifyContent: "start",
    gap: theme.spacing.md,
    flexDirection: "row",
    [theme.fn.smallerThan("lg")]: {
      flexDirection: "column",
    },
  },
}));

export default function Profile() {
  const { role, user } = useAuth();
  const {classes} = useStyles()

  return (
    <div>
      <div className={classes.profile}>
        <Group position="center">
          {user && (
            <UserInfoAction
              first_name={user.first_name}
              last_name={user.last_name}
              user_email={user.user_email}
            />
          )}
        </Group>
        {role[0].role === ROLES.STUDENT.role ? <StudentProfile /> : null}
      </div>

      {role[0].role === ROLES.ADMIN.role ? (
        <>
          <AdminProfile />
        </>
      ) : null}
    </div>
  );
}
