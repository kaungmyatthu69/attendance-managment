import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
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
import { SafeAreaView } from "react-native-safe-area-context";
export default function Classrooms() {
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
            <Text className="text-lg font-bold text-center">Classrooms</Text>
          </Box>
        </HStack>
        <Box style={{ flex: 1 }}>
          <FlashList
            showsVerticalScrollIndicator={false}
            data={Array.from({ length: 5 })}
            renderItem={({ item , index }) => (
              <Card className="mt-3  space-y-4">
                <VStack space="md">
                  <VStack space="md" className="justify-between  ">
                    <Text className="text-lg font-semibold">Class {index+1}</Text>
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
