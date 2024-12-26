import { create } from "zustand";

type State = {
  inputAddress: string;
};

const globalStore = create<State>(() => ({
  inputAddress: "",
}));

export default globalStore;
