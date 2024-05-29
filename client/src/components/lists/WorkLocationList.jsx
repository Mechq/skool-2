import React, {useState, useEffect} from "react";

export default function WorkLocationList({workLocations}) {


    return (
        <div>
            <ul className="list">
                {workLocations.map(workLocation => (
                    <li key={workLocation.id}>
                        {workLocation.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
