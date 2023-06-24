pragma solidity ^0.8.0;

// Importa os contratos do OpenZeppelin para Ownable e ERC20
// Import OpenZeppelin contracts for Ownable and ERC20
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Define o contrato GovernanceToken que herda de ERC20 e Ownable
// Define the GovernanceToken contract that inherits from ERC20 and Ownable
contract GovernanceToken is ERC20, Ownable {
    // Define a variável pública "minter"
    // Define the public variable "minter"
    address public minter;

    // Construtor para criar o token GovernanceToken
    // Constructor to create the GovernanceToken
    constructor(uint256 initialSupply) ERC20("CABEMAR GovernanceToken", "CMGOV") {
        // Emite a quantidade inicial de tokens para o criador do contrato
        // Mints the initial supply of tokens to the contract creator
        _mint(msg.sender, initialSupply);
    }

    // Função para definir o endereço do "minter"
    // Function to set the "minter" address
    function setMinter(address _minter) public onlyOwner {
        // Requer que "minter" não tenha sido definido anteriormente
        // Requires that "minter" has not been set before
        require(minter == address(0), "Minter can only be set once");
        // Define o endereço do "minter"
        // Set the "minter" address
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
