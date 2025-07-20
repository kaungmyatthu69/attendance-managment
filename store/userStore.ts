import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// User object structure
interface User {
  id: string;
  name: string;
  email: string;
  location?: string;
  // Add more fields as needed
}

interface State {
  user: User | undefined;
}

interface Actions {
  setUser: (user: User) => void;
  clearUser: () => void;
  setLocation: (location: string) => void;
}

const initialState: State = {
  user: undefined,
};

const useUserStore = create<State & Actions>()(
  immer((set) => ({
    ...initialState,
    setUser: (user: User) => {
      set((state) => {
        state.user = user;
      });
    },
    clearUser: () => {
      set((state) => {
        state.user = undefined;
      });
    },
    setLocation: (location: string) => {
      set((state) => {
        if (state.user) {
          state.user.location = location;
        } else {
          // Auto-create a user if not initialized
          state.user = {
            id: "",
            name: "",
            email: "",
            location,
          };
        }
      });
    },
  }))
);

// Example selector usage
export const getUser = (state: State) => state.user;

export default useUserStore;
