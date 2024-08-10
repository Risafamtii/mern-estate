import React from 'react';
import SideBar from './components/SideBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

export default function App() {
  return (
    <>
      {/* <SideBar /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SideBar />} />
          <Route path='/about' element={<About />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}
