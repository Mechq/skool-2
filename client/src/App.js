import React from 'react';
import NavBar from "./components/NavBar";
import About from "./pages/about";
import Home from "./pages/home";
import Workshops from "./pages/workshops";
import Customers from './pages/customers';
import Footer from "./components/Footer";
import { Route, Routes } from 'react-router-dom'



function App() {
    return (
        <>
            <NavBar />
            <div className='container'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/workshops' element={<Workshops />} />
                    <Route path='/customers' element={<Customers />} />
                </Routes>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default App;
