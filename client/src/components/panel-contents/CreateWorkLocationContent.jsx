import React, {useState, useEffect} from "react";

export default function CreateWorkLocationContent({setWorkLocations, setShowSidePanel}) {
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const location = {
            name: name,
            street: street,
            houseNumber: houseNumber,
            city: city,
            postalCode: postalCode
        };

        fetch('/api/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(location),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setName('');
                setStreet('');
                setHouseNumber('');
                setCity('');
                setPostalCode('');

                fetch('/api/location')
                    .then(res => res.json())
                    .then(data => {
                        setWorkLocations(data.data);
                        setShowSidePanel(false);
                    })
                    .catch(error => console.error('Error fetching data:', error));

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="px-6">
            <header className="pt-4 pb-4 font-bold text-lg">Create Work Location</header>
            <form>
                <div className="mb-6">
                    <label htmlFor="locationName"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Locatie naam</label>
                    <input type="text" id="locationName"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                           placeholder="Hoofdkantoor A" required/>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="street"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Straat</label>
                        <input type="text" id="street" value={name} onChange={(e) => setName(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                               placeholder="Dorpstraat" required/>
                    </div>
                    <div>
                        <label htmlFor="houseNumber"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Huisnummer</label>
                        <input type="text" id="houseNumber" value={street} onChange={(e) => setStreet(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                               placeholder="1" required/>
                    </div>
                    <div>
                        <label htmlFor="postalCode"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Postcode</label>
                        <input type="text" id="postalCode" value={houseNumber}
                               onChange={(e) => setHouseNumber(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                               placeholder="1234 AB" required/>
                    </div>
                    <div>
                        <label htmlFor="city"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">City</label>
                        <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                               placeholder="Roelofarendsveen" required/>
                    </div>
                </div>
                <button type="submit" onClick={handleSubmit}
                        className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-brand-orange light:hover:bg-brand-orange light:focus:ring-brand-orange">Submit
                </button>
            </form>
        </div>
    );
}


// {/*<h1 className='side-panel-title'>Create Work Location</h1>*/}
//         {/*<div className='side-panel-content'>*/}
//         {/*    <form action="#" method="get" className="form-container">*/}
//         {/*        <div className="form-group">*/}
//         {/*            <input*/}
//         {/*                type="text"*/}
//         {/*                id="name"*/}
//         {/*                name="name"*/}
//         {/*                value={name}*/}
//         {/*                onChange={(e) => {*/}
//         {/*                    setName(e.target.value);*/}
//         {/*                    setNameValid(true); // Reset validation state*/}
    //         {/*                }}*/}
    //         {/*                className={nameValid ? "" : "invalid"}  // Apply CSS class*/}
    //         {/*                placeholder="Naam"*/}
    //         {/*            />*/}
    //         {/*            <input*/}
    //         {/*                type="text"*/}
    //         {/*                id="street"*/}
    //         {/*                name="street"*/}
    //         {/*                value={street}*/}
    //         {/*                onChange={(e) => {*/}
    //         {/*                    setStreet(e.target.value);*/}
    //         {/*                    setStreetValid(true);  // Reset validation state*/}
    //         {/*                }}*/}
    //         {/*                className={streetValid ? "" : "invalid"}  // Apply CSS class*/}
    //         {/*                placeholder="Straat"*/}
    //         {/*            />*/}
    //         {/*            <input*/}
    //         {/*                type="text"*/}
    //         {/*                id="houseNumber"*/}
    //         {/*                name="houseNumber"*/}
    //         {/*                value={houseNumber}*/}
    //         {/*                onChange={(e) => {*/}
    //         {/*                    setHouseNumber(e.target.value);*/}
    //         {/*                    setHouseNumberValid(true);  // Reset validation state*/}
    //         {/*                }}*/}
    //         {/*                className={houseNumberValid ? "" : "invalid"}  // Apply CSS class*/}
    //         {/*                placeholder="Huisnummer"*/}
    //         {/*            />*/}
    //         {/*            <input*/}
    //         {/*                type="text"*/}
    //         {/*                id="city"*/}
    //         {/*                name="city"*/}
    //         {/*                value={city}*/}
    //         {/*                onChange={(e) => {*/}
    //         {/*                    setCity(e.target.value);*/}
    //         {/*                    setCityValid(true);  // Reset validation state*/}
    //         {/*                }}*/}
    //         {/*                className={cityValid ? "" : "invalid"}  // Apply CSS class*/}
    //         {/*                placeholder="Stad"*/}
    //         {/*            />*/}
    //         {/*            <input*/}
    //         {/*                type="text"*/}
    //         {/*                id="postalCode"*/}
    //         {/*                name="postalCode"*/}
    //         {/*                value={postalCode}*/}
    //         {/*                onChange={(e) => {*/}
    //         {/*                    setPostalCode(e.target.value);*/}
    //         {/*                    setPostalCodeValid(true);  // Reset validation state*/}
    //         {/*                }}*/}
    //         {/*                className={postalCodeValid ? "" : "invalid"}  // Apply CSS class*/}
    //         {/*                placeholder="Postcode"*/}
    //         {/*            />*/}
    //         {/*        </div>*/}
    //         {/*        <button className="submit-fab fab-common" onClick={handleSubmit}>Aanmaken</button>*/}
    //         {/*    </form>*/}
    //         {/*</div>*/}

