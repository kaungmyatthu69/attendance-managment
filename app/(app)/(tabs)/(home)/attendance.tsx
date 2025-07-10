import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import {
  CalendarDays,
  ChevronLeft,
  Clock,
  MapPin,
  User,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const tabs = [
  { key: "all", label: "All" },
  { key: "absence", label: "Absence" },
];

const startDate = new Date("2025-02-01");
const endDate = new Date("2025-03-20");
const weekdays = ["Monday", "Tuesday", "Wednesday"];
const absenceDate = ["2025-02-10", "2025-02-11", "2025-02-12"];
export default function Attendance() {
  const [activeTab, setActiveTab] = useState("all");
  const [data,setData] = useState([])
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
      const dayName = Object.keys(dayNameToNumber).find(
        (key) => dayNameToNumber[key] === d.getDay()
      );
      result.push({
        date: new Date(d).toISOString().slice(0, 10),
        day: dayName,
      });
    }
  }
  useEffect(()=>{
    if(activeTab !== 'all'){
    const filteredResult = result.filter(day => absenceDate.includes(day.date));
    setData(filteredResult);
    }else{
      setData(result)
    }
  },[activeTab])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack space="md" className="p-5" style={{ flex: 1 }}>
        <HStack className="flex  items-center gap-16">
          <Pressable
            className="flex items-center flex-row gap-2 relative"
            onPress={() => router.back()}
          >
            <ChevronLeft />
            <Text>Back</Text>
          </Pressable>

          <Text className="text-lg font-bold text-center absolute left-1/2 -translate-x-1/2">
            Attendance
          </Text>
        </HStack>
        <HStack className="mt-6">
          <Text>Percentage of attendance - 90%</Text>
        </HStack>
        <Box className="flex-row bg-gray-200 shadow-xs rounded-xl m-4 p-1">
          {tabs.map((tab) => (
            <Pressable
              key={tab.key}
              className={`flex-1 items-center py-2 rounded-lg relative ${
                activeTab === tab.key ? "bg-white " : ""
              }`}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                className={`text-base font-medium ${
                  activeTab === tab.key
                    ? "text-primary-960 font-bold"
                    : "text-gray-400"
                }`}
              >
                {tab.label}
              </Text>
              {/* {activeTab === tab.key && (
                <View className="absolute left-5 right-5 bottom-1 h-1 rounded bg-primary-960" />
              )} */}
            </Pressable>
          ))}
        </Box>
        <Box style={{ flex: 1 }}>
          <FlashList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({ item, index }) => (
              <Card className="mt-3  ">
                <VStack space="md">
                  <VStack space="md">
                    <Text className="text-lg font-semibold">Class 1</Text>
                    <HStack space="md" className="flex items-center">
                      <User />
                      <Text>Daw Than Than Soe</Text>
                    </HStack>
                  </VStack>
                  <HStack space="md">
                    <MapPin />
                    <Text >Yangon , Hleden</Text>
                  </HStack>
                  <HStack space="md">
                    <Clock />
                    <Text className={activeTab !== "all" ? "text-red-500" : ""}>
                      7:00
                    </Text>
                    <Text className={activeTab !== "all" ? "text-red-500" : ""}>
                      -
                    </Text>
                    <Text className={activeTab !== "all" ? "text-red-500" : ""}>
                      8:00
                    </Text>
                  </HStack>
                  <HStack space="sm">
                    <CalendarDays />
                    <Text className={activeTab !== "all" ? "text-red-500" : ""}>
                      {item.day}
                    </Text>
                    <Text className={activeTab !== "all" ? "text-red-500" : ""}>
                      -
                    </Text>
                    <Text className={activeTab !== "all" ? "text-red-500" : ""}>
                      {item.date}
                    </Text>
                  </HStack>
                </VStack>
              </Card>
            )}
            estimatedItemSize={20}
          />
        </Box>
      </VStack>
    </SafeAreaView>
  );
}
