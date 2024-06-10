import React, { useEffect, useState } from "react";
import SidePanel from "../components/SidePanel";
import EditPanelWorkshopContent from "../components/panel-contents/EditPanelWorkshopContent";
import PageSecurity from "../PageSecurity";
import UserProfile from "../components/lists/UserProfile";
import ProfileWorkshopList from "../components/lists/ProfileWorkshopList";
import {Navigate} from "react-router-dom";

function User() {
    const [isOpen, setIsOpen] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [userData, setUserData] = useState({});
    const [rotateSpan, setRotateSpan] = useState(false);
    const [workshopId, setWorkshopId] = useState(null);
    const [workshops, setWorkshops] = useState([]);
    const [qualifiedWorkshops, setQualifiedWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = PageSecurity();

    // useEffect(() => {
    //     if (isAuthenticated === false) {
    //         Navigate('/login');
    //     }
    // }, [isAuthenticated]);

    useEffect(() => {
        if (user && user.email) {
            Promise.all([
                fetch(`/api/user/email/${user.email}`).then(res => res.json()),
                fetch(`/api/workshop`).then(res => res.json()),
                fetch(`/api/teacherWorkshopQualification/${user.id}`).then(res => res.json())
            ])
                .then(([userData, workshopsData, qualifiedWorkshopsData]) => {
                    setUserData(userData.data);
                    setWorkshops(workshopsData.data);
                    setQualifiedWorkshops(qualifiedWorkshopsData.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user || !user.email) {
        return null;
    }

    console.log("User firstname: ", user.firstName);

    const editUser = () => {
        setIsOpen(true);
        setSidePanelContent("edit");
    };

    return (
        <>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-4">
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
