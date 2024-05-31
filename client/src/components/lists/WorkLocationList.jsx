
// // import React from "react";

// // export default function WorkLocationList({ workLocations }) {

// //     return (
// //         <div>
// //             <div className="flex-container">
// //                 <div className="table-wrapper">
// //                     <div className="table-responsive">
// //                         <table className="work-location-table min-w-full divide-y divide-gray-200">
// //                             <thead className="table-header bg-gray-50">
// //                                 <tr>
// //                                     <th className="header-cell start px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody className="bg-white divide-y divide-gray-200">
// //                                 {workLocations.map(workLocation => (
// //                                     <tr key={workLocation.id} className="table-row" onClick={() => console.log(`Selected: ${workLocation.id}`)}>
// //                                         <td className="table-cell start px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{workLocation.name}</td>
// //                                     </tr>
// //                                 ))}
// //                             </tbody>
// //                         </table>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }


// import React from "react";

// export default function WorkLocationList({
//     setShowSidePanel,
//     setSidePanelContent,
//     setWorkLocationId,
//     workLocations = [],
//     setRotateSpan
// }) {

//     const editWorkLocation = (id) => {
//         setWorkLocationId(id);
//         setSidePanelContent("edit");
//         setShowSidePanel(true);
//         setRotateSpan(true);
//     };

//     return (
//         <div>
//             <div className="flex-container">
//                 <div className="table-wrapper">
//                     <div className="table-responsive">
//                         <table className="work-location-table min-w-full divide-y divide-gray-200">
//                             <thead className="table-header bg-gray-50">
//                                 <tr>
//                                     <th className="header-cell start px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {workLocations.map(workLocation => (
//                                     <tr key={workLocation.id} className="table-row" onClick={() => editWorkLocation(workLocation.id)}>
//                                         <td className="table-cell start px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{workLocation.name}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


import React from "react";
import Worklocation from "../../pages/worklocation";

export default function WorkLocationList({
    setShowSidePanel,
    setSidePanelContent,
    setWorkLocationId,
    workLocations = [],
    setRotateSpan
}) {

    const editWorkLocation = (id) => {
        setWorkLocationId(id);
        setSidePanelContent("edit");
        setShowSidePanel(true);
        setRotateSpan(true);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mr-6 ml-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Locatie Naam</th>
                        <th className="px-6 py-3"></th>
                        <th className="px-6 py-3"></th>
                        <th className="px-6 py-3">Datum Aangemaakt</th>
                        <th className="px-6 py-3">Bewerken</th>
                    </tr>
                </thead>
                <tbody>
                    {workLocations.map(Worklocation => (
                        <tr key={Worklocation.id} className="odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                                {Worklocation.name}
                            </td>
                            <td className="px-6 py-4">{Worklocation.naam}</td>
                            <td className="px-6 py-4">{Worklocation.category}</td>
                            <td className="px-6 py-4">{Worklocation.createdAt}</td>
                            <td className="px-6 py-4">
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    editWorkLocation(Worklocation.id);
                                }} className="font-medium text-[#f49700] light:text-[#f49700] hover:underline">Bewerken</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
