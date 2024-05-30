import React, {useEffect, useRef} from "react";

function SidePanel({showSidePanel, children}) {
    const sidePanelRef = useRef(null);

    useEffect(() => {
        if (sidePanelRef.current) {
            sidePanelRef.current.style.right = showSidePanel ? '0' : '-30%';
        }
    }, [showSidePanel]);

    return (
        <div id='side-panel-root'>
            <div ref={sidePanelRef} className="h-[calc(100vh-90px)] w-[30vw] fixed z-10 bottom-0 right-0 bg-gray-200 overflow-x-hidden pt-5 transition-all">
                {children}
            </div>
        </div>
    );
}

export default SidePanel;
