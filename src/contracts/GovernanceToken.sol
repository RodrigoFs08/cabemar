pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GovernanceToken is ERC20, Ownable {
    // Define a variável pública "minter"
    // Define the public variable "minter"
    address public minter;

    // Construtor para criar o token GovernanceToken
    // Constructor to create the GovernanceToken
    constructor(uint256 initialSupply, address _minter) ERC20("CABEMAR GovernanceToken", "CMGOV") {
        // Emite a quantidade inicial de tokens para o criador do contrato
        // Mints the initial supply of tokens to the contract creator
        _mint(msg.sender, initialSupply);
        // Define o endereço do "minter" no momento da implantação do contrato
        // Set the "minter" address at the time of contract deployment
        minter = _minter;
    }

    // Função para emitir novos tokens
    // Function to mint new tokens
    function mint(address to, uint256 amount) public {
        // Requer que o remetente seja o "minter"
        // Requires that the sender is the "minter"
        require(msg.sender == minter, "Only minter can mint tokens");
        // Emite novos tokens para o endereço especificado
        // Mints new tokens to the specified address
        _mint(to, amount);
    }
}
