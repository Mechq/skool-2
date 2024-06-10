import React, { useEffect, useState } from "react";
import UserWorkshopCard from "../UserWorkshopCard";


export default function UserWorkshopList({ userWorkshops, setUserWorkshops }) {
    const [commissions, setCommissions] = useState([]);

    useEffect(() => {
        fetch('/api/workshop/commission')
            .then(res => res.json())
            .then(data => {
                const workshopsWithUniqueKey = data.data.map((workshop, index) => ({
                    ...workshop,
                    unique: index + 1 // Incremented number starting from 1
                }));
                setUserWorkshops(workshopsWithUniqueKey);
                console.log("Fetched workshops: ", workshopsWithUniqueKey);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [setUserWorkshops]);

    useEffect(() => {
        fetch('/api/commission/')
            .then(res => res.json())
            .then(data => {
                setCommissions(data.data);
                console.log("Fetched commissions: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const getCommissionDate = (commissionId) => {
        const commission = commissions.find(c => c.id === commissionId);
        if (commission) {
            const date = new Date(commission.date);
            return date.toLocaleDateString('nl-NL', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            });
        }
        return 'Unknown Date';
    };

    return (
        <>
            {userWorkshops.map((userWorkshop) => (
                <UserWorkshopCard
                    key={userWorkshop.unique}
                    userWorkshop={userWorkshop}
                    commissionDate={getCommissionDate(userWorkshop.id)} // Assuming id corresponds to commission id
                />
            ))}
        </>
    );
}
