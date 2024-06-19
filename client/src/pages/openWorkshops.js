import React, {useEffect, useState} from "react";
import List_openWorkshops from "../components/openWorkshops/List_openWorkshops";
import {jwtDecode} from "jwt-decode";

export default function OpenWorkshops() {
const [userWorkshops, setUserWorkshops] = useState([]);
    const [user, setUser] = useState({});
    // const [qualifications, setQualifications] = useState([]);
    // const [qualifiedWorkshops, setQualifiedWorkshops] = useState([]);
    // const [loading, setLoading] = useState(true);


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


    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (user.id) {
    //             try {
    //                 const workshopResponse = await fetch(`/api/workshop/commission/user/${user.id}`);
    //                 const workshopData = await workshopResponse.json();
    //                 setUserWorkshops(workshopData.data);
    //                 console.log("Fetched workshops: ", workshopData.data);
    //
    //                 const qualificationsResponse = await fetch(`/api/teacherWorkshopQualification/${user.id}`);
    //                 const qualificationsData = await qualificationsResponse.json();
    //                 setQualifications(qualificationsData.data);
    //                 console.log("Fetched qualifications: ", qualificationsData.data);
    //
    //                 // Filter workshops based on qualifications using category
    //                 const filteredWorkshops = workshopData.data.filter(workshop =>
    //                     qualificationsData.data.some(qualification => qualification.category === workshop.category)
    //                 );
    //                 setQualifiedWorkshops(filteredWorkshops);
    //                 console.log("Filtered workshops: ", filteredWorkshops);
    //             } catch (error) {
    //                 console.error('Error fetching data:', error);
    //             }
    //         }
    //     };
    //
    //     fetchData();
    //     setLoading(false);
    // }, [user.id]);
    //
    //
    // if (loading) {
    //     return <p>Loading...</p>;
    // }


    return (
        <div>
            <List_openWorkshops
                // userWorkshops={userWorkshops}
                // setUserWorkshops={setUserWorkshops}
                user = {user}
                // qualifications= {qualifications}
            />
        </div>
    );
}