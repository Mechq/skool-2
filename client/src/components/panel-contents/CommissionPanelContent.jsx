import React, { useEffect, useState } from "react";

export default function CommissionPanelContent({ setShowSidePanel, setCommissions }) {
    const [details, setDetails] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [locationName, setLocationName] = useState("");

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

    const handleCustomerChange = (e) => {
        const selectedCustomerId = e.target.value;
        console.log(selectedCustomerId)
        setCustomerId(selectedCustomerId);
        setCustomerIdValid(true); // Reset validation state

        // Fetch location name for the selected customer
        fetch(`/api/location/default/${selectedCustomerId}`)
            .then(response => response.json())
            .then(data => {
                const locationData = data.data;
                const locationName = locationData ? locationData.name || "" : "";
                setLocationName(locationName);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLocationName(""); // Ensure locationName is always defined
            });
        console.log(locationName)
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
        console.log(commission)

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
                        <input type="text" id="details"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                               placeholder="Opdracht details" required/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="targetAudience"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Doelgroep</label>
                        <input type="text" id="targetAudience"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                               placeholder="doelgroep" required/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="location"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Locatie</label>
                        <input type="text" id="location" value={locationName} readOnly
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                               placeholder="Hogeschoollaan 1" required/>
                    </div>
                    <button type="submit" onClick={handleSubmit}
                            className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-brand-orange light:hover:bg-brand-orange light:focus:ring-brand-orange">Submit
                    </button>
            </form>
        </div>
);
}
