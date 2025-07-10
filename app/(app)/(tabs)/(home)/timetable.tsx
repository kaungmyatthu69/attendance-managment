import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

const startDate = new Date("2025-02-01");
const endDate = new Date("2025-03-20");
const weekdays = ["Monday", "Tuesday", "Wednesday"];

export default function Timetable() {
  const result = [];
  const dayNameToNumber: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  const targetDays = new Set(
    weekdays.map((day) => dayNameToNumber[day as keyof typeof dayNameToNumber])
  );
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    if (targetDays.has(d.getDay())) {
      result.push(new Date(d).toISOString().slice(0, 10)); // YYYY-MM-DD
    }
  }

  // Group result dates by consecutive weekday sequence in 'weekdays'
  const markedDates: {
    [key: string]: {
      color: string;
      textColor: string;
      startingDay?: boolean;
      endingDay?: boolean;
    };
  } = {};

  let group: string[] = [];
  for (let i = 0; i < result.length; i++) {
    group.push(result[i]);
    const currentDate = new Date(result[i]);
    const nextDate = i + 1 < result.length ? new Date(result[i + 1]) : null;
    const currentWeekdayIdx = weekdays.indexOf(
      Object.keys(dayNameToNumber).find(
        (k) =>
          dayNameToNumber[k as keyof typeof dayNameToNumber] ===
          currentDate.getDay()
      ) || ""
    );
    const nextWeekdayIdx =
      nextDate !== null
        ? weekdays.indexOf(
            Object.keys(dayNameToNumber).find(
              (k) =>
                dayNameToNumber[k as keyof typeof dayNameToNumber] ===
                nextDate.getDay()
            ) || ""
          )
        : -1;

    // If next weekday is not the next in sequence in your weekdays array, or last date, close group
    if (nextDate === null || nextWeekdayIdx !== currentWeekdayIdx + 1) {
      group.forEach((date, idx) => {
        markedDates[date] = {
          color: "#2C7fff",
          textColor: "white",
          ...(idx === 0 && { startingDay: true }),
          ...(idx === group.length - 1 && { endingDay: true }),
        };
      });
      group = [];
    }
  }

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
          markedDates={markedDates}
          theme={{
            backgroundColor: "#2C7fff",
            calendarBackground: "#f7f7f7",
            textSectionTitleColor: "#2C7fff",
            selectedDayBackgroundColor: "#2C7fff",
            selectedDayTextColor: "#2C7fff",
            todayTextColor: "#ff6347",
            dayTextColor: "#2C7fff",
            textDisabledColor: "#2C7fff",
            dotColor: "#00adf5",
            selectedDotColor: "#ffffff",
            arrowColor: "#2C7fff",
            monthTextColor: "#2C7fff",
            indicatorColor: "#2C7fff",
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
          current={result[0] || startDate.toISOString().slice(0, 10)}
          onDayPress={(day) => {
            console.log("selected day", day);
          }}
        />
      </Box>
    </SafeAreaView>
  );
}
