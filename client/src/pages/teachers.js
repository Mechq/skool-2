import React, {useEffect, useState} from "react";
import TeacherList from "../components/teachers/TeacherList";
import CreatePanelContent from "../components/workshopTemplates/CreatePanelContent";
import SidePanel from "../components/SidePanel";
import EditUserPanelContent from "../components/teachers/EditUserPanelContent";
import CreateButton from "../components/CreateButton";

export default function Teachers() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [userId, setUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const [rotateSpan, setRotateSpan] = useState(false);

    useEffect(() => {
        fetch('/api/user')
            .then(res => res.json())
            .then(data => {
                setUsers(data.data);
                console.log("Fetched teachers: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [setIsOpen]);

    return (
        <div>
            <SidePanel isOpen={isOpen}
                       setIsOpen={setIsOpen}
                       rotateSpan={rotateSpan}
                       setRotateSpan={setRotateSpan}>
                <CreateButton
                    setShowSidePanel={setIsOpen}
                    showSidePanel={isOpen}
                    setSidePanelContent={setSidePanelContent}
                    rotateSpan={rotateSpan}
                    setRotateSpan={setRotateSpan}/>
                {sidePanelContent === "create" &&
                    <CreatePanelContent setUsers={setUsers} setShowSidePanel={setIsOpen}/>}
                {sidePanelContent === "edit" &&
                    <EditUserPanelContent userId={userId} setShowSidePanel={setIsOpen}/>}
            </SidePanel>
            <TeacherList
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                setSidePanelContent={setSidePanelContent}
                setUserId={setUserId}
                users={users}
                setUsers={setUsers} 
                setRotateSpan={setRotateSpan}
            />
        </div>
    );
}