import React, {useState, useEffect} from "react";

function EditPanelContent({workshopId, setShowSidePanel}) {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [description, setDescription] = useState("");
    const [materials, setMaterials] = useState("");

    useEffect(() => {
        fetch('/api/category')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.data) && data.data.every(item => item.hasOwnProperty('name'))) {
                    const names = data.data.map(item => item.name);
                    setCategories(names);
                } else {
                    setCategories([]);
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                setCategories([]);
            });
    }, []);

    useEffect(() => {
        if (workshopId) {
            fetch(`/api/workshop/${workshopId}`)
                .then(res => res.json())
                .then(response => {
                    const data = response.data;
                    setName(data.name || "");
                    setSelectedCategory(data.category || "");
                    setDescription(data.description || "");
                    setMaterials(data.materials || "");
                })
                .catch(error => console.error('Error fetching workshop:', error));
        }
    }, [workshopId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const workshop = {
            name,
            category: selectedCategory,
            description,
            materials,
        };

        fetch(`/api/workshop/${workshopId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(workshop),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setShowSidePanel(false); // Close the side panel after submission
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className='workshopEditContent'>
            <h1 className='side-panel-title'>Edit Workshop</h1>
            <div className='side-panel-content'>
                <form className="form-container" onSubmit={handleSubmit}>
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
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Selecteer een categorie</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
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
                    <button className="submit-fab fab-common" type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditPanelContent;