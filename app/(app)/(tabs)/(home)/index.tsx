import AttendanceSvg from "@/assets/images/Attendance.svg";
import ClassroomSvg from "@/assets/images/Class Room.svg";
import CurrentClassSvg from "@/assets/images/CurrentClassInfo.svg";
import TimetableSvg from "@/assets/images/Timetable.svg";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import useUserStore, { getUser } from "@/store/userStore";
import { BarcodeScanningResult, CameraView } from "expo-camera";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Static image map for dynamic usage
// const imageMap = {
//   Timetable: require("@/assets/images/Timetable.svg"),
//   Attendance: require("@/assets/images/Attendance-color.svg"),
//   Exam: require("@/assets/images/Exam.svg"),
//   Classroom: require("@/assets/images/Class Room.svg"),
//   Home: require("@/assets/images/Home.png"),
//   // Add more as needed
// };

const svgMap = {
  Timetable: TimetableSvg,
  Attendance: AttendanceSvg,
  CurrentClass: CurrentClassSvg,
  Classroom: ClassroomSvg,
};

const data = [
  {
    id: 1,
    imageKey: "Timetable",
    name: "Time Table",
    description: "View your class schedule",
    route: "/timetable",
  },
  {
    id: 2,
    imageKey: "Attendance",
    name: "Attendance",
    description: "Mark your attendance for classes",
    route: "/attendance",
  },
  {
    id: 3,
    imageKey: "Classroom",
    name: "Classrooms",
    description: "View and submit assignments",
    route: "/classrooms",
  },
  {
    id: 4,
    imageKey: "CurrentClass",
    name: "Current Class",
    description: "Check exam schedules and results",
    route: "/currentClass",
  },
];
export default function HomeScreen() {
  const [locations, setLocations] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [barcodeData, setBarcodeData] = useState<string | null>(null);
  const cameraRef = useRef(null);
  const { setLocation } = useUserStore();
   
  const user = useUserStore(getUser)
  useEffect(() => {
    if (locations) {
      setLocation(
        `${locations.coords.latitude}, ${locations.coords.longitude}`
      );
    }
  }, [locations, setLocation]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocations(location);
    })();
  }, []);

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    setScanned(true);
    setBarcodeData(result.data);
    console.log("result", result);
    setShowScanner(false);
  };

  let locationText = "Waiting for location...";
  if (errorMsg) {
    locationText = errorMsg;
  } else if (locations) {
    locationText = `Lat: ${locations?.coords.latitude}, Lon: ${locations?.coords.longitude}`;
  }

  if (showScanner) {
    if (hasCameraPermission === false) {
      return (
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No access to camera</Text>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing={"back"}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: [
              "qr",
              "ean13",
              "ean8",
              "code39",
              "code128",
              "upc_a",
              "upc_e",
              "pdf417",
              "itf14",
              "datamatrix",
            ],
          }}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </SafeAreaView>
    );
  }
  const handleRoute = (route: string) => {
    if (typeof route === "string") {
      router.navigate(route as any);
    }
  };
  return (
    <SafeAreaView>
      <HStack className="p-5">
        <Box className="mb-4   rounded-lg p-4">
          <Text className="text-2xl font-bold">
            Welcome <Text className="text-primary-960">{user?.name} !</Text>
          </Text>
        </Box>
      </HStack>
      <Box className="w-full p-5  flex-row items-center  flex-wrap justify-between mt-16">
        {data.map((item) => (
          <Pressable
            key={item.id}
            className="w-[48%] mb-5"
            onPress={() => handleRoute(item.route)}
          >
            <Card className="w-full flex items-center rounded-lg gap-7">
              {svgMap[item.imageKey as keyof typeof svgMap] ? (
                React.createElement(
                  svgMap[item.imageKey as keyof typeof svgMap],
                  { width: 60, height: 60, color: "#2C7fff" }
                )
              ) : (
                <Image
                  source={require("@/assets/images/Home.png")}
                  alt="image"
                  className="h-8 w-8"
                  resizeMode="contain"
                />
              )}
              <Text className="text-lg font-medium">{item.name}</Text>
            </Card>
          </Pressable>
        ))}
      </Box>
    </SafeAreaView>
  );
}
