import React, {useEffect, useState} from 'react';

export default function EditUserPanelContent({userId, setShowSidePanel}) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        street: '',
        houseNumber: '',
        postalCode: '',
        city: '',
        country: '',
        languages: '',
        hasDriversLicense: false,
        hasCar: false,
        isZZPer: false,
        hourlyRate: '',
        iban: '',
        kvk: '',
        btw: ''
    });

    useEffect(() => {
        if (userId) {
            fetch(`/api/user/${userId}`)
                .then(response => response.json())
                .then(data => {
                    const data1 = data.data;
                    setFormData({
                        firstName: data1.firstName,
                        lastName: data1.lastName,
                        email: data1.email,
                        phoneNumber: data1.phoneNumber,
                        street: data1.street,
                        houseNumber: data1.houseNumber,
                        postalCode: data1.postalCode,
                        city: data1.city,
                        country: data1.country,
                        languages: "-",
                        hasDriversLicense: data1.hasDriversLicense,
                        hasCar: data1.hasCar,
                        isZZPer: data1.isZZPer,
                        hourlyRate: data1.hourlyRate,
                        iban: data1.IBAN,
                        kvk: data1.kvkNumber,
                        btw: data1.btwNumber
                    });
                    console.log('Fetched user:', data)
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [userId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data being sent:', formData); // Add this line

        fetch(`/api/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setShowSidePanel(false); // Close the side panel after successful submission
            })
            .catch(error => console.error('Error:', error));
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
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="firstName"
                                   className="block mb-2 text-sm font-medium text-gray-900">Voornaam</label>
                            <input type="text" id="firstName" value={formData.firstName}
                                   onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="lastName"
                                   className="block mb-2 text-sm font-medium text-gray-900">Achternaam</label>
                            <input type="text" id="lastName" value={formData.lastName}
                                   onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900">E-mail</label>
                            <input type="email" id="email" value={formData.email}
                                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="phoneNumber"
                                   className="block mb-2 text-sm font-medium text-gray-900">Telefoonnummer</label>
                            <input type="text" id="phoneNumber" value={formData.phoneNumber}
                                   onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-3">
                        <div>
                            <label htmlFor="street"
                                   className="block mb-2 text-sm font-medium text-gray-900">Straatnaam</label>
                            <input type="text" id="street" value={formData.street}
                                   onChange={(e) => setFormData({...formData, street: e.target.value})}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="houseNumber"
                                   className="block mb-2 text-sm font-medium text-gray-900">Huisnummer</label>
                            <input type="text" id="houseNumber" value={formData.houseNumber}
                                   onChange={(e) => setFormData({...formData, houseNumber: e.target.value})}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="postalCode"
                                   className="block mb-2 text-sm font-medium text-gray-900">Postcode</label>
                            <input type="text" id="postalCode" value={formData.postalCode}
                                   onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                    </div>

                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="city"
                                   className="block mb-2 text-sm font-medium text-gray-900">Woonplaats</label>
                            <input type="text" id="city" value={formData.city}
                                   onChange={(e) => setFormData({...formData, city: e.target.value})}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="country"
                                   className="block mb-2 text-sm font-medium text-gray-900">Land</label>
                            <input type="text" id="country" value={formData.country}
                                   onChange={(e) => setFormData({...formData, country: e.target.value})}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="languages"
                               className="block mb-2 text-sm font-medium text-gray-900">Talen</label>
                        <input type="text" id="languages" value={formData.languages}
                               onChange={(e) => setFormData({...formData, languages: formData.languages})}
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
                                       checked={formData.hasDriversLicense}
                                       onChange={() => setFormData({
                                           ...formData,
                                           hasDriversLicense: !formData.hasDriversLicense
                                       })}
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
                                       checked={formData.hasCar}
                                       onChange={() => setFormData({...formData, hasCar: !formData.hasCar})}
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
                                       checked={formData.isZZPer}
                                       onChange={() => setFormData({...formData, isZZPer: !formData.isZZPer})}
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
                        <input type="text" id="btw" value={formData.btw}
                               onChange={(e) => setFormData({...formData, btw: e.target.value})}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               required/>
                    </div>

                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="kvk"
                                   className="block mb-2 text-sm font-medium text-gray-900">KvK nummer</label>
                            <input type="text" id="kvk" value={formData.kvk}
                                   onChange={(e) => setFormData({...formData, kvk: e.target.value})}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="hourlyRate"
                                   className="block mb-2 text-sm font-medium text-gray-900">Tarief p/uur</label>
                            <input type="text" id="hourlyRate" value={formData.hourlyRate}
                                   onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="iban"
                               className="block mb-2 text-sm font-medium text-gray-900">IBAN</label>
                        <input type="text" id="iban" value={formData.iban}
                               onChange={(e) => setFormData({...formData, iban: e.target.value})}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               required/>
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