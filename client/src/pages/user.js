import React, { useEffect, useState } from "react";
import SidePanel from "../components/SidePanel";
import EditPanelWorkshopContent from "../components/panel-contents/EditPanelWorkshopContent";
import UserProfile from "../components/lists/UserProfile";
import ProfileWorkshopList from "../components/lists/ProfileWorkshopList";
import {jwtDecode} from "jwt-decode";

function User() {
    const [isOpen, setIsOpen] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [user, setUser] = useState({});
    const [rotateSpan, setRotateSpan] = useState(false);
    const [workshopId, setWorkshopId] = useState(null);
    const [workshops, setWorkshops] = useState([]);
    const [qualifiedWorkshops, setQualifiedWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            let decodedToken;
            const token = localStorage.getItem('token');
            if (token) {
                decodedToken = jwtDecode(token);
                setUser(decodedToken);
            }

            try {
                const [workshopRes, qualifiedWorkshopsRes] = await Promise.all([
                    fetch('/api/workshop'),
                    fetch(`/api/teacherWorkshopQualification/${decodedToken?.id}`)
                ]);

                const workshopData = await workshopRes.json();
                setWorkshops(workshopData.data);
                // console.log("Fetched workshops: ", workshopData.data);

                const qualifiedWorkshopsData = await qualifiedWorkshopsRes.json();
                setQualifiedWorkshops(qualifiedWorkshopsData.data);
                // console.log("Fetched teacherWorkshops: ", qualifiedWorkshopsData.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    
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
