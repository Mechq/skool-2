import React, {useEffect, useState} from "react";
import CommissionWorkshopList from "../components/lists/CommissionWorkshopList";

export function CommissionWorkshops() {
    const [isOpen, setIsOpen] = useState(false);
    const [commissionWorkshopId, setCommissionWorkshopId] = useState(null);
    const [commissionWorkshops, setCommissionWorkshops] = useState([]);

    useEffect(() => {
        fetch('/api/commissionWorkshop')
            .then(res => res.json())
            .then(data => {
                setCommissionWorkshops(data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [setIsOpen]);

    return (
        <div>
            <CommissionWorkshopList
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                commissionWorkshops={commissionWorkshops}
                setCommissionWorkshops={setCommissionWorkshops}
            />
        </div>
    );
}

export default CommissionWorkshops;
