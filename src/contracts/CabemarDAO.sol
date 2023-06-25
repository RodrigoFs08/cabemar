pragma solidity ^0.8.0;

import "./GovernanceToken.sol";
import "./EntryToken.sol";
import "./RewardToken.sol";
import "./DonationTracking.sol";

contract CabemarDAO {
    GovernanceToken private governanceToken;
    EntryToken private entryToken;
    RewardToken private rewardToken;
    DonationTracking private donationTracking;

    struct Register {
        string name;
        string cnpj;
        string person_type;
        address proposer;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
        mapping(address => bool) voted;
    }

    struct Proposal {
        string description;
        address payable recipient;
        uint256 amount;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
        mapping(address => bool) voted;
    }

    Register[] public registers;
    Proposal[] public proposals;

    constructor(address governanceTokenAddress, address entryTokenAddress, address rewardTokenAddress, address donationTrackingAddress) {
        governanceToken = GovernanceToken(governanceTokenAddress);
        entryToken = EntryToken(entryTokenAddress);
        rewardToken = RewardToken(rewardTokenAddress);
        donationTracking = DonationTracking(donationTrackingAddress);
    }

    function register(string memory name, string memory cnpj, string memory person_type) public {
        require(entryToken.balanceOf(msg.sender) > 0, "Must hold entry token to register");
       
       // This declares a new register
    registers.push();
    uint index = registers.length - 1;
    
    Register storage newRegister = registers[index];
    newRegister.name = name;
    newRegister.cnpj = cnpj;
    newRegister.person_type = person_type;
    newRegister.proposer = msg.sender;
    }

function propose(string memory description, address payable recipient, uint256 amount) public {
    require(entryToken.balanceOf(msg.sender) > 0, "Must hold entry token to propose");
    
    // This declares a new proposal
    proposals.push();
    uint index = proposals.length - 1;
    
    Proposal storage newProposal = proposals[index];
    newProposal.description = description;
    newProposal.recipient = recipient;
    newProposal.amount = amount;
    newProposal.executed = false;
}

    function voteRegister(uint256 registerIndex, bool voteFor) public {
        require(governanceToken.balanceOf(msg.sender) > 0, "Must hold governance token to vote");
        Register storage registerToApprove  = registers[registerIndex];
        require(registerToApprove .voted[msg.sender] == false, "Already voted");

        if(voteFor) {
            registerToApprove .forVotes += governanceToken.balanceOf(msg.sender);
        } else {
            registerToApprove .againstVotes += governanceToken.balanceOf(msg.sender);
        }

        registerToApprove.voted[msg.sender] = true;
    }

    function executeRegister(uint256 registerIndex) public {
        Register storage registerToExecute = registers[registerIndex];
        require(registerToExecute.executed == false, "Register already executed");
        require(registerToExecute.forVotes > registerToExecute.againstVotes, "Register not approved");

        

        registerToExecute.executed = true;
    }

    function voteProposal(uint256 proposalIndex, bool voteFor) public {
        require(governanceToken.balanceOf(msg.sender) > 0, "Must hold governance token to vote");
        Proposal storage proposal = proposals[proposalIndex];
        require(proposal.voted[msg.sender] == false, "Already voted");

        if(voteFor) {
            proposal.forVotes += governanceToken.balanceOf(msg.sender);
        } else {
            proposal.againstVotes += governanceToken.balanceOf(msg.sender);
        }

        proposal.voted[msg.sender] = true;
    }

    function executeProposal(uint256 proposalIndex) public {
        Proposal storage proposal = proposals[proposalIndex];
       
        require(proposal.executed == false, "Proposal already executed");
        require(proposal.forVotes > proposal.againstVotes, "Proposal not approved");
        require(address(this).balance >= proposal.amount, "Insufficient funds to execute proposal");

        // Transfer the proposed amount of ETH to the recipient
        proposal.recipient.transfer(proposal.amount);
        proposal.executed = true;
    }

    // Allow the contract to receive Ether
    receive() external payable {}
}
