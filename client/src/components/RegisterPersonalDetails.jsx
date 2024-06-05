import React, {useEffect, useState} from 'react';

const PersonalDetails = ({ formData, setFormData, createAccount, stepBack }) => {

    const [streetName, setStreetName] = useState("");
    const [houseNr, setHouseNr] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [kvkNr, setKvkNr] = useState("");
    const [btwNr, setBtwNr] = useState("");
    const [iban, setIban] = useState("");
    const [workshops, setWorkshops] = useState("");

    const [streetNameValid, setStreetNameValid] = useState(true);
    const [houseNrValid, setHouseNrValid] = useState(true);
    const [postalCodeValid, setPostalCodeValid] = useState(true);
    const [cityValid, setCityValid] = useState(true);
    const [kvkNrValid, setKvkNrValid] = useState(true);
    const [btwNrValid, setBtwNrValid] = useState(true);
    const [ibanValid, setIbanValid] = useState(true);
    const [workshopsValid, setWorkshopsValid] = useState(true);

    const handleRegister = (e) => {
        e.preventDefault();

        if (!streetName) setStreetNameValid(false);
        if (!houseNr) setHouseNrValid(false);
        if (!postalCode) setPostalCodeValid(false);
        if (!city) setCityValid(false);
        if (!kvkNr) setKvkNrValid(false);
        if (!btwNr) setBtwNrValid(false);
        if (!iban) setIbanValid(false);

        console.log(streetName, houseNr, postalCode, city, kvkNr, btwNr, iban, workshops)

        if (postalCode) {
            postalCode.trim();
        }
        if (btwNr) {
            btwNr.trim();
        }
        if (iban) {
            iban.trim();
        }

        if (!streetName || !houseNr || !postalCode || !city || !kvkNr || !btwNr || !iban ) return;
        if (postalCode.length != 6) {
            setPostalCodeValid(false);
            return;
        }

        if (btwNr.length != 14) {
            setBtwNrValid(false);
            return;
        }

        if (houseNr.length > 5) {
            setHouseNrValid(false);
            return;
        }

        if (iban.length != 18) {
            setIbanValid(false);
            return;
        }

        console.log(streetName, houseNr, postalCode, city, kvkNr, btwNr, iban, workshops)

        setFormData({
            ...formData,
            street: streetName,
            houseNumber: houseNr,
            postalCode: postalCode,
            city: city,
            kvkNumber: kvkNr,
            btwNumber: btwNr,
            iban: iban,
            workshops: workshops
        });

        createAccount();
    }
    return (
        <>
                <form onSubmit={handleRegister}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 light:text-white">Persoonlijke Gegevens</h3>
                    <div className="grid gap-4 mb-4 sm:grid-cols-4">
                        <div>
                            <label htmlFor="streetName"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Straatnaam</label>
                            <input type="text" name="streetName" id="streetName"
                                className={`bg-gray-50 border ${streetNameValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                                placeholder="straatnaam" required=""
                                value={streetName} onChange={(e) => {
                                setStreetName(e.target.value);
                                setStreetNameValid(true);
                                }}/>
                        </div>
                        <div>
                            <label htmlFor="houseNr"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Huisnummer</label>
                            <input type="text" name="houseNr" id="houseNr"
                                className={`bg-gray-50 border ${houseNrValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                                placeholder="huisnummer" required=""
                                value={houseNr} onChange={(e) => {
                                setHouseNr(e.target.value);
                                setHouseNrValid(true);
                                }}/>
                        </div>
                        <div>
                            <label htmlFor="postalCode"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Postcode</label>
                            <input type="text" name="phoneNr" id="phoneNr"
                                className={`bg-gray-50 border ${postalCodeValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                                placeholder="1234AB" required=""
                                value={postalCode} onChange={(e) => {
                                setPostalCode(e.target.value);
                                setPostalCodeValid(true);
                                }}/>
                        </div>
                        <div>
                            <label htmlFor="city"
                                className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Stad</label>
                            <input type="text" name="city" id="city"
                                className={`bg-gray-50 border ${cityValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                                placeholder="stad" required=""
                                value={city} onChange={(e) => {
                                setCity(e.target.value);
                                setCityValid(true);
                                }}/>
                        </div> 
                    </div>
                    <div className="grid gap-4 mb-4 sm:grid-cols-3">
                        <div>
                                <label htmlFor="kvkNr"
                                    className="block mb-2 text-sm font-medium text-gray-900 light:text-white">KvK Nummer</label>
                                <input type="number" name="kvkNr" id="kvkNr"
                                    className={`bg-gray-50 border ${kvkNrValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                                    placeholder="kvk nummer" required=""
                                    value={kvkNr} onChange={(e) => {
                                    setKvkNr(e.target.value);
                                    setKvkNrValid(true);
                                    }}/>
                        </div>
                        <div>
                            <label htmlFor="btwNr"
                                className="block mb-2 text-sm font-medium text-gray-900 light:text-white">BTW Nummer</label>
                            <input type="text" name="btwNr" id="btwNr"
                                className={`bg-gray-50 border ${kvkNrValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                                placeholder="btw nummer" required=""
                                value={btwNr} onChange={(e) => {
                                setBtwNr(e.target.value);
                                setBtwNrValid(true);
                                }}/>
                        </div>
                        <div>
                            <label htmlFor="iban"
                                className="block mb-2 text-sm font-medium text-gray-900 light:text-white">IBAN Nummer</label>
                            <input type="text" name="iban" id="iban"
                                className={`bg-gray-50 border ${kvkNrValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                                placeholder="iban nummer" required=""
                                value={iban} onChange={(e) => {
                                setIban(e.target.value);
                                setIbanValid(true);
                                }}/>
                        </div>
                    </div>
                    <div className="grid gap-4 mb-4 grid-cols-5">
                    <button onClick={(stepBack)}
                        className="text-white bg-brand-orange hover:bg-hover-brand-orange focus:ring-4 focus:outline-none focus:ring-brand-orange-light font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-brand-orange-light light:hover:bg-hover-brand-orange light:focus:ring-hover-brand-orange">Terug</button>
                        <button type='submit' 
                        className="text-white bg-brand-orange hover:bg-hover-brand-orange focus:ring-4 focus:outline-none focus:ring-brand-orange-light font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-brand-orange-light light:hover:bg-hover-brand-orange light:focus:ring-hover-brand-orange">Account Aanmaken</button>
                        
                    </div>
                </form>
        </>
    )
}

export default PersonalDetails;