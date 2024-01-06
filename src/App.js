import './App.css';
import React,{useEffect} from 'react'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar/navbar';
import Hompage from './components/HomePage/hompage';
import Login from './components/LoginPage/login';
import Register from './components/RegisterPage/register';
import Dsasheet from './components/DSAsheetPage/dsasheet';

function App() {
  return (
    <>
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' index element={<Hompage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dsasheet' element={<Dsasheet />} />
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
