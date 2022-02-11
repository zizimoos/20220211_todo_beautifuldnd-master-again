import { atom } from "recoil";

const localData = localStorage.getItem("TODO_LIST");
const TODO_LIST = localData ? JSON.parse(localData) : {};

export interface ITodo {
  id: number;
  text: string;
}

interface ITodoListState {
  [key: string]: ITodo[];
}

export const todoListState = atom<ITodoListState>({
  key: "todoState",
  default: {
    TODO: TODO_LIST["TODO"] || [],
    DOIN: TODO_LIST["DOIN"] || [],
    DONE: TODO_LIST["DONE"] || [],
    DUST: TODO_LIST["DUST"] || [],
  },
});
