import React, { useState, useEffect } from "react";
import "../styles/CreateWorkshopSidePanel.css";

function EditWorkshopSidePanel() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState({
        ghettoDrums: false,
        Looping: false,
        CSGO: false,
    });
    const [details, setDetails] = useState("");
    const [materials, setMaterials] = useState("");

    const [showSidePanel, setShowSidePanel] = useState(false);

    useEffect(() => {
        fetch('/api/workshop')
            .then(res => res.json())
            .then(data => {
                setName(data.name);
                setCategory(data.category);
                setDetails(data.details);
                setMaterials(data.materials);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    console.log({ name, category, details, materials })

    const handleSubmit = (e) => {
        e.preventDefault();

        const workshop = {
            name,
            category,
            details,
            materials,
        };

        fetch('/api/workshop', {
            method: 'PUT',
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

        setShowSidePanel(false);
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
                <span className={showSidePanel ? "rotate" : ""}>{'Edit'}</span>
            </button>
            <div className="side-panel">
                <h1 className='side-panel-title'>Edit Workshop</h1>
                <div className='side-panel-content'>
                    <form action="#" method="get" className="form-container">
                        <div className="row">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Workshop Name"
                            />
                            <select
                                id="category"
                                name="category"
                                value={Object.keys(category).find(key => category[key])}
                                onChange={(e) => setCategory({ ...category, [e.target.value]: true })}
                            >
                                <option value="">Select a category</option>
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
                            placeholder="Workshop Details"
                        ></textarea>
                        <input
                            type="text"
                            id="materials"
                            name="materials"
                            value={materials}
                            onChange={(e) => setMaterials(e.target.value)}
                            placeholder="Materials"
                        />
                        <button className="submit-fab fab-common" onClick={handleSubmit}>Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditWorkshopSidePanel;
