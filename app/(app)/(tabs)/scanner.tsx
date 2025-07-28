import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useScan } from "@/hooks/useScan";
import useUserStore from "@/store/userStore";
import { useQueryClient } from "@tanstack/react-query";
import { BarcodeScanningResult, Camera, CameraView } from "expo-camera";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type ScanStatus = "IDLE" | "LOADING" | "SUCCESS" | "ERROR";

export default function ScannerScreen() {
  const [status, setStatus] = useState<ScanStatus>("IDLE");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);

  const cameraRef = useRef<CameraView>(null);
  const animationRef = useRef<LottieView>(null);
  const animationErrorRef = useRef<LottieView>(null);

  const { mutate: scanMutate, isPending } = useScan();
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    setStatus("LOADING");
    scanMutate(
      {
        qr_token: result.data,
        date_time: new Date().toISOString(),
        latitude: user?.location?.split(",")[0] ?? "",
        longitude: user?.location?.split(",")[1] ?? "",
      },
      {
        onSuccess: (data) => {
          console.log("Scan successful:", data);
          setStatus("SUCCESS");
          queryClient.invalidateQueries({ queryKey: ["attendances"] });
        },
        onError: (error: any) => {
          const message =
            error.response?.data?.message ?? "An unknown error occurred.";
          console.log("scanner error", message);
          setErrorMsg(message);
          setStatus("ERROR");
        },
      }
    );
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    };
    requestPermissions();
  }, []);

  useEffect(() => {
    if (status === "SUCCESS") {
      animationRef.current?.play();
    } else if (status === "ERROR") {
      animationErrorRef.current?.play();
    }
  }, [status]);

  const handleScanAgain = () => {
    setStatus("IDLE");
    setErrorMsg(null);
  };

  if (hasCameraPermission === null) {
    // Waiting for permission
    return <SafeAreaView style={{ flex: 1 }} />;
  }

  if (hasCameraPermission === false) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>No access to camera</Text>
      </SafeAreaView>
    );
  }

  const renderContent = () => {
    switch (status) {
      case "LOADING":
        return <Text className="text-center">Loading...</Text>;
      case "SUCCESS":
        return (
          <Box className="items-center">
            <LottieView
              ref={animationRef}
              source={require("@/assets/lotties/checkin.json")}
              autoPlay
              loop={false}
              style={{ width: 200, height: 200 }}
            />
            <Text className="text-center text-primary-960">
              Successful Check-In
            </Text>
          </Box>
        );
      case "ERROR":
        return (
          <VStack space="xs" className="items-center justify-center">
            <LottieView
              ref={animationErrorRef}
              source={require("@/assets/lotties/error.json")}
              autoPlay
              loop={false}
              style={{ width: 200, height: 200 }}
            />
            <Text className="text-red-500 text-lg text-center">{errorMsg}</Text>
          </VStack>
        );
      case "IDLE":
      default:
        return (
          <CameraView
            ref={cameraRef}
            style={{ width: 300, height: 300 }}
            facing="back"
            onBarcodeScanned={isPending ? undefined : handleBarCodeScanned}
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
        );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box className="w-full h-full flex justify-center items-center">
        {renderContent()}

        {status !== "IDLE" && (
          <Pressable
            className="bg-primary-960 mt-2 px-5 py-2 rounded-md"
            onPress={handleScanAgain}
          >
            <Text className="text-white">Scan again</Text>
          </Pressable>
        )}
      </Box>
    </SafeAreaView>
  );
}
