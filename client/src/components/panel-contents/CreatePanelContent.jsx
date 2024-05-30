import React, {useEffect, useState} from "react";
import '../../styles/components/CreatePanelContent.css'
import '../../styles/components/saveButton.css'

export default function CreatePanelContent({setWorkshops, setShowSidePanel}) {
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
                console.error('Error:', error);
                setCategories([]);
            });
    }, []);

    const [nameValid, setNameValid] = useState(true);
    const [categoryValid, setCategoryValid] = useState(true);
    const [descriptionValid, setDescriptionValid] = useState(true);
    const [materialsValid, setMaterialsValid] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) setNameValid(false);
        if (!selectedCategory) setCategoryValid(false);
        if (!description) setDescriptionValid(false);
        if (!materials) setMaterialsValid(false);

        if (!name || !selectedCategory || !description || !materials) return;

        const workshop = {
            name,
            category: selectedCategory,
            description,
            materials
        };

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
                setName('');
                setSelectedCategory('');
                setDescription('');
                setMaterials('');

                fetch('/api/workshop')
                    .then(res => res.json())
                    .then(data => {
                        setWorkshops(data.data);
                        setShowSidePanel(false);
                    })
                    .catch(error => console.error('Error fetching data:', error));

            })
            .catch(error => {
                console.error('Error:', error);
            });


    };

    return (
        <>
            <h1 className={"side-panel-title"}>Create Workshop</h1>
            <div className='side-panel-content'>
                <form className="form-container">
                    <div className="form-group">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setNameValid(true);
                            }}
                            className={nameValid ? "" : "invalid"}
                            placeholder="Naam workshop"
                        />
                        <select
                            id="selectedCategory"
                            name="selectedCategory"
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setCategoryValid(true);
                            }}
                            className={categoryValid ? "" : "invalid"}
                        >
                            <option value="">Selecteer een categorie</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setDescriptionValid(true);
                            }}
                            className={descriptionValid ? "" : "invalid"}
                            placeholder="Beschrijving workshop"
                        />
                        <input
                            type='text'
                            id="materials"
                            name="materials"
                            value={materials}
                            onChange={(e) => {
                                setMaterials(e.target.value);
                                setMaterialsValid(true);
                            }}
                            className={materialsValid ? "" : "invalid"}
                            placeholder="Benodigdheden en speciale eisen"
                        />
                    </div>
                </form>
                <button className="submit-fab fab-common saveButton" onClick={handleSubmit}>Aanmaken</button>

            </div>
        </>
    );
}
