import React, {useState, useEffect} from "react";

export default function CommissionList() {
    const [commissions, setCommissions] = useState([]);

    useEffect(() => {
        fetch('/api/commission')
            .then(res => res.json())
            .then(data => {
                setCommissions(data.data);
                console.log("Fetched commissions: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <ul className="list">
                {commissions.map(commission => (
                    <li key={commission.id}>
                        {commission.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
