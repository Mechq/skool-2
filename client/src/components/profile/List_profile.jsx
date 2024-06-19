import React from "react";
import Dropdown from "../Dropdown";

export default function List_profile({ user, editProfile, languages, setLanguages }) {

    const calculate_age = (dob) => {
        let today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        let m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <>
            <div className="justify-center">
                <div className="bg-white max-w-2xl shadow overflow-hidden rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            {user.firstName + ' ' + user.lastName + ' (' + calculate_age(new Date(user.birthDate)) + ' jaar)'}
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            {user.role === 'teacher' ? 'WorkshopTemplates docent' : (user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : '')}
                        </p>
                    </div>
                    <div className="border-t border-gray-200">
                        <div className="bg-white px-4 pt-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                <strong>Persoonlijke gegevens:</strong>
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"></dd>
                        </div>
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Email
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.email}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Wachtwoord
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between items-center">
                                    <span>••••••••••••</span>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                    }}
                                       className="font-medium text-[#f49700] light:text-[#f49700] hover:underline">Wachtwoord
                                        vergeten?</a>
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Telefoonnummer
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.phoneNumber}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Adres
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.street + ' ' + user.houseNumber + ', ' + user.postalCode}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Stad
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.city}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Land
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.country}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                {languages && languages.includes(',') ? 'Talen' : 'Taal'}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between items-center">
                                    {languages}
                                    <span></span>
                                    <Dropdown buttonText="Kies Taal"
                                              options={typeof languages === 'string' ? languages.split(',').map(languageName => ({
                                                  label: languageName.trim(),
                                                  checked: user.language === languageName.trim()
                                              })) : []}/>

                                </dd>
                            </div>
                            <div className="bg-white px-4 pt-5 mt-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    <strong>Zakelijke gegevens:</strong>
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"></dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Soort medewerker
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.isZZPer ? 'ZZP\'er' : 'Flex'}
                                </dd>
                            </div>

                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Tarief p/uur
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    € {user.hourlyRate}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    IBAN nummer
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.IBAN}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Btw nummer
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.btwNumber}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Kvk nummer
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.kvkNumber}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Bezit rijbewijs
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <input
                                        id={`checkbox-drivers-${user.id}`}
                                        type="checkbox"
                                        checked={user.hasDriversLicense}
                                        disabled
                                        className="w-4 h-4 text-custom-blue bg-gray-100 border-gray-300 rounded focus:ring-brand-orange-light"
                                    />
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Bezit auto
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <input
                                        id={`checkbox-car-${user.id}`}
                                        type="checkbox"
                                        checked={user.hasCar}
                                        disabled
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-orange-light"
                                    />
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
            <button
                onClick={() => editProfile(user.id)}
                className="bg-brand-orange hover:bg-brand-orange-hover focus:ring-4 focus:outline-none focus:ring-brand-orange-light font-medium rounded-lg text-sm px-5 py-2.5 text-white mt-4 mb-4"
            >
                Bewerk
            </button>
        </>
    );
}
