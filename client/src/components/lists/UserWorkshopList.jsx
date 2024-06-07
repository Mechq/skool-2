import React, { useEffect, useState } from "react";
import UserWorkshopCard from "../UserWorkshopCard";

export default function UserWorkshopList({  userWorkshops, setUserWorkshops
                                       }) {

    useEffect(() => {

        fetch('/api/userWorkshop')
            .then(res => res.json())
            .then(data => {
                setUserWorkshops(data.data);
                console.log("Fetched teachers: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [])

    const tempUserWorkshops = [{
        id: 1,
       title: "Workshop 1",
    description: "Description 1",},{
        id: 2,
        title: "Workshop 2",
        description: "Description 2",}]

    return (
        <>
            {tempUserWorkshops.map((userWorkshop) => (
                <UserWorkshopCard key={userWorkshop.id} userWorkshop={userWorkshop} />
            ))}
        </>
    );
}
