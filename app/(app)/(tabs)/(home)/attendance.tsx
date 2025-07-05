import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const tabs = [
  { key: "all", label: "All" },
  { key: "absence", label: "Absence" },
];

export default function Attendance() {
  const [activeTab, setActiveTab] = useState("all");

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
        <Box className="flex-row bg-gray-200 shadow-xs   rounded-xl m-4 p-1">
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
              {activeTab === tab.key && (
                <View className="absolute left-5 right-5 bottom-1 h-1 rounded bg-primary-960" />
              )}
            </Pressable>
          ))}
        </Box>
        <Box style={{ flex: 1 }}>
          <FlashList
            showsVerticalScrollIndicator={false}
            data={Array.from({ length: 5 })}
            renderItem={({ item }) => (
              <Card className="mt-3">
                <VStack space="xs">
                  <HStack className="justify-between items-center ">
                    <Text className="text-lg font-semibold">Class1</Text>
                    <Text>Daw Than Than Soe</Text>
                  </HStack>
                  <Text className="text-primary-960">Yangon , Hleden</Text>
                  <HStack space="md">
                    <Text>7:00</Text>
                    <Text>-</Text>
                    <Text>8:00</Text>
                  </HStack>
                  <HStack space="sm">
                    <Text>Mon</Text>
                    <Text>-</Text>
                    <Text>Tue</Text>
                    <Text>-</Text>
                    <Text>Wed</Text>
                    <Text>-</Text>
                    <Text>Thu</Text>
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
