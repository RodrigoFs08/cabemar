import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

import { 
  Box, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  Paper,
  Typography
} from '@mui/material';
import abi from '../contracts/abi/CabemarDAO.json'; // Importe o arquivo ABI

const CONTRACT_ADDRESS = '0x7A99292E15119E156545372bD55dfC6400B5Dd12';

const ABI =abi


function VotePage() {
  const [candidates, setCandidates] = useState([  ]);


  useEffect(() => {
    readTokenContract();
  }, []);
  const readTokenContract = async () => {
    try {
      // Detecta o provedor Ethereum (Metamask, por exemplo)
      const provider = await detectEthereumProvider();
  
      if (provider) {
        // Cria uma nova instância Web3 usando o provedor
        const web3 = new Web3(provider);
  
        // Obtém as contas
        const accounts = await web3.eth.getAccounts();
  
        // Cria uma instância do contrato
        const contract = new web3.eth.Contract(
          ABI,
          CONTRACT_ADDRESS
        );
  
        // Chama as funções do contrato e atualiza o estado do componente
        const balance =  await contract.methods.registers(0).call({ from: accounts[0] });
        setCandidates([balance])
        console.log("lista",balance)
      } else {
        throw new Error("Please install MetaMask!");
      }
    } catch (error) {
      console.error("An error occurred while initializing the contract:", error);
    }
  };


 

  const handleVote = (index, voteType) => {
    const newCandidates = [...candidates];
    newCandidates[index].votes += voteType === 'upvote' ? 1 : -1;
    setCandidates(newCandidates);
  };

  return (
    <Box display="flex" justifyContent="center" m={2}>
      <Paper style={{ padding: 16, maxWidth: 500 }}>
        <Typography variant="h4" align="center">Certificação de novos usuários</Typography>
        <List>
          {candidates.map((candidate, index) => (
            <ListItem key={candidate.id}>
              <ListItemText primary={`${candidate[0]}`} secondary={`ID: ${candidate[3]}, Type: ${candidate[2]}`} />
              <ListItemSecondaryAction>
                <Button variant="outlined" color="primary" onClick={() => handleVote(index, 'upvote')}>
                  Upvote
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleVote(index, 'downvote')} style={{ marginLeft: 8 }}>
                  Downvote
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default VotePage;
