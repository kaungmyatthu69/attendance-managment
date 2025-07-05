import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";
import { SessionProvider } from "@/provider/ctx";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SessionProvider>
      <GluestackUIProvider>
        <Slot />
      </GluestackUIProvider>
    </SessionProvider>
  );
}
