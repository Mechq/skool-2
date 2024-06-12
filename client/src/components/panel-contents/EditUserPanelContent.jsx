import React, {useEffect, useState} from 'react';

function EditCustomerPanelContent({customerId, setShowSidePanel}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [languages, setLanguages] = useState('');
    const [hasDriversLicense, setHasDriversLicense] = useState(false);
    const [hasCar, setHasCar] = useState(false);
    const [isZZPer, setIsZZPer] = useState(false);
    const [hourlyRate, setHourlyRate] = useState('');
    const [iban, setIban] = useState('');
    const [kvk, setKvk] = useState('');
    const [btw, setBtw] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        //
        // if (!name || !locationName || !contactName || !street || !houseNumber || !postalCode || !city || !email || !phoneNumber) {
        //     return; // Exit the function if any required field is empty
        // }
        //
        // const customer = {
        //     name,
        //     locationName,
        //     contactName,
        //     street,
        //     houseNumber,
        //     city,
        //     postalCode,
        //     email,
        //     phoneNumber,
        //     locationId
        // };
        //
        // fetch(`/api/customer/${customerId}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(customer),
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('Success:', data);
        //         setShowSidePanel(false); // Close the side panel after successful submission
        //     })
        //     .catch(error => console.error('Error:', error));
    };

    const autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div className="px-6">
            <header className="pt-4 pb-4 font-bold text-lg">Workshopdocent bewerken</header>
            <div className='side-panel-content'>
                <form onSubmit={handleSubmit}>
                    {/*<div className="mb-6">*/}
                    {/*    <div>*/}
                    {/*        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Naam</label>*/}
                    {/*        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}*/}
                    {/*               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"*/}
                    {/*               required/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="firstName"
                                   className="block mb-2 text-sm font-medium text-gray-900">Voornaam</label>
                            <input type="text" id="firstName" value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="lastName"
                                   className="block mb-2 text-sm font-medium text-gray-900">Achternaam</label>
                            <input type="text" id="lastName" value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900">E-mail</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="phoneNumber"
                                   className="block mb-2 text-sm font-medium text-gray-900">Telefoonnummer</label>
                            <input type="text" id="phoneNumber" value={phoneNumber}
                                   onChange={(e) => setPhoneNumber(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-3">
                        <div>
                            <label htmlFor="street"
                                   className="block mb-2 text-sm font-medium text-gray-900">Straatnaam</label>
                            <input type="text" id="street" value={street} onChange={(e) => setStreet(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="houseNumber"
                                   className="block mb-2 text-sm font-medium text-gray-900">Huisnummer</label>
                            <input type="text" id="houseNumber" value={houseNumber}
                                   onChange={(e) => setHouseNumber(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="postalCode"
                                   className="block mb-2 text-sm font-medium text-gray-900">Postcode</label>
                            <input type="text" id="postalCode" value={postalCode}
                                   onChange={(e) => setPostalCode(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                    </div>

                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="city"
                                   className="block mb-2 text-sm font-medium text-gray-900">Woonplaats</label>
                            <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="country"
                                   className="block mb-2 text-sm font-medium text-gray-900">Land</label>
                            <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="languages"
                               className="block mb-2 text-sm font-medium text-gray-900">Talen</label>
                        <input type="text" id="languages" value={languages}
                               onChange={(e) => setLanguages(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               required/>
                    </div>
                    <div className="grid gap-6 mb-6 py-2"></div>

                    <h3 className="mb-2 block text-sm font-medium text-gray-900 light:text-white">Vervoer & Soort
                        Werknemer</h3>
                    <ul className="items-center w-full mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex light:bg-gray-700 light:border-gray-600 light:text-white">
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r light:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input id="driversLicense-checkbox-list" type="checkbox" value=""
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 light:focus:ring-blue-600 light:ring-offset-gray-700 light:focus:ring-offset-gray-700 focus:ring-2 light:bg-gray-600 light:border-gray-500"
                                       checked={hasDriversLicense}
                                    // onChange={() => setFormData({
                                    //     ...formData,
                                    //     hasDriversLicense: !hasDriversLicense
                                    // })}
                                />
                                <label htmlFor="driversLicense-checkbox-list"
                                       className="w-full py-3 ms-2 text-sm font-medium text-gray-900 light:text-gray-300">Ik
                                    heb een rijbewijs</label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r light:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input id="car-checkbox-list" type="checkbox" value=""
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 light:focus:ring-blue-600 light:ring-offset-gray-700 light:focus:ring-offset-gray-700 focus:ring-2 light:bg-gray-600 light:border-gray-500"
                                       checked={hasCar}
                                    // onChange={() => setFormData({...formData, hasCar: !hasCar})}
                                />
                                <label htmlFor="car-checkbox-list"
                                       className="w-full py-3 ms-2 text-sm font-medium text-gray-900 light:text-gray-300">Ik
                                    heb een auto</label>
                            </div>
                        </li>
                        <li className="w-full light:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input id="zzp-checkbox-list" type="checkbox" value=""
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 light:focus:ring-blue-600 light:ring-offset-gray-700 light:focus:ring-offset-gray-700 focus:ring-2 light:bg-gray-600 light:border-gray-500"
                                       checked={isZZPer}
                                    // onChange={() => setFormData({...formData, isZZPer: !isZZPer})}
                                />
                                <label htmlFor="zzp-checkbox-list"
                                       className="w-full py-3 ms-2 text-sm font-medium text-gray-900 light:text-gray-300">Ik
                                    ben een ZZP'er</label>
                            </div>
                        </li>
                    </ul>

                    <div className="mb-6">
                        <label htmlFor="btw"
                               className="block mb-2 text-sm font-medium text-gray-900">Btw nummer</label>
                        <input type="text" id="btw" value={btw} onChange={(e) => setBtw(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               required/>
                    </div>

                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="kvk"
                                   className="block mb-2 text-sm font-medium text-gray-900">KvK nummer</label>
                            <input type="text" id="kvk" value={kvk} onChange={(e) => setKvk(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="hourlyRate"
                                   className="block mb-2 text-sm font-medium text-gray-900">Tarief p/uur</label>
                            <input type="text" id="hourlyRate" value={kvk} onChange={(e) => setKvk(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                    </div>


                    <button type="submit"
                            className="text-white mt-4 bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditCustomerPanelContent;
