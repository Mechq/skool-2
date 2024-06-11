import React, {useEffect, useState} from "react";
import SidePanel from "../components/SidePanel";
import EditPanelWorkshopContent from "../components/panel-contents/EditPanelWorkshopContent";
import UserProfile from "../components/lists/UserProfile";
import ProfileWorkshopList from "../components/lists/ProfileWorkshopList";
import {jwtDecode} from "jwt-decode";

function User() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [user, setUser] = useState({});
    const [rotateSpan, setRotateSpan] = useState(false);
    const [workshopId, setWorkshopId] = useState(null);
    const [workshops, setWorkshops] = useState([]);
    const [qualifiedWorkshops, setQualifiedWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
        }

        fetch(`/api/workshop`)
            .then(res => res.json())
            .then(data => {
                setWorkshops(data.data);
                console.log("Fetched workshops: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));

        fetch(`/api/teacherWorkshopQualification/${user.id}`)
            .then(res => res.json())
            .then(data => {
                setQualifiedWorkshops(data.data);
                console.log("Fetched workshops: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));

        setLoading(false);
    }, [user.id]);
    if (loading) {
        return <div>Loading...</div>;
    }

    console.log("User firstnae: ", user.firstName);

    const editUser = () => {
        setIsOpen(true);
        setSidePanelContent("edit");
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <UserProfile
                        user={user}
                        editUser={editUser}
                    />
                </div>
                <div>
                    <ProfileWorkshopList
                        user={user}
                        editUser={editUser}
                        workshops={workshops}
                        qualifiedWorkshops={qualifiedWorkshops}
                    />
                </div>
            </div>

            <SidePanel
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                rotateSpan={rotateSpan}
                setRotateSpan={setRotateSpan}
            >
                {sidePanelContent === "edit" && (
                    <EditPanelWorkshopContent
                        setShowSidePanel={setIsOpen}
                    />
                )}
            </SidePanel>
        </>
    );
}

export default User;
