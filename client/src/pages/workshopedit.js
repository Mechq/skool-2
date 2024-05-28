// import React, { useState, useEffect } from "react";
// import SidePanel from "../components/SidePanel"; // Corrected import path
// import "../styles/CreateWorkshopSidePanel.css"; // Ensure this stylesheet is imported
//
// function WorkshopEdit({ workshopId, setShowSidePanel }) {
//     const [name, setName] = useState("");
//     const [category, setCategory] = useState("");
//     const [description, setDescription] = useState("");
//     const [materials, setMaterials] = useState("");
//
//
//     const [showSidePanel, setShowSidePanel] = useState(false);
//
//     useEffect(() => {
//         if (workshopId) {
//             fetch(`/api/workshop/${workshopId}`)
//                 .then(res => res.json())
//                 .then(response => {
//                     const data = response.data;
//                     setName(data.name || "");
//                     setCategory(data.category || "");
//                     setDescription(data.description || "");
//                     setMaterials(data.materials || "");
//                 })
//                 .catch(error => console.error('Error fetching data:', error));
//         }
//     }, [workshopId]);
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//
//         const workshop = {
//             name,
//             category,
//             description,
//             materials,
//         };
//
//         fetch(`/api/workshop/${workshopId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(workshop),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Success:', data);
//                 setShowSidePanel(false); // Close the side panel after submission
//             })
//             .catch(error => console.error('Error:', error));
//     };
//
//     useEffect(() => {
//         const sidePanel = document.querySelector('.side-panel');
//         if (showSidePanel) {
//             sidePanel.style.right = '0'; // Slide in
//         } else {
//             sidePanel.style.right = '-30%'; // Slide out
//             // Reset validation states
//             // setNameValid(true);
//             // setCategoryValid(true);
//             // setDescriptionValid(true);
//             // setMaterialsValid(true);
//         }
//     }, [showSidePanel]);
//
//
//     return (
//         <div className='workshopEditContent'>
//             <button className="fab fab-common" onClick={() => setShowSidePanel(!showSidePanel)}>
//                 <span className={showSidePanel ? "rotate" : ""}>{'+'}</span>
//             </button>
//         <SidePanel showSidePanel={showSidePanel} setShowSidePanel={setShowSidePanel}>
//             <h1 className='side-panel-title'>Edit Workshop</h1>
//             <div className='side-panel-content'>
//                 <form className="form-container" onSubmit={handleSubmit}>
//                     <div className="row">
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             placeholder="Workshop Name"
//                         />
//                         <select
//                             id="category"
//                             name="category"
//                             value={category}
//                             onChange={(e) => setCategory(e.target.value)}
//                         >
//                             <option value="">Select a category</option>
//                             <option value="ghettoDrums">Ghetto Drums</option>
//                             <option value="Looping">Looping</option>
//                             <option value="CSGO">CSGO</option>
//                             <option value="Dans">Dans</option>
//                         </select>
//                     </div>
//                     <textarea
//                         id="description"
//                         name="description"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         placeholder="Workshop Description"
//                     ></textarea>
//                     <input
//                         type="text"
//                         id="materials"
//                         name="materials"
//                         value={materials}
//                         onChange={(e) => setMaterials(e.target.value)}
//                         placeholder="Materials"
//                     />
//                     <button className="submit-fab fab-common" type="submit">Update</button>
//                 </form>
//                 <button className="close-button" onClick={() => setShowSidePanel(false)}>✖</button>
//             </div>
//         </SidePanel>
//         </div>
//     );
// }
//
// export default WorkshopEdit;
