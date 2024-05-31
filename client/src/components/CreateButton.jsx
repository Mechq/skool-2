import React from "react";

export default function CreateButton({ setShowSidePanel, showSidePanel, setSidePanelContent, rotateSpan, setRotateSpan }) {
    const handleClick = () => {
        setSidePanelContent("create");
        setShowSidePanel(!showSidePanel);
        setRotateSpan(!rotateSpan);
    };

    return (
        <button
            className="fixed right-4 bottom-4 w-12 h-12 bg-[#F49700] text-white text-2xl flex items-center justify-center rounded-full border-none z-50 transition-colors ease-in-out hover:bg-[#e18d00] cursor-pointer"
            onClick={handleClick}
        >
            <span className={`transition-transform ease-in-out duration-300 ${rotateSpan ? 'transform rotate-45' : ''}`}>
                {'+'}
            </span>
        </button>
    );
}