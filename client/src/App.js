import React from 'react';
import { Route, Routes } from 'react-router-dom'

import NavBar from "./components/NavBar";
import Home from "./pages/home";
import Customers from './pages/customers';
import Workshop from "./pages/workshop";
import MailTemplates from './pages/mailTemplates'
import Commission from "./pages/commission";
import Worklocation from "./pages/worklocation";

function App() {
    return (
        <>
            <NavBar />
            <div className='container'>
                <Routes>
                    <Route path={'*'} element={<h1>Not Found</h1>} />
                    <Route path='/' element={<Home />} />
                    <Route path='/workshops' element={<Workshop />} />
                    <Route path='/mailTemplates' element={<MailTemplates/>}/>
                    <Route path='/opdracht' element={<Commission/>} />
                    <Route path='/werklocatie' element={<Worklocation />} />
                    <Route path='/customers' element={<Customers />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
