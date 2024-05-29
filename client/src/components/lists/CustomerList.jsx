import React, {useState, useEffect} from "react";

export default function CustomerList({customers}) {

    return (
        <div>
            <ul className="list">
                {customers.map(customer => (
                    <li key={customer.id}>
                        {customer.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
