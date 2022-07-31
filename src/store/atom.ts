import { atom } from "recoil";
import { getUserToken } from "./storage";

export const isLoggedInAtom = atom({
  key: "isLoggedInAtom",
  default: getUserToken() !== "",
});
