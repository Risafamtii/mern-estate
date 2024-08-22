import React from 'react';
import SideBar from './components/SideBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Signup from './pages/Signup';
import Signin from './pages/Signin';


export default function App() {
  return (
    <>
      {/* <SideBar /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SideBar />} />
          <Route path='/about' element={<About />} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/signin' element={<Signin/>} />


        </Routes>
      </BrowserRouter>
    </>
  );
}
