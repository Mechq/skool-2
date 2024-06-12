import React, { useEffect, useState } from "react";
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
                console.log("Fetched commissionWorkshops: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [setIsOpen]);

    return (
        <div>
            <CommissionWorkshopList commissionWorkshops={commissionWorkshops}
                          setIsOpen={setIsOpen}
                          isOpen={isOpen}
                          setCommissionWorkshopId={setCommissionWorkshopId}
                          setCommissionWorkshops={setCommissionWorkshops}
                          />
        </div>
    );
}

export default CommissionWorkshops;
