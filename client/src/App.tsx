import { useEffect, useState } from "react";
import { ethers, BrowserProvider, Contract } from "ethers";

import CelularContrato from "../../server/artifacts/contracts/Celular.sol/Celular.json";

import Btn from "./components/Btn";

interface CelularI {
  id: String;
  marca: String;
  modelo: String;
}

function App() {
  const [provider, setProvider] = useState<null | BrowserProvider>(null);
  const [contract, setContract] = useState<null | Contract>(null);

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
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
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
              {smartphones.map(({ id, marca, modelo }) => (
                <tr>
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
