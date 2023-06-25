import React, { useState, useEffect } from "react";
import Box from "@mui/system/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Web3 from "web3";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import detectEthereumProvider from "@metamask/detect-provider";
import EntryTokenABI from "../contracts/abi/EntryToken.json";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import abi from '../contracts/abi/CabemarDAO.json'; // Importe o arquivo ABI

const CONTRACT_ADDRESS = '0x7A99292E15119E156545372bD55dfC6400B5Dd12';

const ABI =abi

const tipos = {
  0: "DOADOR",
  1: "ONG",
  2: "GOV",
  3: "FABRICA",
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function HomePage() {
  const [account, setAccount] = useState("");
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [hasToken, setHasToken] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);
  const [transactionError, setTransactionError] = useState(null);

useEffect(() => {
    initializeEntryTokenContract();
  }, [hasToken]);
  const initializeEntryTokenContract = async () => {
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
          EntryTokenABI,
          "0xBe5A57983911C6a9e0674E122f57fd02B238bD5C"
        );
  
        // Chama as funções do contrato e atualiza o estado do componente
        const balance = await contract.methods.balanceOf(accounts[0]).call();
        if (String(balance) > 0) {
          setHasToken(true);
          console.log("balance aqui", String(balance));
        } else {
          console.log("Tá zerado");

          //REDIRECIONA PARA SOLICITAR CERTIFICAÇÃO
        }
      } else {
        throw new Error("Please install MetaMask!");
      }
    } catch (error) {
      console.error("An error occurred while initializing the contract:", error);
    }
  };
  


  const connectToMetaMask = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      try {
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });

        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setMessage("Successfully connected to MetaMask");
          setSeverity("success");
          setOpen(true);
        }
      } catch (error) {
        setMessage("Failed to connect to MetaMask");
        setSeverity("error");
        setOpen(true);
      }
    } else {
      setMessage("MetaMask not found");
      setSeverity("error");
      setOpen(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };


  const openCredentialingModal = () => {
    setOpenDialog(true);
  };

  const closeCredentialingModal = () => {
    setOpenDialog(false);
  };

  const handleCredentialing = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

      try {
        const receipt =  await contract.methods.register(name, cnpj, type).send({ from: accounts[0] });

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
  }

 return (
        <Container style = {{ backgroundColor: "#86CFD5"}}>
        {/* <Header /> */}
        <Box
        sx={{
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        

       
      
        {account === "" ? (
          <div style={{ textAlign: "left" }}>
            <p>

            </p>
            <p style={{ textAlign: "left", color: "#000080" }}>Estamos vivendo a era do plástico, você aí come até 121 mil partículas de plástico por ano segundo um grupo de cientistas da Universidade de Victoria, no Canadá. O plástico é criado por   processos petroquímicos, um dos processos mais poluentes que existe. Em 2019, a ONG Fair Planet informou que aproximadamente 2.6 bilhões de litros de desperdício de óleo são derramados nos oceanos, anualmente. Sendo que cada litro de óleo polui 1 milhão de litros de água. Hoje as ongs e empresas que se propõem a limpar os rios e mares usam grandes tapetes de plástico, que são usados para limpar o derramamento de óleo, tapetes que feitos de plástico e soltam microplásticos nos rios e mares. Existe hoje em dia um processo de criação de tapetes de cabelo ou fios de pelos de animais que são capazes de limpar rios, mares e oceanos de forma muito eficiente, uma vez que cada fio de cabelo tem capacidade em 5x o seu peso de absorção de óleo.</p>
            <Button variant="contained" onClick={connectToMetaMask}>
              Connect to MetaMask
            </Button>
          </div>
        ) : hasToken ? (
        <p>Bem vindo, {account}</p>
        ) : (
          <div style={{ textAlign: "center" }}>
          <p>

          </p>
          <p style={{ textAlign: "justify", color: "#000080" }}>Estamos vivendo a era do plástico, você aí come até 121 mil partículas de plástico por ano segundo um grupo de cientistas da Universidade de Victoria, no Canadá. O plástico é criado por   processos petroquímicos, um dos processos mais poluentes que existe. Em 2019, a ONG Fair Planet informou que aproximadamente 2.6 bilhões de litros de desperdício de óleo são derramados nos oceanos, anualmente. Sendo que cada litro de óleo polui 1 milhão de litros de água. Hoje as ongs e empresas que se propõem a limpar os rios e mares usam grandes tapetes de plástico, que são usados para limpar o derramamento de óleo, tapetes que feitos de plástico e soltam microplásticos nos rios e mares. Existe hoje em dia um processo de criação de tapetes de cabelo ou fios de pelos de animais que são capazes de limpar rios, mares e oceanos de forma muito eficiente, uma vez que cada fio de cabelo tem capacidade em 5x o seu peso de absorção de óleo.</p>

            <Button  style={{ display: "flex", alignItems: "center", marginBottom: "16px" }} variant="contained" onClick={openCredentialingModal}>
              Realizar credenciamento
            </Button>
          </div>
        )}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <div>
        <Alert onClose={handleClose} severity={severity}>
        {message}
        </Alert>
        </div>
        </Snackbar>
        <Dialog open={openDialog} onClose={closeCredentialingModal}>
        <DialogTitle>Realizar credenciamento</DialogTitle>
        <DialogContent>
        <TextField
        autoFocus
        margin="dense"
        label="Nome"
        type="text"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <TextField
        margin="dense"
        label="CNPJ"
        type="text"
        fullWidth
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value)}
        />
        <Select
        value={type}
        onChange={(e) => setType(e.target.value)}
        fullWidth
        >
        {Object.keys(tipos).map((key) => (
        <MenuItem value={key}>{tipos[key]}</MenuItem>
        ))}
        </Select>
        </DialogContent>
        <DialogActions>
        <Button onClick={closeCredentialingModal}>Cancelar</Button>
        <Button onClick={handleCredentialing}>Credenciar</Button>
        </DialogActions>
        </Dialog>
        </Box>
        </Container>
        );
        }

export default HomePage;

