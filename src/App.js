import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import DonationPage from "./pages/DonationPage";
import TrackingPage from "./pages/TrackingPage";
import CertificationPage from "./pages/CertificationPage";
import RewardsPage from "./pages/RewardsPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Web3 from "web3";
import EntryTokenABI from "./contracts/abi/EntryToken.json";
import UserCredentialsPage from "./pages/UserCredentialsPage";
import detectEthereumProvider from "@metamask/detect-provider";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000080",
    },
    secondary: {
      main: "#000080",
    },
    background: {
      default: "#86CFD5", // Set your desired background color here
    },
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [account, setAccount] = useState("");
  const [entryTokenContract, setEntryTokenContract] = useState(null);
  const [hasToken, setHasToken] = useState(false);
  useEffect(() => {
    connectToMetaMask();
    initializeEntryTokenContract();
  }, []);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // Get the selected account
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error("MetaMask not found.");
    }
  };

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
    // try {
    //   const web3 = new Web3(window.ethereum);
    //   const entryToken = new web3.eth.Contract(
    //     EntryTokenABI,
    //     "0xBe5A57983911C6a9e0674E122f57fd02B238bD5C"
    //   );
    //   setEntryTokenContract(entryToken);
    // } catch (error) {
    //   console.error("Error initializing EntryToken contract:", error);
    // }
  };

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header
          onMenuClick={handleSidebarOpen}
          loggedIn={loggedIn}
          account={account}
        />
        {loggedIn && (
          <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
        )}
        <Routes>
          <Route path="/home" exact element={<HomePage />} />
          <Route path="/donation" element={<DonationPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/certification" element={<CertificationPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          {loggedIn && (
            <Route path="/userCredentials" element={<UserCredentialsPage />} />
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

//tela de login - conectar a metamask
//sem token - credenciar
