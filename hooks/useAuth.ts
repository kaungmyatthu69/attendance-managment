import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { signInApi, signOut } from "@/api/auth";
import { router } from "expo-router";

export function useSignIn() {
  

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signInApi({email, password}),
    onSuccess: async (data: any) => {
      console.log("consoledata", data);
      await SecureStore.setItemAsync("token", data.token);
      router.replace('/')

      // Optionally: queryClient.invalidateQueries(['user'])
    },
    onError:(error:any)=>{
      console.log('error',error.message)
    }
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOut,
    onSuccess: async () => {
      await SecureStore.deleteItemAsync("token");
      // Optionally: queryClient.clear()
    },
  });
}
