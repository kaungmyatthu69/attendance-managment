import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="classrooms" options={{ headerShown: false }} />
      <Stack.Screen name="timetable" options={{ headerShown: false }} />
      <Stack.Screen name="attendance" options={{ headerShown: false }} />
      <Stack.Screen name="currentClass" options={{ headerShown: false }} />
    </Stack>
  );
}
