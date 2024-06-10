import React, { useState, useEffect } from 'react';
import DashboardCardsCommission from '../components/DashboardCardsCommission';

function Home() {
    const [teacherId, setTeacherId] = useState();
    const [disableUseEffect, setDisableUseEffect] = useState(false);
    
    // // Ensure that the useEffect is not called conditionally
    // useEffect(() => {
    //     const email = userEmail.email;
    //     console.log("User email: ", email);
    //     if (userEmail !== null && !disableUseEffect) {
    //         fetch(`/api/user/email/${email}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log("Fetched data: ", data.data);
    //                 console.log("Fetched teacherId: ", data.data.id);
    //                 setTeacherId(data.data.id);
    //                 console.log("TeacherId: ", teacherId);
    //                 setDisableUseEffect(true);
    //             })
    //             .catch(error => console.error('Error fetching data:', error));
    //     }
    // }, [userEmail]);
    //
    // // Early return logic after all hooks have been called
    // if (userEmail === null) {
    //     return null;
    // }

    return (
        <div className='block mb-2 text-sm font-medium text-gray-900'>
            <h1><strong>Inschrijvingen</strong></h1>
            <DashboardCardsCommission teacherId={teacherId} />
        </div>
    );
}

export default Home;