import React from 'react';
import NavBar from "./components/NavBar";
import Home from "./pages/home";
import Workshop from "./pages/workshop";
import MailTemplates from './pages/mailTemplates'
import { Route, Routes } from 'react-router-dom'
import Commission from "./pages/commission";


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
                </Routes>
            </div>
        </>
    );
}

export default App;
