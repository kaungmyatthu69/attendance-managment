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
  const { signIn, signUp, isLoading, error, clearError } = useSession();
  const [isLogin, setIsLogin] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => !showState);
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name:"",
      email: "",
      password: "",
      confirmPassword: "",
      classCode: "",
    },
  });

  // Watch password field for confirmation validation
  const password = watch("password");

  const onSubmit = async (formState: any) => {
    if (isLogin) {
      delete formState.classCode;
      delete formState.confirmPassword;
      delete formState.name;
    }
    console.log("Submitting form state:", formState);

    if (isLogin) {
      await signIn(formState);
    } else {
      await signUp(formState);
    }
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
                Enter your email {isLogin ? "" : ",Class code "} and password to{" "}
                {isLogin ? "login" : "sing up"}
              </Text>
            </VStack>

            {/* Error Message Display */}
            {error && (
              <VStack
                space="xs"
                className="bg-red-50 p-3 rounded-lg border border-red-200"
              >
                <Text className="text-red-600 font-medium text-center">
                  {error}
                </Text>
              </VStack>
            )}

            <FormControl size="md">
              {!isLogin && (
                <VStack space="xs" className="mb-5">
                  <FormControlLabel>
                    <FormControlLabelText className="text-lg font-semibold text-gray-500">
                      Student Name
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Controller
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "This is required.",
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        className="h-16 rounded-lg border-gray-200 bg-white"
                        size="xl"
                      >
                        <InputField
                          placeholder="Enter your name"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                        />
                      </Input>
                    )}
                    name="name"
                  />
                  {errors.name && (
                    <Text className="text-red-400">{errors.name.message}</Text>
                  )}
                </VStack>
              )}
              <VStack space="xs">
                <FormControlLabel>
                  <FormControlLabelText className="text-lg font-semibold text-gray-500">
                    Email
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "This is required.",
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format.",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      className="h-16 rounded-lg border-gray-200 bg-white"
                      size="xl"
                    >
                      <InputField
                        placeholder="Enter your email"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    </Input>
                  )}
                  name="email"
                />
                {errors.email && (
                  <Text className="text-red-400">{errors.email.message}</Text>
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
                    required: {
                      value: true,
                      message: "Password is required.",
                    },
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters.",
                    },
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
              </VStack>
              {!isLogin && (
                <VStack space="xs" className="mt-5">
                  <FormControlLabel>
                    <FormControlLabelText className="text-lg font-semibold text-gray-500">
                      Confirm Password
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Controller
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Please confirm your password.",
                      },
                      validate: (value) => {
                        if (value !== password) {
                          return "Passwords do not match.";
                        }
                        return true;
                      },
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
                        />
                        <InputSlot className="pr-3" onPress={handleState}>
                          <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                        </InputSlot>
                      </Input>
                    )}
                    name="confirmPassword"
                  />
                  {errors.confirmPassword && (
                    <Text className="text-red-500">
                      {errors.confirmPassword?.message}
                    </Text>
                  )}
                </VStack>
              )}
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
                      required: {
                        value: true,
                        message: "Class code is required.",
                      },
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
                    name="classCode"
                  />
                  {errors.classCode && (
                    <Text className="text-red-500">
                      {errors.classCode?.message}
                    </Text>
                  )}
                </VStack>
              )}
            </FormControl>
            {/* <Text size="md" bold className="text-right text-blue-500">
            Forgot password ?
          </Text> */}
            <Button
              className={`h-16 rounded-lg ${
                isLoading ? "bg-gray-400" : "bg-primary-960"
              }`}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              <ButtonText className="text-lg font-bold">
                {isLoading ? "Loading..." : isLogin ? "Log In" : "Sign Up"}
              </ButtonText>
            </Button>
            <Pressable
              onPress={() => {
                setIsLogin((value) => !value);
                error && clearError(); // Clear error when switching
              }}
              disabled={isLoading}
            >
              {!isLogin ? (
                <Text className="text-center">
                  Already have account?
                  <Text className="text-primary-960">Sign In</Text>
                </Text>
              ) : (
                <Text className="text-center">
                  Don't have account?
                  <Text className="text-primary-960">Sign Up</Text>
                </Text>
              )}
            </Pressable>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
