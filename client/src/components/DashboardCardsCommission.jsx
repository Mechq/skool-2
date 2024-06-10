// import React, { useState, useEffect } from 'react';

// function DashboardCardsCommission( {teacherId}) {
//     const userEmail = PageSecurity();
//     const [commissions, setCommissions] = useState([]);
//     teacherId = parseInt(teacherId);   

//     useEffect(() => {
//         fetch(`/api/dashboard/${teacherId}`)
//             .then(res => res.json())
//             .then(data => {
//                 setCommissions(data.data);
//                 console.log("Fetched commissions: ", data.data);
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }, []);

//     if (userEmail === null) {
//         return null;
//     }

//     return (
//         <div className="area">
//             {commissions.map((commission, index) => (
//                 <div key={index} className="w-1/2 px-4 lg:w-1/3">
//                     <div className="bg-white shadow-lg rounded-lg overflow-hidden my-6 grid grid-cols-[auto,1fr]">
//                         <div className="bg-gray-100 px-5 py-2 grid items-end justify-center __col h-full">
//                             <a href="#" className="text-blue-600 font-medium hover:text-blue-800">Meer informatie</a>
//                         </div>
//                         <div className="p-6">
//                             <h2 className="text-xl font-semibold text-gray-800 mb-4">{commission.title}</h2>
//                             <p className="text-gray-600">{commission.description}</p>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//             <ul className="circles">
//                 {Array.from({ length: commissions.length }).map((_, index) => (
//                     <li key={index}></li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default DashboardCardsCommission;

import React, { useState, useEffect } from 'react';

function DashboardCardsCommission({ teacherId }) {
    const [commissions, setCommissions] = useState([]);
    // const teacherEmail = userEmail.email;
    //
    // useEffect(() => {
    //     // Ensure userEmail and teacherId are not null before making the API call
    //     if (teacherEmail !== null && teacherId !== null) {
    //         fetch(`/api/dashboard/${teacherId}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 // Ensure data.data is an array before setting commissions
    //                 if (Array.isArray(data.data)) {
    //                     setCommissions(data.data);
    //                     console.log("Fetched commissions: ", data.data);
    //                 } else {
    //                     console.error('Error: Data fetched is not an array', data);
    //                 }
    //             })
    //             .catch(error => console.error('Error fetching data:', error));
    //     }
    // }, [teacherEmail, teacherId]); // Include userEmail and teacherId as dependencies
    //
    // // Check if userEmail is null and return null if so
    // if (userEmail === null) {
    //     return null;
    // }

    return (
        <div className="area">
            {commissions.map((commission, index) => (
                <div key={index} className="w-1/2 px-4 lg:w-1/3">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden my-6 grid grid-cols-[auto,1fr]">
                        <div className="bg-gray-100 px-5 py-2 grid items-end justify-center __col h-full">
                            <a href="#" className="text-blue-600 font-medium hover:text-blue-800">Meer informatie</a>
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">{commission.title}</h2>
                            <p className="text-gray-600">{commission.description}</p>
                        </div>
                    </div>
                </div>
            ))}
            <ul className="circles">
                {Array.from({ length: commissions.length }).map((_, index) => (
                    <li key={index}></li>
                ))}
            </ul>
        </div>
    );
}

export default DashboardCardsCommission;
