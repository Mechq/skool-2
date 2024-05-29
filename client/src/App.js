import React from 'react';
import NavBar from "./components/NavBar";
import Home from "./pages/home";
import Workshop from "./pages/workshop";
import MailTemplates from './pages/mailTemplates'
import { Route, Routes } from 'react-router-dom'


function App() {
    return (
        <>
            <NavBar />
            <div className='container'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/workshops' element={<Workshop />} />
                    <Route path='/mailTemplates' element={<MailTemplates/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;
