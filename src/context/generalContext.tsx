"use client";

import React, { createContext, useContext } from "react";
import { AuthError, Session } from "@supabase/supabase-js";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export interface GeneralState {
  session?: Session | null;
  data?: Promise<
    | {
        data: {
          session: Session;
        };
        error: null;
      }
    | {
        data: {
          session: null;
        };
        error: AuthError;
      }
    | {
        data: {
          session: null;
        };
        error: null;
      }
  >;
  user?: {};
}

const generalState = createContext<GeneralState>({
  user: {},
});

type Props = {
  children: React.ReactNode;
};

export const GeneralContextProvider = ({ children }: Props) => {
  const supabase = createClientComponentClient();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription  }, 
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  console.log(session);

  return (
    <generalState.Provider value={{ session }}>
      {children}
    </generalState.Provider>
  );
};

export const useGeneralStateContext = (): GeneralState =>
  useContext(generalState);
