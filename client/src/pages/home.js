import React from 'react';
import PageSecurity from "../PageSecurity";
import DashboardCardsCommission from '../components/DashboardCardsCommission';

function Home() {

    const userEmail = PageSecurity();
    if (userEmail === null) {
        return null;
    } else {
        console.log('Email:', userEmail)
    }

    return (
        <div className='block mb-2 text-sm font-medium text-gray-900'>
        <h1 ><strong>Inschrijvingen</strong></h1>
            <DashboardCardsCommission></DashboardCardsCommission>
        </div>
    );
}

export default Home;