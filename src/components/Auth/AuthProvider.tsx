"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/utils/supabase-browser";
import { AuthError, Session, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/database.types";
import {
  IconAdjustments,
  IconDashboard,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconPresentationAnalytics,
} from "@tabler/icons-react";
import { IconNotes } from "@tabler/icons-react";
import { IconCalendarStats } from "@tabler/icons-react";
import { UserNavLinks } from "../../../type";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export const EVENTS = {
  PASSWORD_RECOVERY: "PASSWORD_RECOVERY",
  SIGNED_OUT: "SIGNED_OUT",
  USER_UPDATED: "USER_UPDATED",
};
export const VIEWS = {
  SIGN_IN: "sign_in",
  SIGN_UP: "sign_up",
  FORGOTTEN_PASSWORD: "forgotten_password",
  MAGIC_LINK: "magic_link",
  UPDATE_PASSWORD: "update_password",
};
export const ROLES = {
  UNAUTH: { role: "unauthenticated" },
  STUDENT: { role: "student" },
  TEACHER: { role: "teacher" },
  SPECIALTY_MANAGER: { role: "specialty_manager" },
  ADMIN: { role: "admin" },
};
export const ADMINLINKS: UserNavLinks = [
  { label: "Admin Dashboard", icon: IconDashboard, link: "/admin/account" },
  {
    label: "Student Accounts",
    icon: IconNotes,
    initiallyOpened: false,
    links: [
      { label: "Overview", link: "/" },
      { label: "Forecasts", link: "/" },
      { label: "Outlook", link: "/" },
      { label: "Real time", link: "/" },
    ],
  },
  {
    label: "Teacher Accounts",
    icon: IconCalendarStats,
    links: [
      { label: "Upcoming releases", link: "/" },
      { label: "Previous releases", link: "/" },
      { label: "Releases schedule", link: "/" },
    ],
  },
  { label: "Analytics", icon: IconPresentationAnalytics },
  { label: "Contracts", icon: IconFileAnalytics },
  { label: "Settings", icon: IconAdjustments },
  {
    label: "Security",
    icon: IconLock,
    links: [
      { label: "Enable 2FA", link: "/" },
      { label: "Change password", link: "/" },
      { label: "Recovery codes", link: "/" },
    ],
  },
];
export const TEACHERLINKS: UserNavLinks = [
  { label: "Teacher Dashboard", icon: IconGauge },
  {
    label: "Student Accounts",
    icon: IconNotes,
    initiallyOpened: false,
    links: [
      { label: "Overview", link: "/" },
      { label: "Forecasts", link: "/" },
      { label: "Outlook", link: "/" },
      { label: "Real time", link: "/" },
    ],
  },
  {
    label: "Teacher Accounts",
    icon: IconCalendarStats,
    links: [
      { label: "Upcoming releases", link: "/" },
      { label: "Previous releases", link: "/" },
      { label: "Releases schedule", link: "/" },
    ],
  },
  { label: "Analytics", icon: IconPresentationAnalytics },
  { label: "Contracts", icon: IconFileAnalytics },
  { label: "Settings", icon: IconAdjustments },
  {
    label: "Security",
    icon: IconLock,
    links: [
      { label: "Enable 2FA", link: "/" },
      { label: "Change password", link: "/" },
      { label: "Recovery codes", link: "/" },
    ],
  },
];
export const STUDENTLINKS: UserNavLinks = [
  { label: "Student Dashboard", icon: IconGauge },
  {
    label: "Student Accounts",
    icon: IconNotes,
    initiallyOpened: false,
    links: [
      { label: "Overview", link: "/" },
      { label: "Forecasts", link: "/" },
      { label: "Outlook", link: "/" },
      { label: "Real time", link: "/" },
    ],
  },
  {
    label: "Teacher Accounts",
    icon: IconCalendarStats,
    links: [
      { label: "Upcoming releases", link: "/" },
      { label: "Previous releases", link: "/" },
      { label: "Releases schedule", link: "/" },
    ],
  },
  { label: "Analytics", icon: IconPresentationAnalytics },
  { label: "Contracts", icon: IconFileAnalytics },
  { label: "Settings", icon: IconAdjustments },
  {
    label: "Security",
    icon: IconLock,
    links: [
      { label: "Enable 2FA", link: "/" },
      { label: "Change password", link: "/" },
      { label: "Recovery codes", link: "/" },
    ],
  },
];
type UserInfo = {
  first_name: Database["public"]["Tables"]["users"]["Row"]["first_name"];
  last_name: Database["public"]["Tables"]["users"]["Row"]["last_name"];
  user_email: Database["public"]["Tables"]["users"]["Row"]["user_email"];
};
export interface AuthContextType {
  initial: boolean;
  session: Session | null; // Update with the actual type of session
  user: UserInfo | null; // Update with the actual type of user
  view: string;
  role: { role: string }[];
  setView: React.Dispatch<React.SetStateAction<string>>;
  signOut: () => Promise<{
    error: AuthError | null;
  }>;
  supabase :  SupabaseClient<Database, "public", any>
}
export const authContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({
  accessToken,
  children,
}: {
  accessToken: string | null;
  children: React.ReactNode;
}) => {
  const [initial, setInitial] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [view, setView] = useState(VIEWS.SIGN_IN);

  const [supabase] = useState(() => createPagesBrowserClient());

  const router = useRouter();

  const [role, setRole] = useState<{ role: string }[]>(() => [ROLES.UNAUTH]);
  useEffect(() => {
    async function getActiveSession() {
      const {
        data: { session: activeSession },
      } = await supabase.auth.getSession();
      setSession(activeSession);

      if (session) {
        const { data: user } = await supabase
          .from("users")
          .select("first_name, last_name, user_email, roles (role)")
          .eq("id", activeSession?.user.id)
          .single();

        if (user?.roles && user?.roles.length > 0) {
          setRole(user?.roles);
        } else if (user?.roles.length == 0) {
          setRole([ROLES.UNAUTH]);
        }
        setUser(user ?? null);
      }
      setInitial(false);
    }

    getActiveSession();

    async function fetchUser(uuid: string | undefined) {
      const { data: user } = await supabase
        .from("users")
        .select("first_name, last_name, user_email , roles(role)")
        .eq("id", uuid)
        .single();

      if (user?.roles && user?.roles.length > 0) {
        setRole(user.roles);
      } else if (user?.roles.length == 0) {
        setRole([ROLES.UNAUTH]);
      }

      setUser(user ?? null);
      setInitial(false);
    }

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (currentSession?.access_token !== accessToken) {
        router.refresh();
      }

      setSession(currentSession);

      if (currentSession && !user) {
        fetchUser(currentSession.user.id);
        setInitial(false);
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => {
    return {
      supabase, 
      initial,
      session,
      user,
      view,
      role,
      setView,
      signOut: () => supabase.auth.signOut(),
    };
  }, [session, user, view, role, initial]);

  return <authContext.Provider value={value}>{children} </authContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
