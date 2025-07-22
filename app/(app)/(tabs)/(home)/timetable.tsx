import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useTimeTable } from "@/hooks/useTimeTable";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
type Class = {
  class_id: string;
  class_name: string;
  dates: string[];
};
export default function Timetable() {
  const { data: timeTable, isLoading } = useTimeTable();
  const animationRef = useRef<LottieView>(null);
  const [dates, setDates] = useState<string[]>([]);
  const [classes, setClassess] = useState<Class[]>([]);
  const [currentClass, setCurrentClass] = useState<Class | null>(null);

  // Helper function to check if two dates are consecutive
  const areConsecutiveDates = (date1: string, date2: string): boolean => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1;
  };

  // Helper function to format date to YYYY-MM-DD
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Group consecutive dates
  const markedDates: {
    [key: string]: {
      color: string;
      textColor: string;
      startingDay?: boolean;
      endingDay?: boolean;
    };
  } = {};

  if (dates.length > 0) {
    // Sort dates to ensure they're in chronological order
    const sortedDates = [...dates].sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    let currentGroup: string[] = [];

    for (let i = 0; i < sortedDates.length; i++) {
      const currentDate = formatDate(sortedDates[i]);
      const nextDate =
        i + 1 < sortedDates.length ? formatDate(sortedDates[i + 1]) : null;

      currentGroup.push(currentDate);

      // Check if next date is consecutive or if this is the last date
      if (nextDate === null || !areConsecutiveDates(currentDate, nextDate)) {
        // Process the current group
        currentGroup.forEach((date, idx) => {
          markedDates[date] = {
            color: "#2C7fff",
            textColor: "white",
            ...(idx === 0 && { startingDay: true }),
            ...(idx === currentGroup.length - 1 && { endingDay: true }),
          };
        });

        // Reset group for next sequence
        currentGroup = [];
      }
    }
  }

  useEffect(() => {
    console.log("useEffect triggered with timeTable:", timeTable);
    console.log("isLoading:", isLoading);
    console.log("timeTable.data:", timeTable?.data);
    console.log("timeTable structure:", JSON.stringify(timeTable, null, 2));

    if (timeTable && timeTable.data) {
      if (Array.isArray(timeTable.data) && timeTable.data.length > 0) {
        const firstClass = timeTable.data[0];
        console.log("First class object:", firstClass);
        console.log("First class keys:", Object.keys(firstClass));

        if (firstClass && firstClass.dates) {
          setDates(firstClass.dates);
          setClassess(timeTable.data);
          // Auto-select the first class
          setCurrentClass(timeTable.data[0]);
        } else {
          console.log("firstClass.dates is missing:", firstClass);
        }
      } else {
        console.log("timeTable.data is not an array or is empty");
      }
    } else {
      console.log("timeTable or timeTable.data is null/undefined");
    }
  }, [timeTable, isLoading]);

  // Update dates when currentClass changes
  useEffect(() => {
    if (currentClass && currentClass.dates) {
      setDates(currentClass.dates);
    }
  }, [currentClass]);

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

      {isLoading && (
        <Box className="flex-1 justify-center items-center">
          <LottieView
            ref={animationRef}
            source={require("@/assets/lotties/Loading.json")}
            autoPlay
            loop={true}
            style={{ width: 200, height: 200 }}
          />
        </Box>
      )}

      {!isLoading && classes.length === 0 && (
        <Box className="flex-1 justify-center items-center">
          <Text>No classes found</Text>
        </Box>
      )}

      {!isLoading && classes.length > 0 && (
        <>
          <FlashList
            className=" my-10"
            data={classes}
            estimatedItemSize={250}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            extraData={currentClass?.class_id}
            renderItem={({ item }) => {
              // More robust comparison that handles different types and formats
              const currentId = String(currentClass?.class_id || "").trim();
              const itemId = String(item.class_id || "").trim();
              const isSelected = currentId === itemId && currentId !== "";

              return (
                <Pressable
                  key={item.class_id}
                  className={`px-6 py-3 rounded-full mr-3 ${
                    isSelected ? "bg-blue-500" : "bg-white"
                  }`}
                  onPress={() => {
                    setCurrentClass(item);
                  }}
                >
                  <Text
                    className={`font-medium text-normal ${
                      isSelected ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {item.class_name || "No Name"}
                  </Text>
                </Pressable>
              );
            }}
          />
        </>
      )}

      <HStack className="">
        <Text className="font-semibold text-lg">
          {currentClass?.class_name || "Select a Class"}
        </Text>
      </HStack>
      {dates.length > 0 && (
        <Box
          style={{
            marginTop: 50,
            borderRadius: 16,
            overflow: "hidden",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
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
              textSectionTitleColor: "#597384",
              selectedDayBackgroundColor: "#2C7fff",
              selectedDayTextColor: "#2C7fff",
              todayTextColor: "#ff6347",
              dayTextColor: "#597384",
              textDisabledColor: "#d9e1e8",
              dotColor: "#00adf5",
              selectedDotColor: "#ffffff",
              arrowColor: "#597384",
              monthTextColor: "#597384",
              indicatorColor: "#597384",
              textDayFontFamily: "System",
              textMonthFontFamily: "System",
              textDayHeaderFontFamily: "System",
              textDayFontWeight: "400",
              textMonthFontWeight: "600",
              textDayHeaderFontWeight: "400",
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
            style={{
              borderWidth: 0,
              height: 370,
              borderRadius: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
            }}
            current={dates[0]}
            onDayPress={(day) => {
              console.log("selected day", day);
            }}
          />
        </Box>
      )}
    </SafeAreaView>
  );
}
