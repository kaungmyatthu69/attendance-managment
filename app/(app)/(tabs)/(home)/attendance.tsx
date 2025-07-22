import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { useGetAllAttendances } from "@/hooks/useAttendance";
import NodataSVG from "@/assets/images/nodata.svg";
import {
  CalendarDays,
  ChevronLeft,
  Clock,
  MapPin,
  User,
  CircleCheck,
  CalendarCheck,
  Info,
} from "lucide-react-native";
import React, { useEffect, useState ,useRef } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
const tabs = [
  { key: "all", label: "All" },
  { key: "absence", label: "Absence" },
];

export default function Attendance() {
  const [activeTab, setActiveTab] = useState("all");
  const  {data: attendances , isLoading} = useGetAllAttendances();
  const [allAttendances, setAllAttendances] = useState([]);
    const [currentClass, setCurrentClass] = useState<any | null>(null);
  const [classSessions,setClassSession] = useState([])
  const animationRef = useRef<LottieView>(null);

  useEffect(()=>{
    if(attendances && attendances.data.records){
      setAllAttendances(attendances.data.records);
      setCurrentClass(attendances.data.records[0] || null);
      setClassSession(attendances.data.records[0]?.sessions || []);
    }
  },[attendances,isLoading])

  useEffect(()=>{
    if(activeTab === "all"){
      setClassSession(currentClass?.sessions || []);  
    }
    else if(activeTab === "absence"){
      const absenceSessions = currentClass?.sessions?.filter((session: any) => 
        session.status === "absent"
      ) || [];
      setClassSession(absenceSessions);
    }
  },[
    currentClass, activeTab, allAttendances,
  ])

 

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
        {isLoading ? (
          <Box className="flex-1 items-center justify-center">
            <LottieView
              ref={animationRef}
              source={require("@/assets/lotties/Loading.json")}
              autoPlay
              loop={true}
              style={{ width: 180, height: 180 }}
            />
          </Box>
        ) : (
          <>
            {!isLoading && allAttendances.length > 0 ? (
              <>
                <FlashList
                  className=" mt-10 mb-5"
                  data={allAttendances}
                  estimatedItemSize={250}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  extraData={currentClass}
                  renderItem={({ item }) => {
                    // More robust comparison that handles different types and formats
                    const currentId = String(
                      currentClass?.class_id || ""
                    ).trim();
                    const itemId = String(item.class_id || "").trim();
                    const isSelected = currentId === itemId && currentId !== "";
                    return (
                      <Pressable
                        key={item.class_id}
                        className={`px-6 py-3 rounded-full mr-3 transition-colors duration-150  ease-out ${
                          isSelected ? "bg-blue-500" : "bg-white"
                        }`}
                        onPress={() => {
                          setCurrentClass(item);
                          setActiveTab("all"); // Reset to "all" tab when changing class
                        }}
                      >
                        <Text
                          className={`font-medium text-sm ${
                            isSelected ? "text-white" : "text-gray-700"
                          }`}
                        >
                          {item.class_name}
                        </Text>
                      </Pressable>
                    );
                  }}
                />
                <HStack>
                  <Text className="text-lg font-bold">
                    Percentage of attendance -{" "}
                    {currentClass?.attendance_percentage ?? 0}%
                  </Text>
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
                  {classSessions.length === 0 && !isLoading && (
                    <Box className="flex-1 items-center mt-20 justify-center">
                      <NodataSVG width={200} height={200} />
                      <Text className="text-gray-500 mt-2">
                        No attendance records found
                      </Text>
                    </Box>
                  )}
                  <FlashList
                    showsVerticalScrollIndicator={false}
                    data={classSessions}
                    renderItem={({ item, index }) => (
                      <Card
                        className={`mt-3 ${
                          classSessions.length - 1 === index ? "mb-20" : ""
                        }`}
                        key={index}
                      >
                        <VStack space="md">
                          <VStack space="md">
                            <Text className="text-lg font-semibold">
                              {currentClass.class_name}
                            </Text>
                            <HStack space="md" className="flex items-center">
                              <User />
                              <Text>{currentClass.teacher_name}</Text>
                            </HStack>
                          </VStack>
                          <HStack space="md" className="flex items-center">
                            <MapPin />
                            <Text>{currentClass.location}</Text>
                          </HStack>
                          <HStack space="md" className="flex items-center">
                            <Clock />
                            <Text
                              className={
                                activeTab !== "all" ? "text-red-500" : ""
                              }
                            >
                              {item.time}
                            </Text>
                          </HStack>
                          <HStack space="sm" className="flex items-center">
                            <CircleCheck />
                            <Text
                              className={
                                activeTab !== "all" ? "text-red-500" : ""
                              }
                            >
                              {item.date}
                            </Text>
                          </HStack>
                          <HStack space="sm" className="flex items-center">
                            <CalendarDays />
                            <Text
                              className={
                                activeTab !== "all" ? "text-red-500" : ""
                              }
                            >
                              {item.day_of_week}
                            </Text>
                          </HStack>
                          <HStack space="sm" className="flex items-center">
                            <CalendarCheck />
                            <Text
                              className={
                                activeTab !== "all" ? "text-red-500" : ""
                              }
                            >
                              {item.status}
                            </Text>
                          </HStack>
                        </VStack>
                      </Card>
                    )}
                    estimatedItemSize={20}
                  />
                </Box>
              </>
            ) : (
              <Box className="flex-1 items-center mt-20 justify-center">
                <NodataSVG width={200} height={200} />
                <Text className="text-gray-500 mt-2">
                  No attendance records found
                </Text>
              </Box>
            )}
          </>
        )}
      </VStack>
    </SafeAreaView>
  );
}
