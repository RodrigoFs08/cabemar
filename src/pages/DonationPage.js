import React, {useState} from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Box, Container } from '@mui/material';
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";


import abi from '../contracts/abi/DonationTracking.json'; // Importe o arquivo ABI

const CONTRACT_ADDRESS = '0x662d5b8C29B1BB2295879De46CcDEB7bec9C06D3';

const ABI =abi


function DonationPage() {
  const [transactionHash, setTransactionHash] = useState(null);
  const [transactionError, setTransactionError] = useState(null);

  const [person, setPerson] = React.useState('');
  const [hairAmount, setHairAmount] = React.useState('');

  const handleChangePerson = (event) => {
    setPerson(event.target.value);
  };

  const handleChangeHairAmount = (event) => {
    setHairAmount(event.target.value);
  };

  const handleSubmit = async (event) => {

    const provider = await detectEthereumProvider();

    if (provider) {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
console.log("aqui 1",person)
console.log("aqui 2",hairAmount)
      try {
        const receipt =  await contract.methods.donate(person,hairAmount).send({ from: accounts[0] });

        setTransactionHash(receipt.transactionHash);
      } catch (error) {
        setTransactionError(error.message);
      }


      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } else {
      console.log('Please install MetaMask!');
    }
  
    event.preventDefault();
    console.log(`Person: ${person}, Hair Amount: ${hairAmount}`);
  };



  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <h1> Registrar Doação</h1>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
            <InputLabel id="person-label">Doador</InputLabel>
            <Select
              labelId="person-label"
              id="person"
              value={person}
              onChange={handleChangePerson}
              label="Person"
            >
              <MenuItem value="0x595dE3E08b9828cb768Fe6E0b694E8FDB004264A">Barbearia 1</MenuItem>
             
              
            </Select>
          </FormControl>
          <TextField
            id="hair-amount"
            label="Quantidade de cabelo doado"
            type="number"
            variant="outlined"
            value={hairAmount}
            onChange={handleChangeHairAmount}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Registrar Doação
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default DonationPage;
