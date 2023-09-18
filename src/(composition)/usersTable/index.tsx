import { User } from "@/app/users-accounts/page";
import UsersTable from "@/components/MTables/usersTable";
import React from "react";

type Props = {
  users: User[];
};

export default function DisplayUsers({ users }: Props) {
  return (
    <div>
      <UsersTable users={users} />
    </div>
  );
}
