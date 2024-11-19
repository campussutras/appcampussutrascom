import { atom } from "recoil";
import { User } from "../../Pages/Profile/Profile";

export const isLoginAtom = atom({
  key: "isLoginAtom",
  default: false,
});

export const userAtom = atom({
  key: "userAtom",
  default: {} as User,
});

export const authLoadingAtom = atom({
  key: "authLoadingAtom",
  default: true, // Assume loading until the check is complete
});

export const isAdminAtom = atom({
  key: "isAdminAtom",
  default: false,
});
