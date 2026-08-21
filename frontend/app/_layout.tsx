import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useIconFonts } from "@/src/hooks/use-icon-fonts";

// Keep the native splash visible from cold start until icon fonts register.
// A rejected native call must not prevent the application from booting.
void SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [loaded, error] = useIconFonts();

  useEffect(() => {
    if (loaded || error) {
      void SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded, error]);

  // If the font source is unreachable, continue on error so the first screen
  // remains visible and the problem can be diagnosed instead of hanging.
  if (!loaded && !error) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
