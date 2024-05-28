import React from 'react';
import NavBar from "./components/NavBar";
import About from "./pages/about";
import Home from "./pages/home";
import Workshops from "./pages/workshops";
import Footer from "./components/Footer";
import WorkshopEdit from "./pages/workshopedit";
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
                    <Route path='/workshopEdit' element={<WorkshopEdit />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default App;
