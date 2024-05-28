import React, {useEffect, useState} from "react";
import SidePanel from "../components/SidePanel";
import WorkshopList from "../components/workshopList";
import '../styles/workshops.css';

function Workshops() {
    const [showSidePanel, setShowSidePanel] = useState(false);

    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(""); // Changed from category to selectedCategory
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
            .catch((error) => {
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
        if (!selectedCategory) {
            setCategoryValid(false);
        }
        if (!description) setDescriptionValid(false);
        if (!materials) setMaterialsValid(false);

        if (!name || !selectedCategory || !description || !materials) return; // Changed from category to selectedCategory


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
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setName('')
        setSelectedCategory('')
        setDescription('')
        setMaterials('')
    };

    useEffect(() => {
        const sidePanel = document.querySelector('.side-panel');
        if (showSidePanel) {
            sidePanel.style.right = '0';
        } else {
            sidePanel.style.right = '-30%';

            setNameValid(true);
            setCategoryValid(true);
            setDescriptionValid(true);
            setMaterialsValid(true);
            setName('')
            setSelectedCategory('')
            setDescription('')
            setMaterials('')
        }
    }, [showSidePanel]);

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
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setNameValid(true);  // Reset validation state
                                }}
                                className={nameValid ? "" : "invalid"}  // Apply CSS class
                                placeholder="Naam workshop"
                            />
                            <select
                                id="selectedCategory" // Changed from category to selectedCategory
                                name="selectedCategory" // Changed from category to selectedCategory
                                value={selectedCategory} // Changed from category to selectedCategory
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value); // Changed from category to selectedCategory
                                    setCategoryValid(true);
                                }}
                                className={categoryValid ? "" : "invalid"}
                            >
                                <option value="">Selecteer een categorie</option>
                                {
                                    categories.map((category, index) => (
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
                                placeholder="description workshop"
                            />
                            <textarea
                                id="materials"
                                name="materials"
                                value={materials}
                                onChange={(e) => {
                                    setMaterials(e.target.value);
                                    setMaterialsValid(true);
                                }}
                                className={materialsValid ? "" : "invalid"}
                                placeholder="benodigdheden en speciale eisen"
                            />
                        </div>
                        <button className="submit-fab fab-common" onClick={handleSubmit}>Aanmaken</button>
                    </form>
                </div>
            </SidePanel>
        </div>
    );
}

export default Workshops;