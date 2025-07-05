import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Timetable() {
  return (
    <SafeAreaView className="p-5" style={{ flex: 1 }}>
      <VStack space="md">
        <HStack className="flex items-center gap-16">
          <Pressable
            className="flex items-center flex-row gap-2"
            onPress={() => router.back()}
          >
            <ChevronLeft />
            <Text>Back</Text>
          </Pressable>
          <Box>
            <Text className="text-lg font-bold text-center">Timetable</Text>
          </Box>
        </HStack>
      </VStack>
      <HStack className="mt-10">
        <Text className=" font-semibold text-lg">Pre-Intermediate Class </Text>
      </HStack>
      <Box
        style={{
          marginTop: 40,
          borderRadius: 16,
          overflow: "hidden",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Calendar
          markingType={"period"}
          markedDates={{
            "2024-06-10": {
              startingDay: true,
              color: "#2563eb",
              textColor: "white",
            },
            "2024-06-11": { color: "#2563eb", textColor: "white" },
            "2024-06-12": { color: "#2563eb", textColor: "white" },
            "2024-06-13": {
              endingDay: true,
              color: "#2563eb",
              textColor: "white",
            },
          }}
          theme={{
            backgroundColor: "#2563eb",
            calendarBackground: "#f7f7f7",
            textSectionTitleColor: "#2563eb",
            selectedDayBackgroundColor: "#2563eb",
            selectedDayTextColor: "#2563eb",
            todayTextColor: "#ff6347",
            dayTextColor: "#2563eb",
            textDisabledColor: "#2563eb",
            dotColor: "#00adf5",
            selectedDotColor: "#ffffff",
            arrowColor: "#2563eb",
            monthTextColor: "#2563eb",
            indicatorColor: "#2563eb",
            textDayFontFamily: "System",
            textMonthFontFamily: "System",
            textDayHeaderFontFamily: "System",
            textDayFontWeight: "400",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "400",
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
          style={{
            borderWidth: 0,
            height: 370,
            borderRadius: 16,
          }}
          current={"2024-06-10"}
          onDayPress={(day) => {
            console.log("selected day", day);
          }}
        />
      </Box>
    </SafeAreaView>
  );
}
