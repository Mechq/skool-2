import React, {useEffect, useState} from "react";
import List_openWorkshops from "../components/openWorkshops/List_openWorkshops";
import {jwtDecode} from "jwt-decode";

export default function OpenWorkshops() {
const [userWorkshops, setUserWorkshops] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            let decodedToken;
            const token = localStorage.getItem('token');
            if (token) {
                decodedToken = jwtDecode(token);
                setUser(decodedToken);
            }
        }
        fetchData().then()
    }, [])

    useEffect(() => {
        if (user.id) {
            fetch(`/api/workshop/commission/user/${user.id}`)
                .then(res => res.json())
                .then(data => {
                    // filteredData = data.data.filter(workshop => workshop.userId === user.id);
                    setUserWorkshops(data.data);
                    console.log("Fetched workshops: ", data.data);
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, []);

    return (
        <div>
            <List_openWorkshops
                userWorkshops={userWorkshops}
                setUserWorkshops={setUserWorkshops}
                user = {user}
            />
        </div>
    );
}