import React from "react";

export default function CreateButton({ setShowSidePanel, showSidePanel, setSidePanelContent, rotateSpan, setRotateSpan }) {
    const handleClick = () => {
        setSidePanelContent("create");
        setShowSidePanel(!showSidePanel);
        setRotateSpan(!rotateSpan);
    };

    return (
        <>


            <button
                type="button"
                onClick={handleClick}
                className={`fixed right-4 bottom-4 w-14 h-14 bg-brand-orange text-white rounded-full flex items-center justify-center transition-colors ease-in-out hover:bg-brand-orange-hover focus:outline-none z-50 ${rotateSpan ? 'rotate-45' : ''}`}
                style={{ transformOrigin: "center", transition: "transform 0.3s ease-in-out" }}
            >
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                    />
                </svg>
                <span className="sr-only">Open actions menu</span>
            </button>
        </>


    )
        ;
}
