"use client";

import * as React from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import ThemeProvider from "./ThemeProvider";

/**
 * Theme Registry
 * Provides Emotion cache and MUI theme for proper SSR hydration
 * @date 2025-11-19 (Taiwan Time)
 */
export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [cache] = React.useState(() => {
    const emotionCache = createCache({ key: "mui", prepend: true });
    return emotionCache;
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider>{children}</ThemeProvider>
    </CacheProvider>
  );
}
