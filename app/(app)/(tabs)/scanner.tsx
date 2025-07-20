import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useScan } from "@/hooks/useScan";
import useUserStore, { getUser } from "@/store/userStore";
import { BarcodeScanningResult, Camera, CameraView } from "expo-camera";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ScannerScreen() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [barcodeData, setBarcodeData] = useState<string | null>(null);
  const cameraRef = useRef(null);
  const animationRef = useRef<LottieView>(null);
  const animationErrorRef = useRef<LottieView>(null);
  const {mutate:scanMutate} = useScan()

const user = useUserStore((state) => state.user);

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    setScanned(true);
    setBarcodeData(result.data);
    console.log("result", result.data);
    console.log('latitude', user?.location?.split(",")[0]);
    console.log('longitude', user?.location?.split(",")[1]);
    console.log('date_time', new Date().toISOString());
    scanMutate(
      {
        qr_token: result.data,
        date_time: new Date().toISOString(),
        latitude: user?.location?.split(",")[0] || "",
        longitude: user?.location?.split(",")[1] || "",
      },
      {
        onSuccess: (data) => {
          console.log("Scan successful:", result.data);
          setSuccess(true);
        },
        onError: (error: any) => {
          console.log("error", error.response.data.message);
          setErrorMsg(error.response.data.message);
        },
      }
    );
    
    setShowScanner(false);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
      setShowScanner(false);
    })();
  }, []);
  if (hasCameraPermission === false) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>No access to camera</Text>
      </SafeAreaView>
    );
  }
  useEffect(() => {
    if (scanned) {
      animationRef.current?.play();
    }
  }, [scanned]);
  useEffect(() => {
    return () => {
      setScanned(false);
    };
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box className="w-full h-full flex justify-center items-center">
        {scanned  ? (
            errorMsg ? 
                <VStack space="xs" className="items-center justify-center">
            <LottieView
              ref={animationErrorRef}
              source={require("@/assets/lotties/error.json")}
              autoPlay
              loop={true}
              style={{ width: 200, height: 200 }}
            />
            <Text className="text-red-500 text-lg text-center">{errorMsg}</Text>
          </VStack>
            :
            <Box>
            <LottieView
              ref={animationRef}
              source={require("@/assets/lotties/checkin.json")}
              autoPlay
              loop={true}
              style={{ width: 200, height: 200 }}
            />
            <Text className="text-center text-primary-960">
              Successfull Check-In
            </Text>
          </Box>
          
          
        ) : (
          <CameraView
            ref={cameraRef}
            style={{ width: 300, height: 300 }}
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
        )}
        
        {scanned && (
          <Pressable
            className="bg-primary-960 mt-2 px-5 py-2 rounded-md text-white"
            onPress={() => {
              setScanned(false);
            }}
          >
            <Text className="text-white ">Scan again</Text>
          </Pressable>
        )}
      </Box>
    </SafeAreaView>
  );
}
