import { writable } from "svelte/store";

import { KEY } from "@/constants";
import type { User } from "@/types";

export type UserStore = {
  user?: User;
};

const createUserStore = () => {
  const { set, update, subscribe } = writable<UserStore>({});

  const localData = localStorage.getItem(KEY);
  if (localData) {
    try {
      set(JSON.parse(localData));
    } catch {
      localStorage.removeItem(KEY);
    }
  }

  subscribe((data) => {
    localStorage.setItem(KEY, JSON.stringify(data));
  });

  return {
    set,
    update,
    subscribe,
    logout: () => {
      set({});
    },
    setUser: (user: User) => {
      update((data) => ({ ...data, user }));
    },
  };
};

const userStore = createUserStore();
export default userStore;
