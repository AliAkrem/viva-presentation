"use client";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";

import { Notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";
import Loading from "./loading";
import { useLocalStorage } from "@mantine/hooks";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isLoading, setLoading] = useState(true);

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "dark",
  });

  const toggleColorScheme = () =>
    setColorScheme((current) => (current === "dark" ? "light" : "dark"));

  useEffect(() => {
    setLoading(false);
  }, []);

  return isLoading == true ? (
    <Loading />
  ) : (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: colorScheme,
          primaryColor: "blue",
          loader: "dots",
        }}
      >
        <Notifications position="bottom-left" />
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
