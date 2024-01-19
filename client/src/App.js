import React from 'react'
import './App.css';
import { Route,Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal'
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Homw from './components/Chat/Homw';

function App() {

  
  Modal.setAppElement("#root");

  return (
    <>
    <ToastContainer />
   <Routes>
    <Route path="/" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/home" element={<Homw />} />
   </Routes>
   </>
  );
}

export default App;
