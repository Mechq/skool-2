import React from 'react';
import Navbar from "./navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { Route, Routes } from 'react-router-dom'


function App() {
    return (
        <>
            <Navbar />
            <div className='container'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
