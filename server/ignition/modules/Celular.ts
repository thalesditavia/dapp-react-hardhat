import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Celular", (m) => {
  const celular = m.contract("Celular")

  return { celular };
});