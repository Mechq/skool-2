import React, { useState } from "react";

export default function CreateButton({ setShowSidePanel, showSidePanel, setSidePanelContent }) {
    const [rotateSpan, setRotateSpan] = useState(false);

    const handleClick = () => {
        setSidePanelContent("create");
        setShowSidePanel(!showSidePanel);
        setRotateSpan(!rotateSpan);
    };

    return (
        <button
            className={`fixed right-4 bottom-4 px-4 h-12 bg-[#F49700] text-white text-2xl text-center border-none z-50 transition-colors ease-in-out hover:bg-[#e18d00] cursor-pointer`}
            onClick={handleClick}
        >
            <span className={`inline-block transition-transform ease-in-out duration-300 ${rotateSpan ? 'rotate-45' : ''}`}>
                {'+'}
            </span>
        </button>
    );
}
