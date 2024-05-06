import { atom } from "recoil";

import type { Contract } from "ethers";

export const contractState = atom<null | Contract>({
  key: "contractState",
  default: null,
});
