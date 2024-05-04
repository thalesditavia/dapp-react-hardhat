// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract Celular {
    struct NovoCelular {
        uint id;
        string marca;
        string modelo;
    }

    NovoCelular[] public celulares;

    function adicionaCelular(
        string memory _marca,
        string memory _modelo
    ) external {
        uint celularId = celulares.length;
        celulares.push(NovoCelular(celularId, _marca, _modelo));
    }

    function retornaCelulares() external view returns (NovoCelular[] memory) {
        return celulares;
    }
}
