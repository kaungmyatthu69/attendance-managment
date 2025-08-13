import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useGetAllClasses } from "@/hooks/useClasses";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import {
  CalendarDays,
  CalendarFold,
  ChevronLeft,
  Clock,
  MapPin,
  User,
} from "lucide-react-native";
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Classrooms() {
  const { data, isLoading } = useGetAllClasses();
  const animationRef = useRef<LottieView>(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack space="md" className="p-5  " style={{ flex: 1 }}>
        <HStack className="flex  items-center gap-16">
          <Pressable
            className="flex items-center flex-row gap-2"
            onPress={() => router.back()}
          >
            <ChevronLeft />
            <Text>Back</Text>
          </Pressable>
          <Box>
            <Text className="text-lg font-bold text-center">My Classes</Text>
          </Box>
        </HStack>
        {isLoading && (
          <Box className="flex-1 items-center justify-center">
            <LottieView
              ref={animationRef}
              source={require("@/assets/lotties/Loading.json")}
              autoPlay
              loop={true}
              style={{ width: 180, height: 180 }}
            />
          </Box>
        )}
        {!isLoading && data.all_classes?.length === 0 && (
          <Box className="flex-1 items-center justify-center">
            <Text>No Classes Available</Text>
          </Box>
        )}
        {!isLoading && data.all_classes?.length > 0 && (
          <Box style={{ flex: 1 }}>
            <FlashList
              showsVerticalScrollIndicator={false}
              data={data.all_classes}
              renderItem={({ item, index }) => (
                <Card
                  className={`mt-3  ${
                    data.all_classes.length - 1 === index ? "mb-20" : ""
                  }`}
                >
                  <VStack space="md">
                    <VStack space="md" className="justify-between">
                      <Text className="text-lg font-semibold">
                        {item.class_name
                          ? item.class_name
                          : `Class ${index + 1}`}
                      </Text>
                      <HStack space="md">
                        <User />
                        <Text>{item.teacher ? item.teacher : "N/A"}</Text>
                      </HStack>
                    </VStack>
                    <HStack space="sm">
                      <MapPin />
                      <Text>{item.location}</Text>
                    </HStack>
                    <HStack space="md" className="flex  items-center">
                      <Clock />
                      <Text>{item.time}</Text>
                    </HStack>
                    <HStack space="sm">
                      <CalendarDays />
                      <Text>{item.day_of_week}</Text>
                    </HStack>
                    <HStack space="sm">
                      <CalendarFold />
                      <Text>{item.from_date}</Text>
                      <Text>to</Text>
                      <Text>{item.to_date}</Text>
                    </HStack>
                  </VStack>
                </Card>
              )}
              estimatedItemSize={20}
            />
          </Box>
        )}
      </VStack>
    </SafeAreaView>
  );
}
