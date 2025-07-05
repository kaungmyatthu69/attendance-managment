import { ScrollView, StyleSheet } from "react-native";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useSession } from "@/provider/ctx";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const { signOut } = useSession();
  const handleLogout = async() => {
    await signOut();
  };
  return (
    <SafeAreaView className=" p-5">
      <HStack className="flex gap-16 items-center relative">
        <Pressable
          className="flex items-center flex-row gap-2"
          onPress={() => router.back()}
        >
          <ChevronLeft />
          <Text>Back</Text>
        </Pressable>
        <Text className="text-lg absolute left-1/2 -translate-x-1/2  font-bold text-center">
          Profile
        </Text>
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="px-8 pb-16 mt-10">
          <VStack space="sm" className="mx-auto items-center">
            <Avatar size="2xl" className="mb-4">
              <AvatarImage
                source={{
                  uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                }}
              />
              {/* <AvatarFallbackText>Kaung Myat</AvatarFallbackText> */}
            </Avatar>
            <Text className="text-lg font-bold text-primary-960">
              Kaung Myat
            </Text>
            <Text className="text-gray-400 text-sm font-semibold">
              Student Id: 12345
            </Text>
          </VStack>
        </Box>
        <Card className="mb-32">
          <VStack space="md">
            <Text className="text-lg font-bold">Personal Information</Text>
            <VStack space="xs">
              <Text className="font-semibold text-typography-black">Email</Text>
              <Text className="text-gray-400 text-sm">Kaung@gmail.com</Text>
            </VStack>
            <VStack space="xs">
              <Text className="font-semibold text-typography-black">Phone</Text>
              <Text className="text-gray-400 text-sm">+95 09788999</Text>
            </VStack>
            <VStack space="xs">
              <Text className="font-semibold text-typography-black">
                Address
              </Text>
              <Text className="text-gray-400 text-sm">Yangon</Text>
            </VStack>
            <Divider className="my-2" />
            <Text className="text-lg font-bold">Settings</Text>
            <HStack space="xs" className="items-center justify-between">
              <Text className="font-semibold text-typography-black">
                App Version
              </Text>
              <Text className="text-gray-400 text-sm">0.0.887</Text>
            </HStack>
            <HStack space="md" className="items-center  text-red-400">
              {/* <Text className="font-semibold text-red-400">
              App Version
            </Text> */}
              <Pressable onPress={handleLogout}>
                <Text className="text-red-400">Logout</Text>
              </Pressable>
            </HStack>
          </VStack>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
