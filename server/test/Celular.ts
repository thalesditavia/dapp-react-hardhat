import { expect } from "chai";
import { ethers } from "hardhat";

describe("Celular Contract", function () {
  async function deployContract() {
    const CelularContrato = await ethers.getContractFactory("Celular");
    const celularContrato = await CelularContrato.deploy();

    return { celularContrato };
  }

  it("Deploy acontece sem problemas", async function () {
    const { celularContrato } = await deployContract()

    expect(celularContrato.getAddress).to.not.equal(ethers.ZeroAddress);
  });

  it("Adiciona celular sem problemas", async function () {
    const { celularContrato } = await deployContract() 

    await celularContrato.adicionaCelular("Samsung", "Galaxy S21");
    const celulares = await celularContrato.retornaCelulares();
    
    expect(celulares.length).to.equal(1);
    expect(celulares[0].marca).to.equal("Samsung");
    expect(celulares[0].modelo).to.equal("Galaxy S21");
  });
});
