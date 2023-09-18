"use client";
import { VIEWS, useAuth } from "@/components/Auth/AuthProvider";
import { ChangePassword } from "@/components/changePassword";
import { ForgotPassword } from "@/components/forgotPassword";
import React from "react";

export default function Recover() {
  const { view } = useAuth();

  if (view === VIEWS.UPDATE_PASSWORD) {
    return <ChangePassword />;
  }

  if (view === VIEWS.FORGOTTEN_PASSWORD) {
    return <ForgotPassword />;
  }
}
