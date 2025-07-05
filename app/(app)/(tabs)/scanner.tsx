import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
export default function ScannerScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Scanner Screen</Text>
      {/* Scanner component will be implemented here */}
    </SafeAreaView>
  );
}
