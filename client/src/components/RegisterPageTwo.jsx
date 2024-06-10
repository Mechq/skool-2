import React, { useEffect, useRef, useState } from 'react';

const PersonalDetails = ({ formData, setFormData, createAccount, stepBack }) => {
    const { kvkNumber, btwNumber, hasDriversLicense, hasCar, isZZPer, iban, userLanguages } = formData;

    const [kvkNumberValid, setKvkNumberValid] = useState(true);
    const [btwNumberValid, setBtwNumberValid] = useState(true);
    const [ibanValid, setIbanValid] = useState(true);

    const [languages, setLanguages] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await fetch('/api/language');
                const data = await response.json();
                if (response.ok) {
                    setLanguages(data.data.map(lang => lang.name));
                    console.log('Languages fetched:', languages);
                } else {
                    console.error('Failed to fetch languages:', data.message);
                }
            } catch (error) {
                console.error('Error fetching languages:', error);
            }
        };

        fetchLanguages();

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && event.target.type !== 'checkbox') {
                setIsDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const ibanRegexes = {
        NL: /^NL\d{2}[A-Z]{4}\d{10}$/,
        BE: /^BE\d{14}$/,
        DE: /^DE\d{2}\d{8}\d{10}$/,
        FR: /^FR\d{2}\d{10}\d{11}\d{2}$/,
    };

    const btwNumberRegex = /^NL\d{9}B\d{2}$/;
    const kvkNumberRegex = /^\d{8}$/;

    const handleRegister = (e) => {
        e.preventDefault();
        if (!kvkNumber) setKvkNumberValid(false);
        if (!btwNumber) setBtwNumberValid(false);
        if (!iban) setIbanValid(false);

        if (!kvkNumber || !btwNumber || !iban) return;

        if (btwNumber.length !== 14) {
            setBtwNumberValid(false);
            return;
        }

        const countryCode = iban.substring(0, 2);
        const ibanRegex = ibanRegexes[countryCode];

        if (!ibanRegex || !ibanRegex.test(iban)) {
            setIbanValid(false);
            return;
        }

        if (!btwNumberRegex.test(btwNumber)) {
            setBtwNumberValid(false);
            return;
        }

        if (!kvkNumberRegex.test(kvkNumber)) {
            setKvkNumberValid(false);
            return;
        }

        setFormData({
            ...formData,
            btwNumber,
            kvkNumber,
            hasDriversLicense,
            hasCar,
            isZZPer,
            iban,
            userLanguages: userLanguages.map(language => languages.indexOf(language) + 1)
        });

        createAccount();
    };

    const handleDropdownClick = (e) => {
        e.stopPropagation();
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleCheckboxClick = (e, language) => {
        e.stopPropagation();
        const isChecked = e.target.checked;
        setFormData(prevState => ({
            ...prevState,
            userLanguages: isChecked ?
                [...prevState.userLanguages, language] :
                prevState.userLanguages.filter(lang => lang !== language)
        }));

        // Keep the dropdown open when interacting with checkboxes
        setIsDropdownVisible(true);
    };


    return (
        <section className='px-6 py-8 mx-6'>
            <form onSubmit={handleRegister} className="relative">
                <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 light:text-white">Registreren</h3>

                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div>
                        <label htmlFor="btwNumber"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">BTW
                            Nummer</label>
                        <input type="text" name="btwNumber" id="btwNumber"
                               className={`bg-gray-50 border ${btwNumberValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                               placeholder="123456789" required=""
                               value={btwNumber} onChange={(e) => {
                            setFormData({...formData, btwNumber: e.target.value})
                            setBtwNumberValid(true);
                        }}/>
                    </div>
                    <div>
                        <label htmlFor="kvkNumber"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">KVK
                            Nummer</label>
                        <input type="text" name="kvkNumber" id="kvkNumber"
                               className={`bg-gray-50 border ${kvkNumberValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                               placeholder="12345678" required=""
                               value={kvkNumber} onChange={(e) => {
                            setFormData({...formData, kvkNumber: e.target.value})
                            setKvkNumberValid(true);
                        }}/>
                    </div>
                </div>
                <div className="grid gap-4 mb-4">
                    <div>
                        <label htmlFor="iban"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">IBAN</label>
                        <input type="text" name="iban" id="iban"
                               className={`bg-gray-50 border ${ibanValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                               placeholder="NL02ABNA0123456789" required=""
                               value={iban} onChange={(e) => {
                            setFormData({...formData, iban: e.target.value})
                            setIbanValid(true);
                        }}/>
                    </div>
                </div>

                <div className="grid gap-4 mb-4 relative">
                    <button
                        type="button"

                        type="button"
                        id="dropdownCheckboxButton"
                        onClick={handleDropdownClick}
                        className="text-white bg-brand-orange hover:bg-brand-orange-hover focus:ring-4 focus:outline-none focus:ring-brand-orange-light font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800 relative"
                    >
                        Welke talen spreekt u?
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 1 4 4 4-4"/>
                        </svg>
                        {isDropdownVisible && (
                            <div
                                ref={dropdownRef}
                                className="absolute top-full left-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow light:bg-gray-700 light:divide-gray-600 transition-all duration-300 transform
                                opacity-100 scale-100"
                            >
                                <ul className="p-3 space-y-3 text-sm text-gray-700 light:text-gray-200"
                                    aria-labelledby="dropdownCheckboxButton">
                                    {languages.map((language, index) => (
                                        <li key={index}>
                                            <div className="flex items-center">
                                                <input
                                                    id={`checkbox-item-${index}`}
                                                    type="checkbox"
                                                    value={language}
                                                    checked={userLanguages.includes(language)}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 light:focus:ring-blue-600 light:ring-offset-gray-700 light:focus:ring-offset-gray-700 focus:ring-2 light:bg-gray-600 light:border-gray-500"
                                                    onChange={(e) => handleCheckboxClick(e, language)}
                                                />
                                                <label htmlFor={`checkbox-item-${index}`}
                                                       className="ms-2 text-sm font-medium text-gray-900 light:text-gray-300">{language}</label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </button>
                </div>

                <button
                    onClick={stepBack}
                    className="text-white mr-3 bg-brand-orange hover:bg-hover-brand-orange focus:ring-4 focus:outline-none focus:ring-brand-orange-light font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-brand-orange-light light:hover:bg-hover-brand-orange light:focus:ring-hover-brand-orange"
                >
                    Terug
                </button>
                <button
                    type="submit"
                    className="text-white bg-brand-orange hover:bg-hover-brand-orange focus:ring-4 focus:outline-none focus:ring-brand-orange-light font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-brand-orange-light light:hover:bg-hover-brand-orange light:focus:ring-hover-brand-orange"
                >
                    Volgende stap
                </button>
            </form>
        </section>
    );
};

export default PersonalDetails;
