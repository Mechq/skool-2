import React, { useEffect, useState } from "react";

export default function CommissionPanelContent({ setShowSidePanel, setCommissions }) {
    const [details, setDetails] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [locationName, setLocationName] = useState("");
    const [locations, setLocations] = useState([]); // Locations state

    const [detailsValid, setDetailsValid] = useState(true);
    const [targetAudienceValid, setTargetAudienceValid] = useState(true);
    const [customerIdValid, setCustomerIdValid] = useState(true);
    const [locationNameValid, setLocationNameValid] = useState(true);

    const [customers, setCustomers] = useState([]); // Customers state

    useEffect(() => {
        fetch('/api/customer')
            .then(response => response.json())
            .then(data => {
                setCustomers(data.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const getCustomerLocations = (id) => {
        fetch(`/api/location/customer/${id}`)
            .then(response => response.json())
            .then(data => {
                // Ensure that data.data is an array before setting it to the state
                setLocations(Array.isArray(data.data) ? data.data : []);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleCustomerChange = async (e) => {
        const selectedCustomerId = e.target.value;
        setCustomerId(selectedCustomerId);
        setCustomerIdValid(true); // Reset validation state

        // Clear previous locations and location name
        setLocations([]);
        setLocationName("");

        try {
            // Fetch default location name for the selected customer
            const defaultLocationResponse = await fetch(`/api/location/default/${selectedCustomerId}`);
            const defaultLocationData = await defaultLocationResponse.json();
            const defaultLocationName = defaultLocationData.data ? defaultLocationData.data.name || "" : "";
            setLocationName(defaultLocationName);

            // Fetch locations for the selected customer
            const locationsResponse = await fetch(`/api/location/customer/${selectedCustomerId}`);
            const locationsData = await locationsResponse.json();
            // Ensure that locationsData.data is an array before setting it to the state
            setLocations(Array.isArray(locationsData.data) ? locationsData.data : []);

        } catch (error) {
            console.error('Error:', error);
            setLocationName(""); // Ensure locationName is always defined
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation
        const customerId = document.getElementById('customerName').value;
        const details = document.getElementById('details').value;
        const targetAudience = document.getElementById('targetAudience').value;

        if (!details || !targetAudience || !customerId) return;

        const commission = {
            details,
            targetAudience,
            customerId
        };
        console.log(commission);

        fetch('/api/commission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commission),
        })
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                setCustomerId('');
                setTargetAudience('');
                setDetails('');
                setLocationName('');

                fetch('/api/commission')
                    .then(res => res.json())
                    .then(data => {
                        setCommissions(data.data);
                        setShowSidePanel(false);
                    })
                    .catch(error => console.error('Error fetching data:', error));
            })
            .catch((error) => {
                console.error('Error:', error);
                setCustomerIdValid(false); // Set customerId as invalid
            });
    };

    return (
        <div className="px-6">
            <header className="pt-4 pb-4 font-bold text-lg">Opdracht aanmaken</header>
            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="customerName"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Kies een
                            klant</label>
                        <select id="customerName" required={true} onChange={handleCustomerChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500">
                            <option value="">Selecteer een klant</option>
                            {customers.map(customer => (
                                <option key={customer.id} value={customer.id}>{customer.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="details"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Details</label>
                    <input type="text" id="details" value={details} onChange={(e) => setDetails(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                           placeholder="Opdracht details" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="targetAudience"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Doelgroep</label>
                    <input type="text" id="targetAudience" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                           placeholder="doelgroep" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="location"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">
                        Locatie
                    </label>
                    <select id="location" value={locationName} onChange={(e) => setLocationName(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                            required>
                        {locationName && (
                            <option value={locationName}>
                                {locationName}
                            </option>
                        )}
                        {locations.map((location) => (
                            <option key={location.id} value={location.name}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" onClick={handleSubmit}
                        className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-brand-orange light:hover:bg-brand-orange light:focus:ring-brand-orange">Submit
                </button>
            </form>
        </div>
    );
}
