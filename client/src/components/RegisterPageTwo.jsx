import React, { useState } from 'react';

const PersonalDetails = ({ formData, setFormData, createAccount, stepBack }) => {
    const { kvkNumber, btwNumber, hasDriversLicense, hasCar, isZZPer, iban } = formData;



    const [kvkNumberValid, setKvkNumberValid] = useState(true);
    const [btwNumberValid, setBtwNumberValid] = useState(true);
    const [ibanValid, setIbanValid] = useState(true);

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
            iban
        });

        createAccount();
    };

    return (
        <section className='px-6 py-8 mx-6'>
            <form onSubmit={handleRegister}>
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

                <div className="grid gap-4 mb-4 grid-cols-3">
                    <div className="flex items-center">
                        <label className="inline-flex tems-center flex-grow">
                            <span className="text-sm font-medium text-gray-900 mr-4 light:text-white">Heeft u een rijbewijs?</span>
                            <input
                                type="checkbox"
                                name="hasDriversLicense"
                                id="hasDriversLicense"
                                className="form-checkbox ml-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                checked={hasDriversLicense}
                                onChange={(e) => setFormData({...formData, hasDriversLicense: e.target.checked})}
                            />
                        </label>
                    </div>
                    <div className="flex items-center">
                        <label className="inline-flex items-center flex-grow">
                            <span
                                className="text-sm font-medium text-gray-900 mr-4 light:text-white">Heeft u een auto?</span>
                            <input
                                type="checkbox"
                                name="hasCar"
                                id="hasCar"
                                className="form-checkbox ml-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                checked={hasCar}
                                onChange={(e) => setFormData({...formData, hasCar: e.target.checked})}
                            />
                        </label>
                    </div>
                    <div className="flex items-center">
                        <label className="inline-flex items-center flex-grow">
                            <span
                                className="text-sm font-medium text-gray-900 mr-4 light:text-white">Bent u een ZZP'er</span>
                            <input
                                type="checkbox"
                                name="isZZPer"
                                id="isZZPer"
                                className="form-checkbox ml-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                checked={isZZPer}
                                onChange={(e) => setFormData({...formData, isZZPer: e.target.checked})}
                            />
                        </label>
                    </div>
                </div>

                <button onClick={(stepBack)}
                        className="text-white mr-3 bg-brand-orange hover:bg-hover-brand-orange focus:ring-4 focus:outline-none focus:ring-brand-orange-light font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-brand-orange-light light:hover:bg-hover-brand-orange light:focus:ring-hover-brand-orange">Terug
                </button>
                <button type="submit"
                        className="text-white bg-brand-orange hover:bg-hover-brand-orange focus:ring-4 focus:outline-none focus:ring-brand-orange-light font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-brand-orange-light light:hover:bg-hover-brand-orange light:focus:ring-hover-brand-orange">Volgende
                    stap
                </button>
            </form>
        </section>
    )
}

export default PersonalDetails;
