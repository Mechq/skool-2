import React from 'react';
import NavBar from "./components/NavBar";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { Route, Routes } from 'react-router-dom'
import Customer from "./pages/Customer";


function App() {
    return (
        <>
            <NavBar />
            <div className='container'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/customer' element={<Customer />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
