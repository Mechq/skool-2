import React, { useState } from 'react';

export default function EditPanelContent_profile({ user, languages, setShowSidePanel, fetchData }) {
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        street: user.street,
        houseNumber: user.houseNumber,
        postalCode: user.postalCode,
        city: user.city,
        country: user.country,
        languages: languages,
        hasDriversLicense: user.hasDriversLicense,
        hasCar: user.hasCar,
        isZZPer: user.isZZPer,
        hourlyRate: user.hourlyRate,
        iban: user.IBAN,
        kvk: user.kvkNumber,
        btw: user.btwNumber
    });

    const getToken = () => {
        return localStorage.getItem('token');
    };
    
    const saveToken = (token) => {
        localStorage.setItem('token', token);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data being sent:', formData);
    
        fetch(`/api/user/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}` // Attach JWT token to headers
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.data.token) {
                    saveToken(data.data.token); // Update the token in localStorage
                } else {
                    console.log('Token not updated:', data);
                }
                setShowSidePanel(false);
                // Call fetchData function passed as a prop from Profile component
                if (typeof fetchData === 'function') {
                    fetchData();
                }
            })
            .catch(error => console.error('Error:', error));
    };


    return (
        <div className="px-6">
            <header className="pt-4 pb-4 font-bold text-lg">Profiel bewerken</header>
            <div className='side-panel-content'>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="firstName"
                                className="block mb-2 text-sm font-medium text-gray-900">Voornaam</label>
                            <input type="text" id="firstName" value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="lastName"
                                className="block mb-2 text-sm font-medium text-gray-900">Achternaam</label>
                            <input type="text" id="lastName" value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900">E-mail</label>
                            <input type="email" id="email" value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber"
                                className="block mb-2 text-sm font-medium text-gray-900">Telefoonnummer</label>
                            <input type="text" id="phoneNumber" value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-3">
                        <div>
                            <label htmlFor="street"
                                className="block mb-2 text-sm font-medium text-gray-900">Straatnaam</label>
                            <input type="text" id="street" value={formData.street}
                                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="houseNumber"
                                className="block mb-2 text-sm font-medium text-gray-900">Huisnummer</label>
                            <input type="text" id="houseNumber" value={formData.houseNumber}
                                onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="postalCode"
                                className="block mb-2 text-sm font-medium text-gray-900">Postcode</label>
                            <input type="text" id="postalCode" value={formData.postalCode}
                                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="city"
                                className="block mb-2 text-sm font-medium text-gray-900">Woonplaats</label>
                            <input type="text" id="city" value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="country"
                                className="block mb-2 text-sm font-medium text-gray-900">Land</label>
                            <input type="text" id="country" value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="languages"
                            className="block mb-2 text-sm font-medium text-gray-900">Talen</label>
                        <input type="text" id="languages" value={formData.languages}
                            onChange={(e) => setFormData({ ...formData, languages: e.target.value })} // Fix the languages onChange handler
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5"
                            required />
                    </div>
                    <div className="grid gap-6 mb-6 py-2"></div>
                    <h3 className="mb-2 block text-sm font-medium text-gray-900">Vervoer & Soort Werknemer</h3>
                    <ul className="items-center w-full mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                            <div className="flex items-center ps-3">
                                <input id="driversLicense-checkbox-list" type="checkbox" value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-orange-light focus:ring-2"
                                    checked={formData.hasDriversLicense}
                                    onChange={() => setFormData({ ...formData, hasDriversLicense: !formData.hasDriversLicense })}
                                />
                                <label htmlFor="driversLicense-checkbox-list"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900">Ik heb een rijbewijs</label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                            <div className="flex items-center ps-3">
                                <input id="car-checkbox-list" type="checkbox" value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-orange-light focus:ring-2"
                                    checked={formData.hasCar}
                                    onChange={() => setFormData({ ...formData, hasCar: !formData.hasCar })}
                                />
                                <label htmlFor="car-checkbox-list"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900">Ik heb een auto</label>
                            </div>
                        </li>
                        <li className="w-full">
                            <div className="flex items-center ps-3">
                                <input id="zzp-checkbox-list" type="checkbox" value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-orange-light focus:ring-2"
                                    checked={formData.isZZPer}
                                    onChange={() => setFormData({ ...formData, isZZPer: !formData.isZZPer })}
                                />
                                <label htmlFor="zzp-checkbox-list"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900">Ik ben een ZZP'er</label>
                            </div>
                        </li>
                    </ul>
                    <div className="mb-6">
                        <label htmlFor="btw"
                            className="block mb-2 text-sm font-medium text-gray-900">Btw nummer</label>
                        <input type="text" id="btw" value={formData.btw}
                            onChange={(e) => setFormData({ ...formData, btw: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5"
                            required />
                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="kvk"
                                className="block mb-2 text-sm font-medium text-gray-900">KvK nummer</label>
                            <input type="text" id="kvk" value={formData.kvk}
                                onChange={(e) => setFormData({ ...formData, kvk: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="hourlyRate"
                                className="block mb-2 text-sm font-medium text-gray-900">Tarief p/uur</label>
                            <input type="text" id="hourlyRate" value={formData.hourlyRate}
                                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="iban"
                            className="block mb-2 text-sm font-medium text-gray-900">IBAN</label>
                        <input type="text" id="iban" value={formData.iban}
                            onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5"
                            required />
                    </div>
                    <button type="submit" className="text-white bg-brand-orange hover:bf-brand-orange-hover focus:ring-4 focus:ring-brand-orange-light font-medium rounded-lg text-sm px-5 py-2.5 text-center">Opslaan</button>
                </form>
            </div>
        </div>
    );
}
