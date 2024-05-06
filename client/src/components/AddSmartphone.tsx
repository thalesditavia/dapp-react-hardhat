import { useRecoilState } from "recoil";

import SmartphoneForm from "./SmartphoneForm";

import { contractState } from "../atom/contractState";
import { providerState } from "../atom/providerState";

import type { FormInputsI } from "../types/interfaces";

function AddSmartphoneView() {
  const [contract] = useRecoilState(contractState);
  const [provider] = useRecoilState(providerState);

  const txIsPending = async (txHash: string) => {
    return (await provider?.getTransactionReceipt(txHash)) == null;
  };

  const addSmartphones = async ({ marca, modelo }: FormInputsI) => {
    if (contract) {
      try {
        const tx = await contract.adicionaCelular(marca, modelo);
        const txHash = (await tx.wait()).hash as string;
        const pending = await txIsPending(txHash);

        if (pending) {
          return "Pending";
        } else {
          return "Success";
        }
      } catch (err) {
        console.log(err);
        return "Error! Confira console.log";
      }
    }
  };

  return (
    <>
      <SmartphoneForm onSubmitAction={addSmartphones} />
    </>
  );
}

export default AddSmartphoneView;
