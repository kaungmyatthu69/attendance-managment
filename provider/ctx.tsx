import { signInApi, signUpApi } from "@/api/auth";
import { useStorageState } from "@/hooks/useStorageState";
import { QueryClient, useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useState, type PropsWithChildren } from "react";
import { router } from "expo-router";
import useUserStore from "@/store/userStore";
const AuthContext = createContext<{
  signIn: (formState: FormStateProps) => Promise<void>;
  signUp: (formState: FormStateProps) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}>({
  signIn: async () => {},
  signOut: () => null,
  signUp: async () => {},
  session: null,
  isLoading: false,
  error: null,
  clearError: () => null,
});

// This hook can be used to access the user info.
export function   useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

type FormStateProps = {
  name:string;
  email: string;
  password: string;
  confirmPassword?: string; // Optional for sign-in
  classCode?: string;
};

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [error, setError] = useState(null);
  const  { setUser} = useUserStore()
  const signInMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signInApi({ email, password }),
    onSuccess: async (data: any) => {
      console.log("Sign in success:", data);
      await SecureStore.setItemAsync("token", data.token);
      setUser({
        id:data.user.id,
        name:data.user.name,
        email:data.user.email
      })
      
      setSession("xxx");
       router.replace("/");
      // Optionally, you can reset the error state on successful sign-in
      
    },
    onError: (error: any) => {
      console.log("Sign in error:", error.message);
      setError(error.message || "An error occurred during sign in");
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (formState: {
      name:string;
      email: string;
      password: string;
      password_confirmation: string;
      registration_code: string;
    }) => signUpApi(formState),
    onSuccess: async (data: any) => {
      console.log("Sign up success:", data);
      await SecureStore.setItemAsync("token", data.token);
      setSession("xxx");
        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
        });

    },
    onError: (error: any) => {
      console.log("Sign up error:", error.message);
      setError(
        error.response.data.message || "An error occurred during sign in"
      );
    },
  });

  const signIn = async (formState: FormStateProps): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const { email, password } = formState;
      signInMutation.mutate(
        { email, password },
        {
          onSuccess: async (data: any) => {
            console.log("Sign in success:", data);
            await SecureStore.setItemAsync("token", data.token);
            setSession("xxx");
            resolve();
          },
          onError: (error: any) => {
            console.log("Sign in error:", error.message);
            reject(error);
          },
        }
      );
    });
  };

  const signUp = async (formState: FormStateProps): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      // Ensure classcode is provided for signup
      if (!formState.classCode) {
        reject(new Error("Class code is required for signup"));
        return;
      }

      // Now we know classcode exists, so we can safely cast
      const signUpData = {
        name: formState.name, // Assuming name is required for sign up
        email: formState.email,
        password: formState.password,
        password_confirmation: formState.confirmPassword, // Assuming password confirmation is the same as password
        registration_code: formState.classCode,
      };

      signUpMutation.mutate(signUpData, {
        onSuccess: async (data: any) => {
          console.log("Sign up success:", data);
          await SecureStore.setItemAsync("token", data.token);
          setSession("xxx");
          router.replace("/");
          resolve();
        },
        onError: (error: any) => {
          console.log("Sign up error:", error.message);
          reject(error);
        },
      });
    });
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("token");
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        session,
        isLoading: signInMutation.isPending || signUpMutation.isPending,
        error: error ,
        clearError:()=> { setError(null)}  
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
