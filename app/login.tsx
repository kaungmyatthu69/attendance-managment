import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useSession } from "@/provider/ctx";

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { signIn } = useSession();
  const [isLogin,setIsLogin] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => !showState);
  };

  // const register = () => {
  //   signIn();
  //   // Navigate after signing in. You may want to tweak this to ensure sign-in is
  //   // successful before navigating.
  //   router.replace("/");
  // };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      password: "",
      classcode:''
    },
  });

  const onSubmit = async (formState: any) => {
    // Do something with the form state
    console.log("Submitting form state:", formState);
    await signIn(formState);

    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <HStack space="xs" className="mt-3 items-center justify-end">
            <Image
              source={require("@/assets/images/react-logo.png")}
              alt="shop-logo"
              className="h-8 w-8"
            />
            <Text size="xl" bold>
              Attendance Tracker
            </Text>
          </HStack>
          <VStack space="4xl">
            <VStack space="lg">
              <Heading size="3xl" bold className="leading-snug">
                Sign {isLogin ? "in" : "up"} {"\n"}to your Account
              </Heading>
              <Text size="lg" className="font-semibold text-gray-500">
                Enter your phone {isLogin ?'':',Class code '} and password  to {isLogin ? "login" : "sing up"}
              </Text>
            </VStack>
            <FormControl size="md">
              <VStack space="xs">
                <FormControlLabel>
                  <FormControlLabelText className="text-lg font-semibold text-gray-500">
                    Phone Number
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "This is required.",
                    },
                    minLength: {
                      value: 7,
                      message: "Phone number should be at least 7 digits.",
                    },
                    pattern: {
                      value: /^09[0-9]{9}$/,
                      message: "Phone number should be numeric.",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      className="h-16 rounded-lg border-gray-200 bg-white"
                      size="xl"
                    >
                      <InputField
                        placeholder="097******78"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        inputMode="numeric"
                        maxLength={12}
                      />
                    </Input>
                  )}
                  name="phone"
                />
                {errors.phone && (
                  <Text className="text-red-400">{errors.phone.message}</Text>
                )}
              </VStack>
              <VStack space="xs" className="mt-5">
                <FormControlLabel>
                  <FormControlLabelText className="text-lg font-semibold text-gray-500">
                    Password
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      className="h-16 rounded-lg border-gray-200 bg-white"
                      size="xl"
                    >
                      <InputField
                        placeholder="********"
                        type={showPassword ? "text" : "password"}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        maxLength={8}
                      />
                      <InputSlot className="pr-3" onPress={handleState}>
                        <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                      </InputSlot>
                    </Input>
                  )}
                  name="password"
                />
                {errors.password && (
                  <Text className="text-red-500">
                    {errors.password.message}
                  </Text>
                )}

                <FormControlHelper>
                  <FormControlHelperText>
                    Must be 8 digits.
                  </FormControlHelperText>
                </FormControlHelper>
              </VStack>
              {isLogin === false && (
                <VStack space="xs" className="mt-5">
                  <FormControlLabel>
                    <FormControlLabelText className="text-lg font-semibold text-gray-500">
                      Class Code
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        className="h-16 rounded-lg border-gray-200 bg-white"
                        size="xl"
                      >
                        <InputField
                          placeholder="####"
                          type="text"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                        />
                      </Input>
                    )}
                    name="classcode"
                  />
                  {errors.password && (
                    <Text className="text-red-500">
                      {errors.password.message}
                    </Text>
                  )}

                  <FormControlHelper>
                    <FormControlHelperText>
                      Must be 8 digits.
                    </FormControlHelperText>
                  </FormControlHelper>
                </VStack>
              )}
            </FormControl>
            {/* <Text size="md" bold className="text-right text-blue-500">
            Forgot password ?
          </Text> */}
            <Button
              className="h-16 rounded-lg bg-primary-960"
              onPress={handleSubmit(onSubmit)}
            >
              <ButtonText className="text-lg font-bold">
                {isLogin ? "Log In" : "Sing Up"}
              </ButtonText>
            </Button>
            <Pressable
              onPress={() => {
                setIsLogin((value) => !value);
              }}
            >
              {!isLogin ? (
                <Text className="text-center">
                  Already have account?
                  <Text className="text-primary-960">Sing In</Text>
                </Text>
              ) : (
                <Text className="text-center">
                  Don't have account?
                  <Text className="text-primary-960">Sing Up</Text>
                </Text>
              )}
            </Pressable>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
