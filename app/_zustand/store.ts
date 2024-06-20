import { create } from "zustand";
import IUser, { ITrackToken } from "@/api/types/user.types";

export type State = {
  user: {
    address: string,
    token: string
  } | null
}

export type Actions = {
  setUser: (user: IUser | null) => void;
};

export const useAuthStore = create<State & Actions>((set) => ({
  user: {
    address: '',
    token: ''
  },
  setUser: (newUser) => {
    set((state) => {
      return { user: newUser };
    });
  },
}));
