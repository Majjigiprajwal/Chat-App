import React from 'react'
import './App.css';
import { Route,Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal'
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Home from './pages/Home';
import ProtectedRoutes from './Routes/ProtectedRoutes';
import SendMail from './components/Password/SendMail';
import ResetPassword from './components/Password/ResetPassword';

function App() {

  Modal.setAppElement("#root");

  return (
    <>
    <ToastContainer />
   <Routes>
    <Route path="/" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/"  element={<ProtectedRoutes />}>
    <Route path="/home" element={<Home />} />
    </Route>
    <Route path='/sendMail'  element={<SendMail />} />
    <Route path='/reset-password/:id' element={<ResetPassword />} />
   </Routes>
   </>
  );
}

export default App;
