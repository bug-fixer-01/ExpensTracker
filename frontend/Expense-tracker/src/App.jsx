import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom';
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import { UserContext } from './contexts/userContext';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { user } = useContext(UserContext)
  return (
    <div>
      <Router>
          <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to="/Login" />} />
            <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
            <Route path='/signup' element={user ? <Navigate to='/' /> : <SignUp />} />
            <Route path='/income' element={user ? <Income /> : <Navigate to='/' />} />
            <Route path='/expense' element={user ? <Expense /> : <Navigate to='/' />} />
          </Routes>
        <Toaster />
      </Router>
    </div>
  )
}

export default App
