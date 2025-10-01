import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      {/* Pantallas dentro de settings */}
      <Stack.Screen name="geocercas" options={{ title: "Geocercas" }} />
    </Stack>
  );
}
