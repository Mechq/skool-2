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

    const handleSubmit = (e) => {
        e.preventDefault();

        const workshopName = document.getElementById('workshopName').value;
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const materials = document.getElementById('materials').value;

        // Check if all required fields have values
        if (!workshopName || !category || !description || !materials) {
            return; // Exit the function if any required field is empty
        }

        const workshop = {
            name: workshopName,
            category: category,
            description: description,
            materials: materials
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
                document.getElementById('workshopName').value = '';
                document.getElementById('category').value = '';
                document.getElementById('description').value = '';
                document.getElementById('materials').value = '';

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
        <div className="px-6">
            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="workshopName"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Workshop
                            naam</label>
                        <input type="text" id="workshopName"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                               placeholder="Moderne Dans" required/>
                    </div>
                    <div>
                        <label htmlFor="category"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Kies een
                            categorie</label>
                        <select id="category" required={true}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500">
                            <option value="">Selecteer een categorie</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="description"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Beschrijving workshop</label>
                    <textarea id="description" rows="4"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                              placeholder="Beschrijving..."></textarea>
                </div>
                <div className="mb-6">
                    <label htmlFor="materials"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Materiaal en benodigdheden</label>
                    <input type="text" id="materials"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                           placeholder="Microfoon, Speaker..." required/>
                </div>

                <button type="submit" onClick={handleSubmit}
                        className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-brand-orange light:hover:bg-brand-orange light:focus:ring-brand-orange">Submit
                </button>

            </form>

        </div>

        // <>
        //     <h1 className={"side-panel-title"}>Create Workshop</h1>
        //     <div className='side-panel-content'>
        //         <form className="form-container">
        //             <div className="form-group">
        //                 <input
        //                     type="text"
        //                     id="name"
        //                     name="name"
        //                     value={name}
        //                     onChange={(e) => {
        //                         setName(e.target.value);
        //                         setNameValid(true);
        //                     }}
        //                     className={nameValid ? "" : "invalid"}
        //                     placeholder="Naam workshop"
        //                 />
        //                 <select
        //                     id="selectedCategory"
        //                     name="selectedCategory"
        //                     value={selectedCategory}
        //                     onChange={(e) => {
        //                         setSelectedCategory(e.target.value);
        //                         setCategoryValid(true);
        //                     }}
        //                     className={categoryValid ? "" : "invalid"}
        //                 >
        //                     <option value="">Selecteer een categorie</option>
        //                     {categories.map((category, index) => (
        //                         <option key={index} value={category}>{category}</option>
        //                     ))}
        //                 </select>
        //                 <textarea
        //                     id="description"
        //                     name="description"
        //                     value={description}
        //                     onChange={(e) => {
        //                         setDescription(e.target.value);
        //                         setDescriptionValid(true);
        //                     }}
        //                     className={descriptionValid ? "" : "invalid"}
        //                     placeholder="Beschrijving workshop"
        //                 />
        //                 <input
        //                     type='text'
        //                     id="materials"
        //                     name="materials"
        //                     value={materials}
        //                     onChange={(e) => {
        //                         setMaterials(e.target.value);
        //                         setMaterialsValid(true);
        //                     }}
        //                     className={materialsValid ? "" : "invalid"}
        //                     placeholder="Benodigdheden en speciale eisen"
        //                 />
        //             </div>
        //         </form>
        //         <button className="submit-fab fab-common saveButton" onClick={handleSubmit}>Aanmaken</button>
        //
        //     </div>
        // </>
    );
}
