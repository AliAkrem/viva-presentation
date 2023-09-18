"use client";
import { ROLES, useAuth } from "@/components/Auth/AuthProvider";
import React from "react";
import AdminHome from "./adminHome";

export default function Home() {
  const { role, initial } = useAuth();

  if (!initial) {
    switch (role[0].role) {
      case ROLES.ADMIN.role:
        return <div className="p-8"><AdminHome /> </div>;
      case ROLES.TEACHER.role:
        return <>Teacher home</>;
      case ROLES.STUDENT.role:
        return <>student home</>;
      case ROLES.SPECIALTY_MANAGER.role:
        return <>specialty manager home</>;
    }
  }
}
