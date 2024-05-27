import React, { useState, useEffect } from "react";
import "../styles/EditWorkshopSidePanel.css";

function EditWorkshopSidePanel() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [materials, setMaterials] = useState("");
    const [id, setId] = useState("");
    const [showSidePanel, setShowSidePanel] = useState(false);

    useEffect(() => {
        fetch('/api/workshop')
            .then(res => res.json())
            .then(data => {
                setName(data.name);
                setCategory(data.category || ""); // Ensure category is a string
                setDescription(data.description);
                setMaterials(data.materials);
                setId(data.id);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const workshop = {
            name,
            category,
            description,
            materials,
            id: 1, // Assuming this is the ID of the workshop being updated
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
        // Clear form fields if needed
        setName("");
        setCategory("");
        setDescription("");
        setMaterials("");
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
                <span>{'Edit'}</span>
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
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select a category</option>
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
                            placeholder="Workshop Description"
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
                    <button className="close-button" onClick={() => setShowSidePanel(false)}>✖</button>
                </div>
            </div>
        </div>
    );
}

export default EditWorkshopSidePanel;
