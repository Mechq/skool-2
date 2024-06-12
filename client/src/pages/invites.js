import React, { useEffect, useState } from "react";
import InvitesList from "../components/lists/InvitesList";
import {jwtDecode} from "jwt-decode";


export function Customers() {
    const [inviteId, setInviteId] = useState(null);
    const [invites, setInvites] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            let decodedToken;
            const token = localStorage.getItem('token');
            if (token) {
                decodedToken = jwtDecode(token);
                setUser(decodedToken);

                console.log(user);
            }
            console.log("decodedToken: ", decodedToken)
            try {
                const res = await fetch(`/api/invite/user/${decodedToken.id}`);
                const data = await res.json();
                setInvites(data.data);
                console.log("Fetched invites: ", data.data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }


        };

        fetchData();
    }, []);


    return (
        <div>
            
            
        <InvitesList
            setInviteId={setInviteId}
            invites={invites}
            user={user}
            setInvites={setInvites}
        />
        </div>
    );
}

export default Customers;
