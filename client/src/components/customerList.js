import React, { useState, useEffect } from "react";
import "../styles/customerList.css";

function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch('/api/customer')
            .then(res => res.json())
            .then(data => setCustomers(data.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    console.log(customers);

    return (
        <div>
            <h1>Customers</h1>
            <ul className={"list"}>
                {customers.map(customer => (
                    <li key={customer.id}>{customer.organizationName}</li>
                ))}
            </ul>
        </div>
    );
}

export default CustomerList;
