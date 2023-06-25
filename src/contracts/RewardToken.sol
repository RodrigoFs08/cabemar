pragma solidity ^0.8.0;

// Importa os contratos do OpenZeppelin para ERC20
// Imports the OpenZeppelin contracts for ERC20
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Define o contrato RewardToken que herda de ERC20
// Define the RewardToken contract that inherits from ERC20
contract RewardToken is ERC20 {
    // Define as variáveis públicas "minter1" e "minter2"
    // Define the public variables "minter1" and "minter2"
    address public minter1;
    address public minter2;

    // Construtor para criar o RewardToken
    // Constructor to create the RewardToken
    constructor(uint256 initialSupply, address _minter1, address _minter2) ERC20("TOKEN DE RECOMPENSAS CABEMAR DAO", "CBMAR") {
        // Emite a quantidade inicial de tokens para o criador do contrato
        // Mints the initial supply of tokens to the contract creator
        _mint(msg.sender, initialSupply);
        // Define os endereços do "minter1" e "minter2"
        // Sets the "minter1" and "minter2" addresses
        minter1 = _minter1;
        minter2 = _minter2;
    }

    // Função para emitir novos tokens
    // Function to mint new tokens
    function mint(address to, uint256 amount) public {
        // Requer que o remetente seja um dos "minters"
        // Requires that the sender is one of the "minters"
        require(msg.sender == minter1 || msg.sender == minter2, "Only minters can mint tokens");
        // Emite novos tokens para o endereço especificado
        // Mints new tokens to the specified address
        _mint(to, amount);
    }

}
