import React from "react";

export default function WorkshopList({ setShowSidePanel, setSidePanelContent, setWorkshopId, workshops, setRotateSpan }) {

    const editWorkshop = (id) => {
        setWorkshopId(id);
        setSidePanelContent("edit");
        setShowSidePanel(true);
        setRotateSpan(true); // add this line
    };

    return (
        <div>
            <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full max-w-full px-3 mb-6 mx-auto">
                    <div className="overflow-x-auto">
                        <table className="w-full my-0 align-middle text-dark border-neutral-200">
                            <thead className="align-bottom">
                            <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                                <th className="pb-3 text-start min-w-[175px]">Name</th>
                                <th className="pb-3 text-end min-w-[100px]">Category</th>
                                <th className="pb-3 pr-12 text-end min-w-[175px]">Materials</th>
                            </tr>
                            </thead>
                            <tbody>
                            {workshops.map(workshop => (
                                <tr key={workshop.id} className="border-b border-dashed last:border-b-0 cursor-pointer" onClick={() => editWorkshop(workshop.id)}>
                                    <td className="p-3 pl-0">{workshop.name}</td>
                                    <td className="p-3 pr-0 text-end">{workshop.category}</td>
                                    <td className="p-3 pr-12 text-end">{workshop.materials}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
