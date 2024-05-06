import { atom } from "recoil";

import type { BrowserProvider } from "ethers";

export const providerState = atom<null | BrowserProvider>({
  key: "providerState",
  default: null,
});
