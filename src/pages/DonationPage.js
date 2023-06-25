import React from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Box, Container } from '@mui/material';


import abi from '../contracts/abi/DonationTracking.json'; // Importe o arquivo ABI

const CONTRACT_ADDRESS = '0x662d5b8C29B1BB2295879De46CcDEB7bec9C06D3';

const ABI =abi


function DonationPage() {

  const [person, setPerson] = React.useState('');
  const [hairAmount, setHairAmount] = React.useState('');

  const handleChangePerson = (event) => {
    setPerson(event.target.value);
  };

  const handleChangeHairAmount = (event) => {
    setHairAmount(event.target.value);
  };

  const handleSubmit = (event) => {
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
              <MenuItem value="Person 1">Barbearia 1</MenuItem>
             
              {/* ...additional options... */}
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
