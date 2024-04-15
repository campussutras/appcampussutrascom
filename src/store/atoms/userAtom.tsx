import { atom } from "recoil";

export const isLoginAtom = atom({
  key: "isLoginAtom",
  default: false,
});

export const userAtom = atom({
  key: "userAtom",
  default: {},
});
