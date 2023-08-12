import { LOCALSTORAGE_KEY } from "@/constants";
import { writable } from "svelte/store";

const KEY = LOCALSTORAGE_KEY + "mjolnir";

type Data = {
  wallet: string;
}

const initialData: Data = {
  wallet: null,
};

const createStore = () => {
  let initial = JSON.parse(localStorage.getItem(KEY) || "null") || initialData;
  const { subscribe, set, update } = writable<Data>(initial);

  subscribe((current) => {
    localStorage.setItem(KEY, JSON.stringify(current));
  });

  return {
    subscribe,
    set,
    update,
    setWallet: (wallet) => update((current) => ({ ...current, wallet })),
    removeWallet: () => update((current) => ({ ...current, wallet: null })),
  };
};

const accounts = createStore();

export default accounts;
