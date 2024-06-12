import React, { useEffect, useState } from "react";
// import InvitesList from "../components/lists/InvitesList";
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

        };

        fetchData();
    }, []);

    useEffect(() => {
        fetch(`/api/invite/user/${user.id}`)
            .then(res => res.json())
            .then(data => {
                console.log(user.id)
                setInvites(data.data);
                console.log("Fetched invites: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // return (
    //     <div>
            
            
    //         <CustomerList customers={customers}
    //                       setIsOpen={setIsOpen}
    //                       isOpen={isOpen}
    //                       setSidePanelContent={setSidePanelContent}
    //                       setCustomerId={setCustomerId}
    //                       setRotateSpan={setRotateSpan}
    //                       setCustomers={setCustomers}
    //                       />
    //     </div>
    // );
}

export default Customers;
