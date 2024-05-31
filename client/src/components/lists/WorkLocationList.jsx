
// import React from "react";

// export default function WorkLocationList({ workLocations }) {

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
//                                     <tr key={workLocation.id} className="table-row" onClick={() => console.log(`Selected: ${workLocation.id}`)}>
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
        <div>
            <div className="flex-container">
                <div className="table-wrapper">
                    <div className="table-responsive">
                        <table className="work-location-table min-w-full divide-y divide-gray-200">
                            <thead className="table-header bg-gray-50">
                                <tr>
                                    <th className="header-cell start px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {workLocations.map(workLocation => (
                                    <tr key={workLocation.id} className="table-row" onClick={() => editWorkLocation(workLocation.id)}>
                                        <td className="table-cell start px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{workLocation.name}</td>
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
