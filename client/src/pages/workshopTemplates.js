import React, { useEffect, useState } from "react";
import List_workshopTemplates from "../components/workshopTemplates/List_workshopTemplates";
import CreatePanelContent_workshopTemplates from "../components/workshopTemplates/CreatePanelContent_workshopTemplates";
import SidePanel from "../components/SidePanel";
import EditPanelContent_workshopTemplates from "../components/workshopTemplates/EditPanelContent_workshopTemplates";
import CreateButton from "../components/CreateButton";

export default function WorkshopTemplates() {
    const [isOpen, setIsOpen] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [workshopId, setWorkshopId] = useState(null);
    const [workshops, setWorkshops] = useState([]);
    const [rotateSpan, setRotateSpan] = useState(false);
    const [isAccordionOpen, setIsAccordionOpen] = useState([]);
    const [isAllExpanded, setIsAllExpanded] = useState(false);

    const categories = ['Beeldende kunst', 'Dans', 'Media', 'Muziek', 'Sport', 'Theater'];

    useEffect(() => {
        fetch('/api/workshop')
            .then(res => res.json())
            .then(data => {
                setWorkshops(data.data);
                console.log("Fetched workshops: ", data.data);
                setIsAccordionOpen(Array(categories.length).fill(false)); // Initialize isAccordionOpen
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const toggleAllAccordions = () => {
        const allExpanded = !isAllExpanded;
        setIsAllExpanded(allExpanded);
        setIsAccordionOpen(Array(categories.length).fill(allExpanded));
    };

    return (
        <div>
            <CreateButton
                setShowSidePanel={setIsOpen}
                showSidePanel={isOpen}
                setSidePanelContent={setSidePanelContent}
                rotateSpan={rotateSpan}
                setRotateSpan={setRotateSpan}
                toggleAllAccordions={toggleAllAccordions}
                isAllExpanded={isAllExpanded}
            />

            <SidePanel isOpen={isOpen}
                       setIsOpen={setIsOpen}
                       rotateSpan={rotateSpan}
                       setRotateSpan={setRotateSpan}>
                {sidePanelContent === "create" &&
                    <CreatePanelContent_workshopTemplates setWorkshops={setWorkshops} setShowSidePanel={setIsOpen}/>}
                {sidePanelContent === "edit" &&
                    <EditPanelContent_workshopTemplates workshopId={workshopId} setShowSidePanel={setIsOpen}/>}
            </SidePanel>

            <List_workshopTemplates
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                setSidePanelContent={setSidePanelContent}
                setWorkshopId={setWorkshopId}
                workshops={workshops}
                setWorkshops={setWorkshops}
                setRotateSpan={setRotateSpan}
                isAccordionOpen={isAccordionOpen}
                setIsAccordionOpen={setIsAccordionOpen}
                categories={categories}
                isAllExpanded={isAllExpanded}
                setIsAllExpanded={setIsAllExpanded}
            />

            {/* Footer bar */}
            <div className="w-full">
                <div className="relative overflow-hidden bg-white rounded-b-lg shadow-md light:bg-gray-800">
                    <nav className="flex flex-row items-center justify-between p-4" aria-label="Table navigation">
                        <button type="button" onClick={toggleAllAccordions}
                                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-brand-orange hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 light:bg-primary-600 light:hover:bg-primary-700 focus:outline-none light:focus:ring-primary-800">
                            {isAllExpanded ? "Alles invouwen" : "Alles uitvouwen"}
                        </button>
                        <p className="text-sm">
                            <span className="font-normal text-gray-500 light:text-gray-400">Totaal aantal workshop templates: </span>
                            <span className="font-semibold text-gray-900 light:text-white">{workshops?.length}</span>
                        </p>
                    </nav>
                </div>
            </div>
        </div>
    );
}
