import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useRef } from "react";
import { router } from "expo-router";
import {
  CalendarDays,
  CalendarFold,
  ChevronLeft,
  Clock,
  MapPin,
  User,
} from "lucide-react-native";
import TimeManagement from "@/assets/images/Timemanagement-pana.svg"
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { useGetCurrentClasses } from "@/hooks/useClasses";
import LottieView from "lottie-react-native";
export default function CurrentClass() {
  const {data,isLoading} = useGetCurrentClasses();
   const animationRef = useRef<LottieView>(null);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack space="md" className="p-5" style={{ flex: 1 }}>
        <HStack className="flex  items-center gap-16">
          <Pressable
            className="flex items-center flex-row gap-2"
            onPress={() => router.back()}
          >
            <ChevronLeft />
            <Text>Back</Text>
          </Pressable>
          <Box>
            <Text className="text-lg font-bold text-center">
              Current Class{" "}
            </Text>
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
        {!isLoading && data.current_classes?.length === 0 && (
          <Box className="flex-1 items-center justify-center">
            <Text>No Classes Available</Text>
          </Box>
        )}
        {!isLoading && data.current_classes?.length > 0 && (
          <Box style={{ flex: 1 }}>
            <FlashList
              showsVerticalScrollIndicator={false}
              data={data.current_classes}
              renderItem={({ item, index }) => (
                <Card className={`space-y-4 mt-5 w-full ${data.current_classes.length -1 == index ?'mb-20':''}`}  key={index}>
                  <VStack space="md">
                    <VStack space="md" className="justify-between">
                      <Text className="text-lg font-semibold">
                        {item.class_name}
                      </Text>
                      <HStack space="md">
                        <User />
                        <Text>{item.teacher}</Text>
                      </HStack>
                    </VStack>
                    <HStack space="sm">
                      <MapPin />
                      <Text>{item.location}</Text>
                    </HStack>
                    <HStack space="md">
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
