import React, {useEffect, useRef, useState} from 'react';

const PersonalDetails = ({formData, setFormData, createAccount, stepBack}) => {
    const {kvkNumber, btwNumber, hasDriversLicense, hasCar, isZZPer, iban, userLanguages} = formData;

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
                } else {
                    console.error('Failed to fetch languages:', data.message);
                }
            } catch (error) {
                console.error('Error fetching languages:', error);
            }
        };

        fetchLanguages().then();

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

        if (isZZPer && !kvkNumber) {
            setKvkNumberValid(false);
        }
        if (!btwNumber) setBtwNumberValid(false);
        if (!iban) setIbanValid(false);

        if ((isZZPer && !kvkNumber) || !btwNumber || !iban) return;

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

        if (isZZPer && !kvkNumberRegex.test(kvkNumber)) {
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

        setIsDropdownVisible(true);
    };

    return (
        <section className='px-6 py-8 mx-6'>
            <form onSubmit={handleRegister} className="relative">
                <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 light:text-white">Registreren</h3>

                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div>
                        <label htmlFor="btwNumber"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">
                            BTW Nummer
                        </label>
                        <input type="text" name="btwNumber" id="btwNumber"
                               className={`bg-gray-50 border ${btwNumberValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                               required=""
                               value={btwNumber} onChange={(e) => {
                            setFormData({...formData, btwNumber: e.target.value});
                            setBtwNumberValid(true);
                        }}/>
                    </div>
                    <div>
                        <label htmlFor="kvkNumber"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">
                            KVK Nummer
                        </label>
                        <input type="text" name="kvkNumber" id="kvkNumber"
                               className={`bg-gray-50 border ${kvkNumberValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                               required={isZZPer}
                               value={kvkNumber} onChange={(e) => {
                            setFormData({...formData, kvkNumber: e.target.value});
                            setKvkNumberValid(true);
                        }}/>
                    </div>
                </div>
                <div className="grid gap-4 mb-4">
                    <div>
                        <label htmlFor="iban" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">
                            IBAN
                        </label>
                        <input type="text" name="iban" id="iban"
                               className={`bg-gray-50 border ${ibanValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                               required=""
                               value={iban} onChange={(e) => {
                            setFormData({...formData, iban: e.target.value});
                            setIbanValid(true);
                        }}/>
                    </div>
                </div>

                <h3 className="mb-2 block text-sm font-medium text-gray-900 light:text-white">Vervoer & Soort
                    Werknemer</h3>
                <ul className="items-center w-full mb-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex light:bg-gray-700 light:border-gray-600 light:text-white">
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r light:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input id="driversLicense-checkbox-list" type="checkbox" value=""
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-orange-light light:focus:ring-brand-orange-light light:ring-offset-gray-700 light:focus:ring-offset-gray-700 focus:ring-2 light:bg-gray-600 light:border-gray-500"
                                   checked={hasDriversLicense}
                                   onChange={() => setFormData({...formData, hasDriversLicense: !hasDriversLicense})}
                            />
                            <label htmlFor="driversLicense-checkbox-list"
                                   className="w-full py-3 ms-2 text-sm font-medium text-gray-900 light:text-gray-300">Ik
                                heb een rijbewijs</label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r light:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input id="car-checkbox-list" type="checkbox" value=""
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-orange-light light:focus:ring-brand-orange-light light:ring-offset-gray-700 light:focus:ring-offset-gray-700 focus:ring-2 light:bg-gray-600 light:border-gray-500"
                                   checked={hasCar}
                                   onChange={() => setFormData({...formData, hasCar: !hasCar})}
                            />
                            <label htmlFor="car-checkbox-list"
                                   className="w-full py-3 ms-2 text-sm font-medium text-gray-900 light:text-gray-300">Ik
                                heb een auto</label>
                        </div>
                    </li>
                    <li className="w-full light:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input id="zzp-checkbox-list" type="checkbox" value=""
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-orange-light light:focus:ring-brand-orange-light light:ring-offset-gray-700 light:focus:ring-offset-gray-700 focus:ring-2 light:bg-gray-600 light:border-gray-500"
                                   checked={isZZPer}
                                   onChange={() => setFormData({...formData, isZZPer: !isZZPer})}
                            />
                            <label htmlFor="zzp-checkbox-list"
                                   className="w-full py-3 ms-2 text-sm font-medium text-gray-900 light:text-gray-300">Ik
                                ben een ZZP'er</label>
                        </div>
                    </li>
                </ul>

                <h3 className="mb-2 block text-sm font-medium text-gray-900 light:text-white">Spreektalen</h3>
                <div className="relative mb-4">
                    <button
                        className="w-full text-black bg-white hover:bg-gray-100 border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center light:bg-gray-800 light:hover:bg-gray-700 light:focus:ring-gray-700 light:border-gray-600"
                        type="button"
                        onClick={handleDropdownClick}
                    >
                        Selecteer talen
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    {isDropdownVisible && (
                        <div ref={dropdownRef}
                             className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-md p-4 z-10 light:bg-gray-700 light:border-gray-600">
                            <ul>
                                {languages.map(language => (
                                    <li key={language}>
                                        <label
                                            className="flex items-center p-2 rounded hover:bg-gray-100 light:hover:bg-gray-600">
                                            <input type="checkbox"
                                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-orange-light light:focus:ring-brand-orange-light light:ring-offset-gray-700 light:focus:ring-offset-gray-700 focus:ring-2 light:bg-gray-600 light:border-gray-500"
                                                   checked={userLanguages.includes(language)}
                                                   onChange={(e) => handleCheckboxClick(e, language)}
                                            />
                                            <span className="ml-2 text-gray-700 light:text-gray-300">{language}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <button type="button" onClick={stepBack}
                        className="mb-2 mr-2 text-white bg-brand-orange hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                    Terug
                </button>
                <button type="submit"
                        className="mb-2 text-white bg-brand-orange hover:bg-brand-orange-light focus:ring-4 focus:outline-none focus:ring-brand-orange-light font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                    Registreer
                </button>
            </form>
        </section>
    );
};

export default PersonalDetails;
