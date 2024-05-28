import React, {useEffect, useRef} from "react";
import "../styles/SidePanel.css";

function SidePanel({showSidePanel, children}) {
    const sidePanelRef = useRef(null);

    useEffect(() => {
        if (sidePanelRef.current) {
            sidePanelRef.current.style.right = showSidePanel ? '0' : '-30%';
        }
    }, [showSidePanel]);

    return (
        <div id='side-panel-root'>
            <div ref={sidePanelRef} className="side-panel">
                {children}
            </div>
        </div>
    );
}

export default SidePanel;
