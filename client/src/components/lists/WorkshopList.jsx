// import React from "react";

// export default function WorkshopList({ setShowSidePanel, setSidePanelContent, setWorkshopId, workshops, setRotateSpan }) {

//     const editWorkshop = (id) => {
//         setWorkshopId(id);
//         setSidePanelContent("edit");
//         setShowSidePanel(true);
//         setRotateSpan(true); // add this line
//     };

//     return (
//         <div>
//             <div className="flex flex-wrap -mx-3 mb-5">
//                 <div className="w-full max-w-full px-3 mb-6 mx-auto">
//                     <div className="overflow-x-auto">
//                         <table className="w-full my-0 align-middle text-dark border-neutral-200">
//                             <thead className="align-bottom">
//                             <tr className="font-semibold text-[0.95rem] text-secondary-dark">
//                                 <th className="pb-3 text-start min-w-[175px]">Name</th>
//                                 <th className="pb-3 text-end min-w-[100px]">Category</th>
//                                 <th className="pb-3 pr-12 text-end min-w-[175px]">Materials</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {workshops.map(workshop => (
//                                 <tr key={workshop.id} className="border-b border-dashed last:border-b-0 cursor-pointer" onClick={() => editWorkshop(workshop.id)}>
//                                     <td className="p-3 pl-0">{workshop.name}</td>
//                                     <td className="p-3 pr-0 text-end">{workshop.category}</td>
//                                     <td className="p-3 pr-12 text-end">{workshop.materials}</td>
//                                 </tr>
//                             ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from "react";

export default function WorkshopList({ setShowSidePanel, setSidePanelContent, setWorkshopId, workshops, setRotateSpan }) {

    const editWorkshop = (id) => {
        setWorkshopId(id);
        setSidePanelContent("edit");
        setShowSidePanel(true);
        setRotateSpan(true);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mr-6 ml-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Workshop Naam</th>
                        <th className="px-6 py-3">Catergorie</th>
                        <th className="px-6 py-3">Materialen</th>
                        <th className="px-6 py-3">Datum Aangemaakt</th>
                        <th className="px-6 py-3">Bewerken</th>
                    </tr>
                </thead>
                <tbody>
                    {workshops.map(workshop => (
                        <tr key={workshop.id} className="odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700 cursor-pointer" onClick={() => editWorkshop(workshop.id)}>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                                {workshop.name}
                            </td>
                            <td className="px-6 py-4">{workshop.subject}</td>
                            <td className="px-6 py-4">{workshop.category}</td>
                            <td className="px-6 py-4">{workshop.createdAt}</td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-[#f49700] light:text-[#f49700] hover:underline">Bewerken</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
