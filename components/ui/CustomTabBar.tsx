import { Box } from "@/components/ui/box";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Pressable } from "@/components/ui/pressable";
import { ScanLine } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeSvg from "@/assets/images/home-line.svg"
import HomeSelectedSvg from "@/assets/images/home-selected.svg"
import ProfileLight from "@/assets/images/profile-light.svg"
import ProfileFilled from "@/assets/images/profile-selected.svg"
export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) {
  const insets = useSafeAreaInsets();
  return (
    <Box className="absolute left-0 right-0 bottom-0 items-center">
      {/* Tab Bar Background with curve */}
      <Box
        className="flex-row justify-between items-center bg-white  shadow-lg h-24 px-6 relative"
        style={{ elevation: 8 }}
      >
        {/* Home Tab */}
        <Pressable
          className="flex-1 items-center justify-center"
          onPress={() => navigation.navigate(state.routes[0].name)}
        >
          {/* <IconSymbol
            name="house.fill"
            size={28}
            color={state.index === 0 ? "#2C7fff" : "#B0B0B0"}
          /> */}
          {
            state.index === 0 ? (
              <HomeSelectedSvg width={30} height={30} />
            ) : (
              <HomeSvg width={38} height={38} />
            )
          }
          <Text
            className={`mt-1 text-xs ${
              state.index === 0 ? "text-[#2C7fff] font-bold" : "text-gray-400"
            }`}
          >
            Home
          </Text>
        </Pressable>
        {/* Spacer for FAB */}
        <View style={{ width: 64 }} />
        {/* Inbox Tab */}
        <Pressable
          className="flex-1 items-center justify-center"
          onPress={() => navigation.navigate(state.routes[1].name)}
        >
          {/* <IconSymbol
            name="person.fill"
            size={28}
            color={state.index === 1 ? "#2C7fff" : "#B0B0B0"}
          /> */}
          {
            state.index === 1 ? (
              <ProfileFilled width={38} height={38} />
            ) : (
              <ProfileLight width={38} height={38} />
            )
          }
          <Text
            className={`mt-1 text-xs ${
              state.index === 1 ? "text-[#2C7fff] font-bold" : "text-gray-400"
            }`}
          >
            Profile
          </Text>
        </Pressable>
      </Box>
      {/* Floating Action Button */}
      <Pressable
        className="absolute -top-9 left-1/2 backdrop-blur-md -translate-x-1/2 bg-[#2C7fff] rounded-3xl w-[60px] h-[60px] items-center justify-center shadow-xl "
        onPress={() => navigation.navigate(state.routes[2].name)}
      >
        <ScanLine size={38} color="#fff" />
      </Pressable>
    </Box>
  );
}
