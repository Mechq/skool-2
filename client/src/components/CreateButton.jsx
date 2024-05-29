import React from "react";
import '../styles/components/CreateWorkshopButton.css';

export default function CreateButton({setShowSidePanel, showSidePanel, setSidePanelContent}) {
    const handleClick = () => {
        setSidePanelContent("create");
        setShowSidePanel(!showSidePanel);
    };

    return (
        <button className='fab fab-common' onClick={handleClick}>
            <span className={showSidePanel ? "rotate" : ""}>{'+'}</span>
        </button>
    );
}
