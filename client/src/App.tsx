import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRecoilState } from "recoil";

import CelularContrato from "../../server/artifacts/contracts/Celular.sol/Celular.json";

import Btn from "./components/Btn";

import { contractState } from "./atom/contractState";
import { providerState } from "./atom/providerState";

import type { CelularI } from "./types/interfaces";

function App() {
  const [provider, setProvider] = useRecoilState(providerState);
  const [contract, setContract] = useRecoilState(contractState);

  const [smartphones, setSmarphones] = useState<CelularI[]>([]);

  const initializeProvider = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);

      setProvider(provider);
    }
  };

  const connectContract = async () => {
    if (provider) {
      const signer = await provider.getSigner();
      const ContractFactory = new ethers.Contract(
        "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
        CelularContrato.abi,
        signer
      );
      setContract(ContractFactory);
    }
  };

  const fetchSmartphones = async () => {
    if (contract) {
      const getSmartphones = contract.getFunction("retornaCelulares");
      const smartphones = (await getSmartphones()) as CelularI[];

      const parsedSmartphones = smartphones.map((c) => ({
        id: c.id,
        marca: c.marca,
        modelo: c.modelo,
      }));

      setSmarphones(parsedSmartphones);
    }
  };

  useEffect(() => {
    initializeProvider();
  }, []);

  useEffect(() => {
    connectContract();
  }, [provider]);

  useEffect(() => {
    fetchSmartphones();
  }, [contract]);
  //   if (contract) {
  //     console.log(contract);
  //     const addSmartphones = contract.getFunction("adicionaCelular");
  //     const getSmartphones = contract.getFunction("retornaCelulares");

  //     try {
  //       await addSmartphones("Apple", "Iphone");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //     const smartphones = (await getSmartphones()) as CelularI[];
  //     const parsedSmartphones = smartphones.map((c) => ({
  //       id: c.id,
  //       marca: c.marca,
  //       modelo: c.modelo,
  //     }));
  //     setSmarphones(parsedSmartphones);
  //   }
  // };

  return (
    <>
      {
        <div className="w-2/4 max-[600px]:w-full mt-20">
          <Btn isLink={true} to="/add">
            Adicionar Celular
          </Btn>
        </div>
      }
      {smartphones.length === 0 ? (
        <p className="text-center">Nenhum celular cadastrado.</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-3/4 mx-auto mb-6">
            <thead className="bg-slate-400">
              <tr>
                <th>Marca</th>
                <th>Modelo</th>
              </tr>
            </thead>
            <tbody>
              {smartphones.map(({ marca, modelo }, i) => (
                <tr key={i}>
                  <td>{marca}</td>
                  <td>{modelo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default App;
