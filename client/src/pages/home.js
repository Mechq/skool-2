import React, { useState, useEffect } from 'react';
import PageSecurity from "../PageSecurity";
import DashboardCardsCommission from '../components/DashboardCardsCommission';

function Home() {
    const [teacherId, setTeacherId] = useState("");
    const userEmail = PageSecurity();
    
    // Ensure that the useEffect is not called conditionally
    useEffect(() => {
        const email = userEmail.email;
        console.log("User email: ", email);
        if (userEmail !== null) {
            fetch(`/api/user/email/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Fetched data: ", data);
                    setTeacherId(data.data.id);
                    console.log("Fetched teacherId: ", data.data.id);
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [userEmail]);

    // Early return logic after all hooks have been called
    if (userEmail === null) {
        return null;
    }

    return (
        <div className='block mb-2 text-sm font-medium text-gray-900'>
            <h1><strong>Inschrijvingen</strong></h1>
            <DashboardCardsCommission teacherId={teacherId} />
        </div>
    );
}

export default Home;