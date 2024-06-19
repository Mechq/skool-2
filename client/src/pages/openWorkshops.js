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


    return (
        <div>
            <List_openWorkshops
                user = {user}
            />
        </div>
    );
}