import React, {useEffect, useState} from "react";
import SidePanel from "../components/SidePanel";
import EditPanelContent_workshopTemplates from "../components/workshopTemplates/EditPanelContent_workshopTemplates";
import List_profile from "../components/profile/List_profile";
import WorkshopTemplateList_profile from "../components/profile/WorkshopTemplateList_profile";
import {jwtDecode} from "jwt-decode";

export default function Profile() {
    const [isOpen, setIsOpen] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [user, setUser] = useState({});
    const [rotateSpan, setRotateSpan] = useState(false);
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

                const qualifiedWorkshopsData = await qualifiedWorkshopsRes.json();
                setQualifiedWorkshops(qualifiedWorkshopsData.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData().then();
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-3 md:px-0">
                <div>
                    <List_profile
                        user={user}
                        editUser={editUser}
                    />
                </div>
                <div>
                    <WorkshopTemplateList_profile
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
                    <EditPanelContent_workshopTemplates
                        setShowSidePanel={setIsOpen}
                    />
                )}
            </SidePanel>
        </>
    );
}

