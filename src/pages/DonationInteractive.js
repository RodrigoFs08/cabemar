import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Box, Container } from '@mui/material';
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import EntryTokenABI from "../contracts/abi/EntryToken.json";

const DonationPage = () => {
  const [person, setPerson] = useState("");
  const [hairAmount, setHairAmount] = useState(0);

  const handleChangePerson = (event) => {
    setPerson(event.target.value);
  };

  const handleChangeHairAmount = (event) => {
    setHairAmount(event.target.value);
  };

  // Your smart contract ABI
  const contractABI = EntryTokenABI; 
  const contractAddress = '0x662d5b8C29B1BB2295879De46CcDEB7bec9C06D3';

  const handleSubmit = async (event) => {
    event.preventDefault();

    const provider = await detectEthereumProvider();

    if (!provider) {
      console.error('Please install MetaMask!');
      return;
    }

    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const accounts = await web3.eth.getAccounts();
    contract.methods.donate(person, hairAmount).send({ from: accounts[0] })
      .on('transactionHash', (hash) => {
        console.log('Transaction hash: ', hash);
      })
      .on('error', console.error); // If a out of gas error, the second parameter is the receipt.
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
        <h1>Donation Page</h1>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
            <InputLabel id="person-label">Person</InputLabel>
            <Select
              labelId="person-label"
              id="person"
              value={person}
              onChange={handleChangePerson}
              label="Person"
            >
              <MenuItem value="Person 1">Person 1</MenuItem>
              <MenuItem value="Person 2">Person 2</MenuItem>
              <MenuItem value="Person 3">Person 3</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="hair-amount"
            label="Hair Amount to Donate"
            type="number"
            variant="outlined"
            value={hairAmount}
            onChange={handleChangeHairAmount}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default DonationPage;
