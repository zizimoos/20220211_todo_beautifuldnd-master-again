import { atom } from "recoil";

const localData = localStorage.getItem("TODO_LIST");
const TODO_LIST = localData ? JSON.parse(localData) : {};

interface ITodoListState {
  [key: string]: string[];
}

export const todoListState = atom<ITodoListState>({
  key: "todoState",
  default: {
    TODO: TODO_LIST["TODO"] || [],
    DOIN: TODO_LIST["DOIN"] || [],
    DONE: TODO_LIST["DONE"] || [],
  },
});
