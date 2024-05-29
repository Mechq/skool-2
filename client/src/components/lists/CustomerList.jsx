import React, {useState, useEffect} from "react";

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch('/api/customer')
            .then(res => res.json())
            .then(data => {
                setCustomers(data.data);
                console.log("Fetched customers: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <ul className="list">
                {customers.map(customer => (
                    <li key={customer.id}>
                        {customer.details}
                    </li>
                ))}
            </ul>
        </div>
    );
}
