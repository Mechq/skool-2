import React, {useState} from "react";
import SidePanel from "../components/SidePanel";
import WorkshopList from "../components/workshopList";
import '../styles/workshops.css';

function Workshops() {
    const [showSidePanel, setShowSidePanel] = useState(false);

    const [name, setName] = useState("");
    const [category, setCategory] = useState( {
        ghettoDrums: false,
        Looping: false,
        CSGO: false,
    });
    const [description, setDescription] = useState("");
    const [materials, setMaterials] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            name,
            category,
            description,
            materials
        );

        // Create a new workshop object
        const workshop = {
            name,
            category,
            description,
            materials
        };

        // Send a POST request to the backend
        fetch('/api/workshop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(workshop),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setShowSidePanel(false); // Close the side panel

        setName('')
        setCategory( {
            ghettoDrums: false,
            Looping: false,
            CSGO: false,
        })
        setDescription('')
        setMaterials('')

    };

    const handleCategoryChange = (sub) => {
        setCategory((prev) => ({
            ...prev,
            [sub]: !prev[sub],
        }));
    };

    return (
        <div className='workshopsContent'>
            <button className="fab fab-common" onClick={() => setShowSidePanel(!showSidePanel)}>
                <span className={showSidePanel ? "rotate" : ""}>{'+'}</span>
            </button>
            <WorkshopList/>
            <SidePanel showSidePanel={showSidePanel} setShowSidePanel={setShowSidePanel}>
                <div className='side-panel-content'>
                    <form action="#" method="get" className="form-container">
                        <div className="form-group">
                            <div className="row">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Naam workshop"
                                />
                                <select
                                    id="category"
                                    name="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Selecteer een categorie</option>
                                    <option value="ghettoDrums">Ghetto Drums</option>
                                    <option value="Looping">Looping</option>
                                    <option value="CSGO">CSGO</option>
                                </select>
                            </div>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="description workshop"
                            ></textarea>
                            <textarea
                                id="materials"
                                name="materials"
                                value={materials}
                                onChange={(e) => setMaterials(e.target.value)}
                                placeholder="benodigdheden en speciale eisen"
                            ></textarea>
                        </div>
                        <button className="submit-fab fab-common" onClick={handleSubmit}>Aanmaken</button>
                    </form>
                </div>
            </SidePanel>
        </div>
    );
}

export default Workshops;