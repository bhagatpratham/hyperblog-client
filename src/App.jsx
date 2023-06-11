/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import "./App.css";
import FileUploader from "./FileUploader";
// import Editor from './Editor';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import ForgetPassword from "./components/auth/ForgetPassword";
import ResetPassword from "./components/auth/ResetPassword";
import LandingPage from "./components/LandingPage";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f0e4ff",
      100: "#cbb2ff",
      200: "#a480ff",
      300: "#7a4dff",
      400: "#641bfe",
      500: "#5a01e5",
      600: "#5200b3",
      700: "#430081",
      800: "#2d004f",
      900: "#14001f",
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>{" "}
      </Router>
    </ChakraProvider>
  );
}

export default App;
