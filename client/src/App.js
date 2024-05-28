import React from 'react';
import NavBar from "./components/NavBar";
import Home from "./pages/home";
import Workshop from "./pages/workshop";
import { Route, Routes } from 'react-router-dom'


function App() {
    return (
        <>
            <NavBar />
            <div className='container'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/workshops' element={<Workshop />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
