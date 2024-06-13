import React, {useEffect, useState} from "react";
import List_workshops from "../components/commissionWorkshops/List_workshops";

export function Workshops() {
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
            <List_workshops
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                commissionWorkshops={commissionWorkshops}
                setCommissionWorkshops={setCommissionWorkshops}
            />
        </div>
    );
}

export default Workshops;
