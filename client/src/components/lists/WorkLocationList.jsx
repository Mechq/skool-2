import React from "react";

export default function WorkLocationList({ setShowSidePanel, setSidePanelContent, setWorkLocationId, workLocations }) {
    const editWorkLocation = (id) => {
        setWorkLocationId(id);
        setSidePanelContent("edit");
        setShowSidePanel(true);
    };

    return (
        <div>
            <h1>Work Locations</h1>
            <ul className="list">
                {workLocations.map(workLocation => (
                    <li key={workLocation.id} onClick={() => editWorkLocation(workLocation.id)}>
                        {workLocation.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}


// import React from "react";

// export default function WorkLocationList({workLocations}) {

//     return (
//         <div>
//             <ul className="list">
//                 {workLocations.map(workLocation => (
//                     <li key={workLocation.id}>
//                         {workLocation.name}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
