// Profile.js

import React, { useEffect, useState } from "react";
import SidePanel from "../components/SidePanel";
import EditPanelContent_profile from "../components/profile/EditPanelContent_profile";
import List_profile from "../components/profile/List_profile";
import WorkshopTemplateList_profile from "../components/profile/WorkshopTemplateList_profile";
import { jwtDecode } from "jwt-decode";

export default function Profile() {
    const [isOpen, setIsOpen] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [user, setUser] = useState({});
    const [rotateSpan, setRotateSpan] = useState(false);
    const [workshops, setWorkshops] = useState([]);
    const [qualifiedWorkshops, setQualifiedWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [languages, setLanguages] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let decodedToken;
            const token = localStorage.getItem('token');
            if (token) {
                decodedToken = jwtDecode(token);
                setUser(decodedToken);
            }

            try {
                const [workshopRes, qualifiedWorkshopsRes, languagesRes] = await Promise.all([
                    fetch('/api/workshop'),
                    fetch(`/api/teacherWorkshopQualification/${decodedToken?.id}`),
                    fetch(`/api/user/language/${decodedToken?.id}`)
                ]);

                const workshopData = await workshopRes.json();
                setWorkshops(workshopData.data);

                const qualifiedWorkshopsData = await qualifiedWorkshopsRes.json();
                setQualifiedWorkshops(qualifiedWorkshopsData.data);

                const languagesData = await languagesRes.json();
                if (languagesData.status === 200) {
                    const languageNames = languagesData.data.map(language => language.name);
                    const languagesString = languageNames.join(', ');
                    setLanguages(languagesString);
                } else {
                    console.error("Failed to fetch languages");
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const editProfile = (id) => {
        setUserId(id);
        setSidePanelContent("edit");
        setIsOpen(true);
        setRotateSpan(true);
    };

    const fetchData = async () => {  // Define fetchData function
        let decodedToken;
        const token = localStorage.getItem('token');
        if (token) {
            decodedToken = jwtDecode(token);
            setUser(decodedToken);
        }

        try {
            const [workshopRes, qualifiedWorkshopsRes, languagesRes] = await Promise.all([
                fetch('/api/workshop'),
                fetch(`/api/teacherWorkshopQualification/${decodedToken?.id}`),
                fetch(`/api/user/language/${decodedToken?.id}`)
            ]);

            const workshopData = await workshopRes.json();
            setWorkshops(workshopData.data);

            const qualifiedWorkshopsData = await qualifiedWorkshopsRes.json();
            setQualifiedWorkshops(qualifiedWorkshopsData.data);

            const languagesData = await languagesRes.json();
            if (languagesData.status === 200) {
                const languageNames = languagesData.data.map(language => language.name);
                const languagesString = languageNames.join(', ');
                setLanguages(languagesString);
            } else {
                console.error("Failed to fetch languages");
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-3 md:px-0">
                <div>
                    <List_profile
                        user={user}
                        editProfile={editProfile}
                        languages={languages} // Ensure this is correctly passed down
                        setLanguages={setLanguages}
                    />
                </div>
                <div>
                    <WorkshopTemplateList_profile
                        user={user}
                        editProfile={editProfile}
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
                    <EditPanelContent_profile
                        user={user}
                        setShowSidePanel={setIsOpen}
                        languages={languages}
                        fetchData={fetchData} // Pass fetchData function as a prop
                    />
                )}
            </SidePanel>
        </>
    );
}
