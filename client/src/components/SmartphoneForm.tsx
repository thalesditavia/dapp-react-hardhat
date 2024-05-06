import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import AlertModal from "./AlertModal";
import Btn from "./Btn";
import BtnModal from "./BtnModal";

import { smartphoneFormSchema } from "../validators/smartphoneForm";

interface SmartphoneFormI {
  onSubmitAction: Function;
}

interface FormInputsI {
  marca: string;
  modelo: string;
}

const SmartphoneForm = ({ onSubmitAction }: SmartphoneFormI) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputsI>({
    resolver: zodResolver(smartphoneFormSchema),
  });
  const [transactionError, setTransactionError] = useState("");
  const [transactionPending, setTransactionPending] = useState("");
  const [successModal, setSuccessModal] = useState(false);

  const onSubmit: SubmitHandler<FormInputsI> = async (data) => {
    const funcResult = await onSubmitAction(data);

    if (funcResult === "Pending") {
      setTransactionPending(funcResult);
    } else if (funcResult === "Success") {
      setSuccessModal(true);
    } else {
      setTransactionError(funcResult);
    }

    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="border-2 border-solid border-slate-900 p-3 flex flex-col gap-6 px-12 py-6">
          <legend className="p-4">Celular</legend>
          <label>
            Marca
            <input
              type="text"
              {...register("marca", { required: true, maxLength: 20 })}
            />
            <span className="max-[500px]:text-xs">{errors.marca?.message}</span>
          </label>
          <label>
            Modelo
            <input
              type="text"
              {...register("modelo", { required: true, maxLength: 20 })}
            />
            <span className="max-[500px]:text-xs">
              {errors.modelo?.message}
            </span>
          </label>
        </fieldset>
        <div className="flex gap-7 justify-center mt-6">
          <Btn isLink={true} to="/">
            Cancelar
          </Btn>
          <Btn btnType="submit">Adicionar</Btn>
        </div>
      </form>
      {transactionPending && <p>Carregando...</p>}
      {transactionError && <p>{transactionError}</p>}
      {successModal && (
        <AlertModal modalType="success">
          <h2 className="text-lg ">Celular adicionado com sucesso!</h2>
          <div className="flex justify-center gap-10 mt-4">
            <BtnModal isLink={true} to="/">
              Voltar
            </BtnModal>
            <BtnModal isLink={false} btnFunc={() => setSuccessModal(false)}>
              Adicionar outro
            </BtnModal>
          </div>
        </AlertModal>
      )}
    </div>
  );
};

export default SmartphoneForm;
