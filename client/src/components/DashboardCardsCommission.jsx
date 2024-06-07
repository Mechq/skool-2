// import React from 'react';
// import PageSecurity from "../PageSecurity";

// function DashboardCardsCommission() {

//     const userEmail = PageSecurity();
//     if (userEmail === null) {
//         return null;
//     } else {
//         console.log('Email:', userEmail)
//     }

//     return (
        
// <div class="area">


// 	<div class="w-1/2 px-4 lg:w-1/3">
// 		<div class="bg-white shadow-lg rounded-lg overflow-hidden my-6 grid grid-cols-[auto,1fr]">
// 			<div class="bg-gray-100 px-5 py-2   grid items-end justify-center __col h-full">
// 				<a href="#" class="text-blue-600 font-medium hover:text-blue-800">Learn more</a>
// 			</div>
// 			<div class="p-6">
// 				<h2 class="text-xl font-semibold text-gray-800 mb-4">Fast Performance</h2>
// 				<p class="text-gray-600">Suspendisse tincidunt metus vitae libero auctor, at aliquam purus. Morbi sit
// 					amet lectus non sapien aliquet rutrum.</p>
// 			</div>
// 		</div>
// 	</div>


// 	<div class="w-1/2 px-4 lg:w-1/3">
// 		<div class="bg-white shadow-lg rounded-lg overflow-hidden my-6 grid grid-cols-[auto,1fr]">
// 			<div class="bg-gray-100 px-5 py-2   grid items-end justify-center __col h-full">
// 				<a href="#" class="text-blue-600 font-medium hover:text-blue-800">Learn more</a>
// 			</div>
// 			<div class="p-6">
// 				<h2 class="text-xl font-semibold text-gray-800 mb-4">Elegance</h2>
// 				<p class="text-gray-600">Suspendisse tincidunt metus vitae libero auctor, at aliquam purus. Morbi sit
// 					amet lectus non sapien aliquet rutrum.</p>
// 			</div>
// 		</div>
// 	</div>



// 	<div class="w-1/2 px-4 lg:w-1/3">
// 		<div class="bg-white shadow-lg rounded-lg overflow-hidden my-6 grid grid-cols-[auto,1fr]">
// 			<div class="bg-gray-100 px-5 py-2   grid items-end justify-center __col h-full">
// 				<a href="#" class="text-blue-600 font-medium hover:text-blue-800">Learn more</a>
// 			</div>
// 			<div class="p-6">
// 				<h2 class="text-xl font-semibold text-gray-800 mb-4">Fast Performance</h2>
// 				<p class="text-gray-600">Suspendisse tincidunt metus vitae libero auctor, at aliquam purus. Morbi sit
// 					amet lectus non sapien aliquet rutrum.</p>
// 			</div>
// 		</div>
// 	</div>



// 	<div class="w-1/2 px-4 lg:w-1/3">
// 		<div class="bg-white shadow-lg rounded-lg overflow-hidden my-6 grid grid-cols-[auto,1fr]">
// 			<div class="bg-gray-100 px-5 py-2   grid items-end justify-center __col h-full">
// 				<a href="#" class="text-blue-600 font-medium hover:text-blue-800">Learn more</a>
// 			</div>
// 			<div class="p-6">
// 				<h2 class="text-xl font-semibold text-gray-800 mb-4">Spacial Diversity</h2>
// 				<p class="text-gray-600">Suspendisse tincidunt metus vitae libero auctor, at aliquam purus. Morbi sit
// 					amet lectus non sapien aliquet rutrum.</p>
// 			</div>
// 		</div>
// 	</div>
// 	{/* <ul class="circles">
// 		<li></li>
// 		<li></li>
// 		<li></li>
// 		<li></li>
// 		<li></li>
// 		<li></li>
// 		<li></li>
// 		<li></li>
// 		<li></li>
// 		<li></li>
// 	</ul> */}
// </div>

//     );
// }

// export default DashboardCardsCommission;

import React, { useState, useEffect } from 'react';
import PageSecurity from "../PageSecurity";

function DashboardCardsCommission() {
    

    const [commissions, setCommissions] = useState([]);

    useEffect(() => {
        // Here we fetch the commissions from the database
        async function fetch() {
            try {
                const response = await fetch('/api/commissions'); // Replace '/api/commissions' with the correct API endpoint URL
                const data = await response.json();
                setCommissions(data); // Set the commissions with the data from the database
            } catch (error) {
                console.error('Error fetching commissions:', error);
            }
        }

        fetch(); // Call the fetchCommissions function when the component is mounted
    }, []); // Empty dependency array ensures useEffect runs only once on mount

    const user = PageSecurity();

    if (user === null) {
        return null;
    }

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

