import React, { useState } from "react";
import Box from "@mui/system/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import EntryTokenABI from "../contracts/abi/EntryToken.json";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function HomePage() {
  const [account, setAccount] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [hasToken, setHasToken] = useState(false);
// useEffect(() => {
//     connectToMetaMask();
//     initializeEntryTokenContract();
//   }, []);
    const initializeEntryTokenContract = async () => {
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
      if (balance > 0) {
        setHasToken(true);
        console.log("balance aqui", balance);
      } else {
        console.log("Tá zerado");
        //REDIRECIONA PARA SOLICITAR CERTIFICAÇÃO
      }
    } else {
      console.log("Please install MetaMask!");
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

  return (
    <Container>
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
          <Button variant="contained" onClick={connectToMetaMask}>
            Connect to MetaMask
          </Button>
        ) : (
          <p>Welcome, member {account}</p>
        )}

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <div>
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
          </div>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default HomePage;
