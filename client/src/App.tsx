import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { BrowserProvider, Contract } from "ethers";

import CelularContrato from "../../server/artifacts/contracts/Celular.sol/Celular.json";

function App() {
  const [provider, setProvider] = useState<null | BrowserProvider>(null);
  const [contract, setContract] = useState<null | Contract>(null);

  const initializeProvider = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);

      setProvider(provider);
    }
  };

  const connectContract = async () => {
    if (provider) {
      const ContractFactory = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", CelularContrato.abi)
      setContract(ContractFactory);
    }
  };

  useEffect(() => {
    initializeProvider();
  },[])

  useEffect(() => {
    connectContract();
  },[provider]);

  const interactWithContract = async () => {
      console.log(contract);
  };

  return (
    <div>
      <h1>Celulares</h1>
      <button onClick={interactWithContract}>Interact with Contract</button>
    </div>
  );
}

export default App;
