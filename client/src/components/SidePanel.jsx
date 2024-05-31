import React, {useRef} from "react";

function SidePanel({isOpen, setIsOpen,  rotateSpan, setRotateSpan, children}) {
    const sidePanelRef = useRef(null);

    return (
        <>
            {isOpen && (
                <div
                    className={
                        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
                        (isOpen
                            ? " transition-opacity opacity-100 duration-500 "
                            : " transition-opacity duration-500 opacity-0 ")
                    }
                    onClick={() => {
                        setIsOpen(false);
                        setRotateSpan(!rotateSpan);

                    }}
                >
                    <section
                        className={
                            " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
                            (isOpen ? " translate-x-0 " : " translate-x-full ")
                        }
                    >
                        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
                            <header className="p-4 font-bold text-lg">Header</header>
                            {children}
                        </article>
                    </section>
                </div>
            )}
        </>



        //
        // <div id='side-panel-root'>
        //     <div ref={sidePanelRef} className="h-[calc(100vh-90px)] w-[30vw] fixed z-10 bottom-0 right-0 bg-gray-200 overflow-x-hidden pt-5 transition-all">
        //         {children}
        //     </div>
        // </div>
    );
}

export default SidePanel;
