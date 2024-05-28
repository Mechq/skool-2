import React, { useState, useEffect } from "react";
import "../styles/EditWorkshopSidePanel.css";
import "../styles/workshopList.css";

function EditWorkshopSidePanel() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [materials, setMaterials] = useState("");
    const [id, setId] = useState("");
    const [showSidePanel, setShowSidePanel] = useState(false);
    
    // TODO Make it display the information for a specific workshop currently hardcoded to 1


    const onWorkshopEdit = (id) => {
        setShowSidePanel(!showSidePanel)
        fetch(`/api/workshop/${id}`)
            .then(res => res.json())
            .then(response => {
                const data = response.data; // Access the data property
                console.log(data);
                setName(data.name || "");
                setCategory(data.category || "");
                setDescription(data.description || "");
                setMaterials(data.materials || "");
                setId(data.id || "");
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    const [workshop, setWorkshop] = useState([]);
    const workshopNames = workshop.map(workshop => workshop.name);
    useEffect(() => {
        fetch('/api/workshop')
            .then(res => res.json())
            .then(data => {
                setWorkshop(data.data);
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
            id,
        };

        fetch(`/api/workshop/${id}`, {
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

        // Reset form fields and hide side panel
        setName("");
        setCategory("");
        setDescription("");
        setMaterials("");
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

        <>
            <div>
                <h1>Workshops</h1>
                <ul className={"list"}>
                    {workshop.map((workshop, index) => (
                        <li key={index} onClick={() => onWorkshopEdit(workshop.id)}>{workshop.name}</li>
                    ))}
                </ul>
            </div>


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
                                <option value="Dans">Dans</option>
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
        </>
    );
}

export default EditWorkshopSidePanel;
