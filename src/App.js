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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Web3 from "web3";
import EntryTokenABI from "./contracts/abi/EntryToken.json";
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

        />

        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

        <Routes>
          <Route path="/" exact element={<HomePage />}
          />
          <Route path="/doacao" element={<DonationPage />} />
          <Route path="/rastreamento" element={<TrackingPage />} />
          <Route path="/certificacao" element={<CertificationPage />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

//tela de login - conectar a metamask
//sem token - credenciar
