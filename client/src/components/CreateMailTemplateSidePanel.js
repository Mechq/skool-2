import {React, useState, useEffect} from "react";
import "../styles/CreateMailTemplateSidePanel.css";


function CreateMailTemplateSidePanel() {
    console.log('CreateMailTemplateSidePanel');
    const [name, setName] = useState("");
    const [category, setCategory] = useState( {
        ghettoDrums: false,
        Looping: false,
        CSGO: false,
    });
    const [details, setDetails] = useState("");
    const [materials, setMaterials] = useState("");


    const [showSidePanel, setShowSidePanel] = useState(false); // New state

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
        name,
        category,
        details,
        materials
    );

    // Create a new mailTemplate object
    const mailTemplate = {
        name,
        category,
        details,
        materials
    };

    // Send a POST request to the backend
    fetch('/api/mailTemplate', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailTemplate),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    setShowSidePanel(false); // Close the side panel
};

    const handleCategoryChange = (sub) => {
        setCategory((prev) => ({
            ...prev,
            [sub]: !prev[sub],
        }));
    };

    useEffect(() => {
        const sidePanel = document.querySelector('.side-panel');
        if (showSidePanel) {
            sidePanel.style.marginLeft = '70vw';
        } else {
            sidePanel.style.marginLeft = '100vw';
        }
    }, [showSidePanel]);

    return (
        <div id='side-panel-root'>
            <button className="fab fab-common" onClick={() => setShowSidePanel(!showSidePanel)}>
                <span className={showSidePanel ? "rotate" : ""}>{'+'}</span>
            </button>
            <div className="side-panel">
                <h1 className='side-panel-title'>Create Mail Template</h1>

                <div className='side-panel-content'>
                    <form action="#" method="get" className="form-container">
                        <div className="row">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Naam Mail Template"
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
                            id="details"
                            name="details"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="Details Mail Templates"
                        ></textarea>
                        <input
                            type="text"
                            id="materials"
                            name="materials"
                            value={materials}
                            onChange={(e) => setMaterials(e.target.value)}
                            placeholder="benodigdheden en speciale eisen"
                        />
                        <button className="submit-fab fab-common" onClick={handleSubmit}>Aanmaken</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateMailTemplateSidePanel;