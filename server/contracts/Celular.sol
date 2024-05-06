// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract Celular {
    struct NovoCelular {
        uint id;
        string marca;
        string modelo;
    }

    NovoCelular[] private celulares;

    function adicionaCelular(
        string calldata _marca,
        string calldata _modelo
    ) external {
        require(bytes(_marca).length != 0, "Voce precisa colocar a marca");
        require(bytes(_modelo).length != 0, "Voce precisa colocar o modelo");

        uint celularId = celulares.length;
        celulares.push(NovoCelular(celularId, _marca, _modelo));
    }

    function retornaCelulares() external view returns (NovoCelular[] memory) {
        return celulares;
    }
}
