import React, {useEffect, useState} from "react";
import List_invites from "../components/invites/List_invites";
import {jwtDecode} from "jwt-decode";


export function Invites() {
    const [invites, setInvites] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            let decodedToken;
            const token = localStorage.getItem('token');
            if (token) {
                decodedToken = jwtDecode(token);
                setUser(decodedToken);
            }
            try {
                const res = await fetch(`/api/invite/user/${decodedToken.id}`);
                const data = await res.json();
                setInvites(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData().then();
    }, []);

    return (
        <div>
            <List_invites
                invites={invites}
                user={user}
                setInvites={setInvites}
            />
        </div>
    );
}

export default Invites;
