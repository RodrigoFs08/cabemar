pragma solidity ^0.8.0;

// Importa os contratos do OpenZeppelin para ERC20
// Imports the OpenZeppelin contracts for ERC20
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Define o contrato EntryToken que herda de ERC20
// Define the EntryToken contract that inherits from ERC20
contract EntryToken is ERC20 {
    // Define a variável pública "minter"
    // Define the public variable "minter"
    address public minter;

    // Define os tipos possíveis de usuários
    // Defines the possible types of users
    enum UserType { DOADOR, ONG, GOV, FABRICA }

    // Mapeamento de endereços para tipos de usuários
    // Mapping of addresses to user types
    mapping(address => UserType) public userTypes;

    // Construtor para criar o EntryToken
    // Constructor to create the EntryToken
    constructor(uint256 initialSupply, address _minter) ERC20("Token de acesso ao Cabemar-DAO", "OCEAN") {
        // Emite a quantidade inicial de tokens para o criador do contrato
        // Mints the initial supply of tokens to the contract creator
        _mint(msg.sender, initialSupply);
        // Define o endereço do "minter"
        // Sets the "minter" address
        minter = _minter;
    }

    // Função para emitir novos EntryTokens e atribuir um tipo de usuário ao endereço de destino
    // Function to mint new EntryTokens and assign a user type to the destination address
    function mint(address to, uint256 amount, UserType userType) public {
        // Requer que o remetente seja o "minter"
        // Requires that the sender is the "minter"
        require(msg.sender == minter, "Only minter can mint tokens");
        // Emite novos tokens para o endereço especificado
        // Mints new tokens to the specified address
        _mint(to, amount);
        // Atribui o tipo de usuário ao endereço de destino
        // Assigns the user type to the destination address
        userTypes[to] = userType;
    }

    // Função para recuperar o tipo de usuário de um endereço
    // Function to retrieve the user type of an address
    function getUserType(address user) public view returns (UserType) {
        return userTypes[user];
    }
}
