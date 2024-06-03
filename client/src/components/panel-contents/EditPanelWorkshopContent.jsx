import React, {useEffect, useState} from "react";

function EditPanelWorkshopContent({workshopId, setShowSidePanel}) {
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

    const [nameValid, setNameValid] = useState(true);
    const [categoryValid, setCategoryValid] = useState(true);
    const [descriptionValid, setDescriptionValid] = useState(true);
    const [materialsValid, setMaterialsValid] = useState(true);

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
                    autoResize({target: document.getElementById('edit-description')});
                })
                .catch(error => console.error('Error fetching workshop:', error));
        }
    }, [workshopId]);

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

    const autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div className="px-6">
            <header className="pt-4 pb-4 font-bold text-lg">Workshop bewerken</header>
            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="workshopName"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Workshop
                            naam</label>
                        <input type="text" id="workshopName" value={name} required
                               onChange={(e) => setName(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="category"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Kies een
                            categorie</label>
                        <select id="category" value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
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
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Beschrijving
                        workshop</label>
                    <textarea id="description" rows="20" value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                              placeholder="Beschrijving..."></textarea>
                </div>
                <div className="mb-6">
                    <label htmlFor="materials"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Materiaal en
                        benodigdheden</label>
                    <input type="text" id="materials" value={materials}
                           onChange={(e) => setMaterials(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                           placeholder="Microfoon, Speaker..." required/>
                </div>

                <button type="submit" onClick={handleSubmit}
                        className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-brand-orange light:hover:bg-brand-orange light:focus:ring-brand-orange">Submit
                </button>

            </form>
        </div>


        // <div className='workshopEditContent'>
        //     <h1 className='side-panel-title'>Edit Workshop</h1>
        //     <div className='side-panel-content'>
        //         <form className="form-container">
        //             <div className="row">
        //                 <input
        //                     type="text"
        //                     id="edit-name"
        //                     name="name"
        //                     value={name}
        //                     onChange={(e) => {
        //                         setName(e.target.value);
        //                         setNameValid(true);
        //                     }}
        //                     className={nameValid ? "" : "invalid"}
        //                     placeholder="Workshop Name"
        //                 />
        //                 <select
        //                     id="edit-category"
        //                     name="category"
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
        //             </div>
        //             <textarea
        //                 id="edit-description"
        //                 name="description"
        //                 value={description}
        //                 onChange={(e) => {
        //                     setDescription(e.target.value);
        //                     setDescriptionValid(true);
        //                     autoResize(e);
        //                 }}
        //                 className={descriptionValid ? "" : "invalid"}
        //                 placeholder="Workshop Description"
        //                 style={{overflow: 'hidden', resize: 'none'}} // Disable manual resizing for better control
        //             />
        //             <input
        //                 type="text"
        //                 id="edit-materials"
        //                 name="materials"
        //                 value={materials}
        //                 onChange={(e) => {
        //                     setMaterials(e.target.value);
        //                     setMaterialsValid(true);
        //                 }}
        //                 className={materialsValid ? "" : "invalid"}
        //                 placeholder="Materials"
        //             />
        //         </form>
        //         <button className="submit-fab fab-common saveButton" onClick={handleSubmit} type="submit">Update
        //         </button>
        //     </div>
        // </div>
    );
}

export default EditPanelWorkshopContent;
