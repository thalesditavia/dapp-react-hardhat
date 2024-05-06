import { useRecoilState } from "recoil";

import SmartphoneForm from "./SmartphoneForm";

import { contractState } from "../atom/contractState";
import { providerState } from "../atom/providerState";

interface FormInputsI {
  marca: string;
  modelo: string;
}

function AddSmartphoneView() {
  const [contract] = useRecoilState(contractState);
  const [provider] = useRecoilState(providerState);

  async function isPending(txHash: string) {
    return (await provider?.getTransactionReceipt(txHash)) == null;
  }

  const addSmartphones = async ({ marca, modelo }: FormInputsI) => {
    if (contract) {
      try {
        const transaction = await contract.adicionaCelular(marca, modelo);
        const transactionHash = (await transaction.wait()).hash as string;
        const pending = await isPending(transactionHash);

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
