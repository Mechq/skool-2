import {React, useState, useEffect} from "react";
import "../styles/CreateWorkshopSidePanel.css";

function SidePanel({ showSidePanel, setShowSidePanel, children }) { // Add children prop here

    useEffect(() => {
        const sidePanel = document.querySelector('.side-panel');
        if (showSidePanel) {
            sidePanel.style.right = '0'; // Slide in
        } else {
            sidePanel.style.right = '-30%'; // Slide out
        }
    }, [showSidePanel]);

    return (
        <div id='side-panel-root'>
            <div className="side-panel">
                {children}
            </div>
        </div>
    )
}

export default SidePanel;