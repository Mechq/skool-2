import React, { useEffect, useState } from "react";
import SidePanel from "../components/SidePanel";
import EditPanelWorkshopContent from "../components/panel-contents/EditPanelWorkshopContent";

function User() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [user, setUser] = useState({});
    const [rotateSpan, setRotateSpan] = useState(false);

    const id = 5;
    

    useEffect(() => {
        fetch(`/api/user/${id}`) // Assuming this is your profile API endpoint
            .then(res => res.json())
            .then(data => {
                setUser(data.data);
                console.log("Fetched profile: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [setIsOpen]);

    console.log("User password: ", user);
    const editUser = () => {
        // Logic to edit the profile
        setIsOpen(true);
        setSidePanelContent("edit");
    };

    return (
        <>
                
              <div flex justify-center> 
              <div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
              User database
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Details and informations about user.
          </p>
      </div>
      <div class="border-t border-gray-200">
          <dl>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Email
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.email}
                 </dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Wachtwoord
                 </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.password}
                  </dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                     Straatnaam
                  </dt>
                 <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.street}
                  </dd>
              </div>
             <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Huisnummer
                  </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">                     {user.houseNumber}                </dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                     Postcode
                  </dt>
                 <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.postalCode}
                  </dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Stad
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">                     {user.city}                </dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                     Geboortedatum
                  </dt>
                 <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.birthDate}
                  </dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      btw nummer
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">                     {user.btwNumber}                 </dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                     kvk nummer
                  </dt>
                 <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.kvkNumber}
                  </dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                     
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">                     $10,000                 </dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                     kvk nummer
                  </dt>
                 <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      To get social media testimonials like these, keep your customers engaged with your social media accounts by posting regularly yourself
                  </dd>
              </div>
          </dl>
      </div>
  </div>
  </div> 

            {/* Bewerk button */}
            <button
                onClick={editUser}
                className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white mt-4"
            >
                Bewerk
            </button>

            <SidePanel
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                rotateSpan={rotateSpan}
                setRotateSpan={setRotateSpan}
            >
                {sidePanelContent === "edit" && (
                    <EditPanelWorkshopContent
                        setShowSidePanel={setIsOpen}
                    />
                )}
            </SidePanel>
        </>
    );
}

export default User;
