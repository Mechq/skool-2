import React, { useEffect, useState } from "react";

export function CommissionWorkshops() {
    const [isOpen, setIsOpen] = useState(false);
    const [commissionWorkshopId, setcommissionWorkshopId] = useState(null);
    const [CommissionWorkshops, setcommissionWorkshops] = useState([]);

    useEffect(() => {
        fetch('/api/workshop/commission')
            .then(res => res.json())
            .then(data => {
                setcommissionWorkshops(data.data);
                console.log("Fetched commissionWorkshops: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [setIsOpen]);

}

export default CommissionWorkshops