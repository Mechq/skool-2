import React, {useEffect, useState} from "react";
import TeacherList from "../components/lists/TeacherList";

import PageSecurity from "../PageSecurity";
import UserWorkshopList from "../components/lists/UserWorkshopList";

export default function UserWorkshops() {
const [userWorkshops, setUserWorkshops] = useState([]);


    useEffect(() => {
        fetch('/api/userWorkshop')
            .then(res => res.json())
            .then(data => {
                setUserWorkshops(data.data);
                console.log("Fetched teachers: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const user = PageSecurity();

    return (
        <div>
            <UserWorkshopList
                userWorkshops={userWorkshops}
                setUserWorkshops={setUserWorkshops}
            />
        </div>
    );
}