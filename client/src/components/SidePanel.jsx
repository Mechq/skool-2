import React from "react";

function SidePanel({isOpen, setIsOpen, rotateSpan, setRotateSpan, children}) {

    return (
        <>
            <div
                className={
                    "fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
                    (isOpen
                        ? "transition-opacity opacity-100 duration-500 "
                        : "transition-opacity duration-500 opacity-0 pointer-events-none")
                }
            >
                <section
                    className={
                        "w-screen max-w-xl right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transform " +
                        (isOpen ? "translate-x-0 " : "translate-x-full")
                    }
                >
                    <article
                        className="relative w-screen max-w-xl pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
                        {children}
                    </article>
                </section>
            </div>
        </>
    );
}

export default SidePanel;
