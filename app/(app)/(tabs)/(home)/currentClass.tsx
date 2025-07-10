import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
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
export default function CurrentClass() {
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
        <Box className="flex-1 items-center justify-center">
          {/* <Image
            source={require("@/assets/images/Timemanagement-pana.png")}
            alt="image"
            size="2xl"
          /> */}
          <TimeManagement width={300} height={200} />
          
          <Card className="space-y-4 mt-10 w-full">
            <VStack space="md">
              <VStack space="md" className="justify-between">
                <Text className="text-lg font-semibold">Class 1</Text>
                <HStack space="md">
                  <User />
                  <Text>Daw Than Than Soe</Text>
                </HStack>
              </VStack>
              <HStack space="sm">
                <MapPin />
                <Text>Yangon , Hleden</Text>
              </HStack>
              <HStack space="md">
                <Clock />
                <Text>7:00</Text>
                <Text>-</Text>
                <Text>8:00</Text>
              </HStack>
              <HStack space="sm">
                <CalendarDays />
                <Text>Mon</Text>
                <Text>-</Text>
                <Text>Tue</Text>
                <Text>-</Text>
                <Text>Wed</Text>
                <Text>-</Text>
                <Text>Thu</Text>
              </HStack>
              <HStack space="sm">
                <CalendarFold />
                <Text>01-07-2025</Text>
                <Text>to</Text>
                <Text>02-09-2025</Text>
              </HStack>
            </VStack>
          </Card>
        </Box>
      </VStack>
    </SafeAreaView>
  );
}
