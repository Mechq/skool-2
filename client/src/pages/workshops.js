import {React} from "react";
import CreateWorkshopSidePanel from "../components/CreateWorkshopSidePanel";
import WorkshopList from "../components/workshopList";

function Workshops() {
    return (
        <>
            <WorkshopList/>
            <CreateWorkshopSidePanel />
        </>

    );
}

export default Workshops;