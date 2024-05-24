import React from 'react';
import NavBar from "./NavBar";
import About from "./pages/About";
import Home from "./pages/Home";
import CreateWorkshop from "./pages/create.workshop";
import { Route, Routes } from 'react-router-dom'


function App() {
    return (
        <>
            <NavBar />
            <div className='container'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/create-workshop' element={<CreateWorkshop />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
