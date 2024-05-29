import React from 'react';
import NavBar from "./components/NavBar";
import About from "./pages/about";
import Home from "./pages/home";
import Workshops from "./pages/workshops";
import Footer from "./components/Footer";
import { Route, Routes } from 'react-router-dom'
import Werklocatie from './pages/werklocatie';


function App() {
    return (
        <>
            <NavBar />
            <div className='container'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/workshops' element={<Workshops />} />
                    <Route path='/werklocatie' element={<Werklocatie />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default App;
