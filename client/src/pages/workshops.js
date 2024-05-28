import React, {useEffect, useState} from "react";
import SidePanel from "../components/SidePanel";
import WorkshopList from "../components/workshopList";
import '../styles/workshops.css';

function Workshops() {
    const [showSidePanel, setShowSidePanel] = useState(false);

    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(""); // Changed from category to selectedCategory

    useEffect(() => {
        fetch('/api/category')
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Check if data.data is an array and contains only objects with a name property
                if (Array.isArray(data.data) && data.data.every(item => item.hasOwnProperty('name'))) {
                    const names = data.data.map(item => item.name);
                    setCategories(names);
                } else {
                    // If not, set categories to an empty array
                    setCategories([]);
                    console.error('Data is not an array of objects with a name property:', data);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                // If there's an error in the fetch request, set categories to an empty array
                setCategories([]);
            });
    }, []); // Empty dependency array means this effect runs once on component mount

    const [description, setDescription] = useState("");
    const [materials, setMaterials] = useState("");

    const [nameValid, setNameValid] = useState(true);
    const [categoryValid, setCategoryValid] = useState(true); // This will be used for selectedCategory validation
    const [descriptionValid, setDescriptionValid] = useState(true);
    const [materialsValid, setMaterialsValid] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!name) setNameValid(false);

        if (!selectedCategory) { // Changed from category to selectedCategory
            setCategoryValid(false);
        }

        if (!description) setDescriptionValid(false);
        if (!materials) setMaterialsValid(false);

        // If any field is invalid, stop the form submission
        if (!name || !selectedCategory || !description || !materials) return; // Changed from category to selectedCategory

        console.log(
            name,
            selectedCategory, // Changed from category to selectedCategory
            description,
            materials
        );

        // Create a new workshop object
        const workshop = {
            name,
            category: selectedCategory, // Changed from category to selectedCategory
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

        // Reset form fields
        setName('')
        setSelectedCategory('') // Changed from category to selectedCategory
        setDescription('')
        setMaterials('')
    };

    useEffect(() => {
        const sidePanel = document.querySelector('.side-panel');
        if (showSidePanel) {
            sidePanel.style.right = '0'; // Slide in
        } else {
            sidePanel.style.right = '-30%'; // Slide out
            // Reset validation states
            setNameValid(true);
            setCategoryValid(true);
            setDescriptionValid(true);
            setMaterialsValid(true);
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
                                    setDescriptionValid(true);  // Reset validation state
                                }}
                                className={descriptionValid ? "" : "invalid"}  // Apply CSS class
                                placeholder="description workshop"
                            />
                            <textarea
                                id="materials"
                                name="materials"
                                value={materials}
                                onChange={(e) => {
                                    setMaterials(e.target.value);
                                    setMaterialsValid(true);  // Reset validation state
                                }}
                                className={materialsValid ? "" : "invalid"}  // Apply CSS class
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