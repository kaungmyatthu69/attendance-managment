import { useContext, createContext, type PropsWithChildren } from "react";
import * as SecureStore from "expo-secure-store";
import { useStorageState } from "@/hooks/useStorageState";
import { fetchApi } from "@/api";
const AuthContext = createContext<{
  signIn: (formState: FormStateProps) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
 
  return value;
}

type FormStateProps = {
  phone: string;
  password: string;
};
export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (formState: FormStateProps) => {
          console.log('this is sing in function')
          setSession('xxxx')
         
        },
        signOut: async () => {
          try {
            // await SecureStore.deleteItemAsync("token");
            // await SecureStore.deleteItemAsync("refreshToken");
            // await SecureStore.deleteItemAsync("randToken");
            setSession(null);
          } catch (error) {
            console.log(error);
          }
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
